// index.js
// where your node app starts

// init project
require('dotenv').config();
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({ greeting: 'hello API' });
// });

app.get("/api/:date_string?", (req, res) => {
  let dateString = req.params.date_string || Date.now();
  const dateFormat = !isNaN(Number(dateString)) ? Number(dateString) : dateString;
  let date = new Date(dateFormat);
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Listen on port set in environment letiable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
