const accountSid = 'AC599cd29843d4e63feb5bbc78110462eb'; 
const authToken = '93af157072f8613a6d7548c7acdccd8c'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Hubo un nuevo pedido en la baticueva', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+573228939436' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();