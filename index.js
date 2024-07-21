import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
   try{
        const result = await axios.get("https://zenquotes.io/api/today");
        res.render("index.ejs",{quote:result.data[0].q,
            author:result.data[0].a,
        });
    }catch(error){
        console.log(error);
    }
   
});

app.post("/", async(req,res)=>{
    try{
        const value = req.body.keyword;
        const result = await axios.get("https://zenquotes.io/api/image/keyword=" + value);
        res.render("index.ejs",{url:result.config.url});
    }catch(error){
        console.log(error);
    }
});
app.listen(port,()=>{
    console.log(`server on ${port}`);
})