const Product = require('../models/Product');

const productCreate = (req, res, done) => {
	const {title, price, imagePath, description} = req.body
	const  newProduct = { title, price, imagePath, description }
	Product.create(newProduct, (error, userWithId) => {
		if (error)
		return done (error, { message: 'Error cargando producto' }, res.redirect("/product-create"));
		else res.redirect("/login"), done(null, userWithId, { message: 'producto cargado' });
	})
}

const renderProduct = async (req, res) => {
	const products = await Product.find();
	res.render('partials/showproducts.handlebars', { products })
}

const productShow =  (req, res)=>{
	res.render('partials/products.handlebars')
}

module.exports = {productShow, productCreate, renderProduct};