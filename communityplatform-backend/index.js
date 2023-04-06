const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;



require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(authToken)
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/auth/signup",(req,res) => {
    
    res.send('Jai Shree Ram');
})

app.post("/auth/login", (req,res) => {
    res.send("Jai Shree Ram");
})
app.post("/",(req,res) => {
    const {message,user : sender, type , members} = req.body;

    if(type=='message.new') {
        members.filter(member => member.user_id !== sender.id).forEach(({user}) => {
            if(!user.online) {
                twilioClient.messages.create({
                    body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                    messagingServiceSid: messagingServiceSid,
                    to: user.phoneNumber
                })
                .then(() => console.log('Message Sent!'))
                .catch((error) => console.log(error));
            }
        });
        return res.send(200).send('Message sent!')
    }

    return res.status(200).send('Not a new message request!')
})
app.use('/routes', authRoutes);

app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`)
} )