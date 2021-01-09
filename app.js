const express=require('express');
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get('/',async (req, res) =>{
    try{
    
      const api_url ="https://api.covid19india.org/data.json";
      const response = await fetch(api_url);
      const json = await response.json();
       
       
       const statewise = json.statewise;
       //total data
       const stateActive=json.statewise[0].active;
       const stateDeath=json.statewise[0].deaths;
       const stateRecover=json.statewise[0].recovered;
       const stateConfirm=json.statewise[0].confirmed;
       
       res.render('home.ejs',{  statewise:statewise,
                                stateActive:stateActive,
                                stateDeath:stateDeath,
                                stateRecover:stateRecover,
                                stateConfirm:stateConfirm
         
       });
    }catch(err){
      if(err.response){
        console.log(err.response);
      }else if(err.request){
        console.log(err.request);
      }
      else{
        console.error('Error',err.message)
      }
    }
    
    
    
    });

    app.listen(process.env.PORT||3000, function(req,res){
        console.log("runnig...");
      });