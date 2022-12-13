const { sendGmail } = require ('../notifications/emailSender');
const { htmlNewUserTemplate } = require ('../notifications/htmltemplates/newUser');
const {twiliows} =  require ('../notifications/twiliows')

const sendEmail =  async (req,res) => {
    const { nombre, age, code, direccion, telefono,  image} = req.body;
    let { username } = req.user;
    const newRegistroServices = ({ nombre, age, code, direccion, telefono, image });
    if (newRegistroServices) {
        await sendGmail('Nuevo usuario', nombre, age, direccion, code, telefono,  image, username);
        twiliows;
        res.redirect('login');
    } else {
        res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
    }
};

const sendEmailCart =  async (req,res) => {
    let { username, name } = req.user;
    if (username) {
        await sendGmail('Nuevo pedido', username, name);
        htmlNewUserTemplate;
        twiliows;
        res.redirect('login');
    } else {
        res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
    }
};

module.exports = {sendEmail, sendEmailCart};
