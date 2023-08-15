const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
}
)

app.post('/',(req,res)=>{
    const email = req.body.email;
    if(validator.isEmail(email))
    {
        var api_key = '6ac23a1c9988d226c31a1ea0cc611e7f-28e9457d-a0224f8f';
        var domain = 'sandboxd9815b73d47c405cabe7f609606e8025.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
        var data =
        {
            from: 'Deakin <tanay4847.be22@chitkara.edu.in>',
            to: email,
            subject: 'DEV@Deakin',
            text: 'Welcome :) You are not the part of DEV@Deakin Platform'
        };
 
        mailgun.messages().send(data, function (error, body) {
            if(error)
            {
                console.log(error);
            }
        console.log(body);
        });
        console.log("Welcome Message Sent Successfully");
        res.send("Thank You! You must have received a Welcome Message");
    }
    else{
        console.log("Invalid Email");
        res.send("Invalid Email. Kindly enter a valid Email");
    }
})

app.listen(8000,function(request,response){
    console.log("Server is running at port 8000");
});

