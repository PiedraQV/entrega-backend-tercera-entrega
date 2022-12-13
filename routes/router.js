const router = require('express').Router();
const passport = require('passport');
const { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute } = require('../controllers/controller');
const { sendEmail, sendEmailCart } = require ('../controllers/sendmail');
const checkAuthentication = require('../middlewares/auth');
const { fork } = require('child_process');
const compression = require('compression');
const logger = require ('../logguer/logguer');
const { send } = require('process');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { productShow, productCreate, renderProduct } = require ('../controllers/productsDb');



// Index
router.get('/', checkAuthentication, getIndex);

// Login
router.get('/login', getLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLogin);
router.get('/faillogin', getFailLogin);

// Signup
router.get('/signup', getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), sendEmail, postSignup);
router.get('/failsignup', getFailSignup);

// Redirect to login & signup
router.post('/redirect-signup', (req, res) => res.redirect('/signup'));
router.post('/redirect-login', (req, res) => res.redirect('/login'));

// Logout
router.post('/logout', getLogout);

// Info
router.get('/info', (req, res) => {
	const hola = "Hola, estoy agregando más peso "
	const expHi = hola.repeat(1000)
	const processInfo = {
		argumentos_de_entrada: process.argv.slice(2),
		nombre_sistema_operativo: process.platform,
		version_node: process.version,
		memoria_total_reservada: process.memoryUsage().rss,
		path_de_ejecucion: process.execPath,
		process_id: process.pid,
		carpeta_del_proyecto: process.cwd(),
		expHi
		
	};
    res.status(200).json(processInfo);
	
});

router.get('/infozip', compression({level:8, threshold:1}), (req, res) => {
	const hola = "Hola, estoy agregando más peso "
	const expHi = hola.repeat(1000)
	res.json({
		argumentos_de_entrada: process.argv.slice(2),
		nombre_sistema_operativo: process.platform,
		version_node: process.version,
		memoria_total_reservada: process.memoryUsage().rss,
		path_de_ejecucion: process.execPath,
		process_id: process.pid,
		carpeta_del_proyecto: process.cwd(),
		expHi
	});
});

// Api randoms
router.get('/api/randoms', (req, res) => {
	const forked = fork('./controllers/random.js');

	let { cantidad } = req.query;
	let obj = {};
	cantidad
		? forked.send({ cantidad, obj })
		: forked.send({ cantidad: 500000000, obj });
	forked.on('message', msg => res.json(msg));
});

///////////////////-------------------CREACION PRODUCTOS------------------------------//////////////////

router.get('/product', productShow);
router.get('/product-create', renderProduct);
router.post('/create-product', productCreate);


///////////////////-------------------CART------------------------------//////////////////


router.get('/cart/add-to-cart/:id',  (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/cart');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
    })
});

router.get('/cart/reduce/:id', (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart/remove/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart', (req, res, next) => {
    if(!req.session.cart) {
        return res.render('partials/cart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    return res.render('partials/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});


///////////////////-------------------checkout------------------------------//////////////////

router.get('/checkout', (req, res) => {
	res.render('partials/checkout.handlebars');
});

router.post('/checkout', sendEmailCart);

///////////////////-------------------avatar------------------------------//////////////////


// Fail route
router.get('*', failRoute);



module.exports = router;