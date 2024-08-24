const express = require("express")
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

const app = express ();
dotenv.config();

const port = process.env.PORT || 4000;

const username = process.env.MONGODBUSERNAME;
const password = process.env.MONGODBPASSWORD;

mongoose.connect(`mongodb+srv://sureshchintu49:vcleGV5uj59Y52DN@cluster0.hcydt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
});

const registrationSchema = new mongoose.Schema({
    name :String,
    email :String,
    password : String,
});

const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/Pages/index.html");
})

app.post("/register", async (req,res)=>{
    try{
        const{name,email,password}=req.body;

        const existingUser = await Registration.findOne({email : email});
        if(!existingUser){
            const registrationData = new Registration({
                name,
                email,
                password,
            });
            await registrationData.save();
            res.redirect("/success");
        }
        else{
            alert("User already Exists");
            res.redirect("/error");
        }
    }
    catch(error){
        console.error(error);
        res.redirect("error");
    }
})

app.get("/success",(req, res)=>{
    res.sendFile(__dirname + "/Pages/success.html");
})

app.get("/error", (req, res)=>{
    res.sendFile(__dirname + "/Pages/error.html");
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})