var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// local mongodb database
// mongoose.connect('mongodb://localhost:27017/test',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

//cloud database mongodb

mongoose.connect('mongodb+srv://Anurag052:Anurag@2020@myweb.fzdsu.mongodb.net/web',{
    useNewUrlParser: true,
     useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var phone_number = req.body.phone_number;
    var password = req.body.password;
    var course =req.body.course;
    var about_you =req.body.about_you;

    var data = {
        "first_name": first_name,
        "last_name": last_name,
        "email" : email,
        "phone_number": phone_number,
        "password" : password,
        "course" : course,
        "about_you" : about_you
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(8000);


console.log("Listening on PORT 8000");