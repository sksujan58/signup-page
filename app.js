const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")

const app=express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function (req,res){
    res.sendFile(__dirname+"/signup.html")
})


app.post("/",function (req,res){
    var details=req.body
    var email=details.Email;
    var fname=details.FName;
    var lname=details.LName;


var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }


        }
    ]
}

var jsonData=JSON.stringify(data);

const url="https://us7.api.mailchimp.com/3.0/lists/38190e80d8";

const options={
    method:"POST",
    auth:"sujan:fd43a0c5a540e318724d67bdb84dbe45-us7"
}

var request=https.request(url ,options , function (response){

    response.on("data", function(data){
        var membership=JSON.parse(data)
        console.log(JSON.parse(data))
        if (response.statusCode==200){
        res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
    })

})
request.write(jsonData);

request.end();


})


app.listen(process.env.PORT || 3000, function (){
    console.log("Congrats! Now check port 3000")
})







// mailchimp api key---  fd43a0c5a540e318724d67bdb84dbe45-us7

// list-id --- 38190e80d8