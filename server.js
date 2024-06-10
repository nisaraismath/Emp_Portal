require('./db/dbConnection')
const express = require("express");
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


// app.use(bodyParser.json());


app.use(cors({
  origin: "*",
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const router = require('./routes/index')
app.use('/', router);


app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the app' }) 
  })

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


