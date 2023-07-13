const express = require("express")

const app =express()
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination:"uploads/",filename: function ( req, file, cb ) {
        //req.body is empty...
        //How could I get the new_file_name property sent from client here?
        cb( null, file.originalname );
    }
})

var upload = multer( { storage: storage } );

app.post("/",upload.single("file"),(req,res)=>{

    console.log(req.file)
    res.send("File uploaded successfully")
})

app.get('/url', function(req, res, next) {
    var stream = fs.createReadStream('./uploads/dark.pdf');
    var filename = "dark.pdf"; 
    // Be careful of special characters
  
    filename = encodeURIComponent(filename);
    // Ideally this should strip them
  
    res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
//   attachment
    stream.pipe(res);
  });




app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})