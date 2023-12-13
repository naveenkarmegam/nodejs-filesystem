const express = require("express");
const { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync } = require("fs");
const path = require("path");

const app = express();
const fileFolder = "timestamps";


//initial route
app.get("/", function (req, res) {
  if (req.url === "/") {
    res.send(`
    <h3>Hey, this is naveen!! welcome to my server </h3>
    <p><a href="/static">Click here</a> to create a timestamp</p>
    <p><a href="/textfiles">Click here</a>API endpoint to retrieve text files</p>
    `);
  } else {
    res.status(404).end(`
    <h1>OOPS</h1>
    <p>This is the wrong page</p>
    `);
  }
});

// 1. write API end point which will create a text file in a particular folder.
app.get("/static", (req, res) => {

  //to create a directory
  if (!existsSync(fileFolder)) {
    mkdirSync(fileFolder);
  }

  // a)content of the file should be the current timestamp.
  const time = new Date().toUTCString();
  // b)The filename should be current date-time.txt
  writeFileSync(
    path.join(__dirname, fileFolder, "/date-time.txt"),
    `Last created timestamp ${time}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Enjoy!! The file was created successfully");
      }
    }
  );

  if (req.url === "/static") {
    res.sendFile(path.join(__dirname, fileFolder, "date-time.txt"));
  } else {
    res.status(500).end(`
    <h1>OOPS</h1>
    <p>This is the wrong page</p>
    `);
  }
});


// 2) write API endpoint to retrieve all the text files in that particular folder.

app.get('/textfiles',(req,res)=>{
  const folderPath = path.join(__dirname,fileFolder);
  const files = readdirSync(folderPath).filter(file=>file.endsWith('.txt'));
  const filesContent = files.map(file=>{
    const filePath = path.join(folderPath,file)
    return{
      filename : file,
      content: readFileSync(filePath,'utf-8')
    }
  });
  res.json(filesContent)
})


// listening the server
app.listen(5000, () => console.log("Server started on http://localhost:5000"));
