const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const date = new Date().toString();
const folderName = "timestamp";
const fileName = "date-time.txt";
const filePath = path.join(folderName, fileName);


app.use((req, res, next) => {
  fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      fs.writeFile(filePath, `The current date and time is ${date}`, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          next();
        }
      });
    }
  });
});

// API endpoint to get the timestamp
app.get('/', (req, res) => {
  res.json(`The current date and time is ${date}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
