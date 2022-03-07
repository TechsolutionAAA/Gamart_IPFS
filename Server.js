const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const ipfsClient = require('ipfs-http-client')
const fileUpload = require('express-fileupload')
const fs = require('fs')
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https'})


// env configurations
require('dotenv').config();

// database connection
require('./config/db');


app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(
 bodyParser.urlencoded({
 limit: '50mb', extended: true
 })
);
app.use(bodyParser.json());
app.use(fileUpload())
app.set('view engine' , 'ejs')

app.post('/upload',(req,res) => {
  console.log("req-->>>",req.body)
  const file = req.files.myFile;
//   console.log(file)
  const fileName = file.name
  file.mv('./files/'+fileName , async(err)=>{
      if(err){
          console.log('Error: Failed to download')
          return res.status(500).send(err)
      }
      const fileHash = await addFile(fileName , './files/'+fileName);
      fs.unlink('./files/'+fileName ,(err)=>{
        if(err)
        console.log(err)
      });
      let metaData ;
      if(req.body){
          metaData = {description: req.body.description, 
          price: req.body.price, 
          title: req.body.title, 
          image: fileHash 
        }
      } else{
          metaData = {description: req.body?.description|"", 
          price: req.body?.price|0, 
          title: req.body?.title|"", 
          image: fileHash |""
        }
      }
      console.log(metaData)
      fs.writeFile("meta.json", JSON.stringify(metaData), err => {
   
          // Checking for errors
          if (err) throw err; 
         
          console.log("Done writing"); // Success

          upladJsonIPFS(res, fileName, metaData); 
      });        
  });
});
  const upladJsonIPFS = async(res, fileName, metaData)=>{
        const metaHash = await addFile('meta.json', './meta.json');
        fs.unlink('./meta.json' ,(err)=>{
          if(err)
          console.log(err)
        });
  
        metaData['tokenURI'] = metaHash;

        res.send({'filename':fileName ,'Hash':metaHash,'metaData':metaData});
       
}  
  const addFile = async(fileName , filePath) =>{
      try{
          const file = fs.readFileSync(filePath);
          const fileAdded = await ipfs.add({path : fileName , content:file});
          console.log("fileAdded-->>",fileAdded)
          const fileHash = "https://ipfs.io/ipfs/" +fileAdded[0].hash;
          return fileHash;
      } catch{
          // return 
          // console.log(e)
          return "https://ipfs.io/ipfs/QmPEgJN9NU4628jtWU44ekp4mmja4BkR3tuRnof9Bi1YeJ";
      }
      
  }




// routes
const userRoutes = require('./routes/user');
const nftRoutes = require('./routes/nft');
app.use(userRoutes)
app.use(nftRoutes);
const port = process.env.PORT || 5432; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
