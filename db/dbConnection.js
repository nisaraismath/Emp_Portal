// const mongoose = require("mongoose")
// require("dotenv").config();
// mongoose.set("strictQuery", false)
// mongoose.connect(process.env.MONGODB_URL,
//   {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
//   }).then(() => {
//     console.log("Connected to MongoDB")
//   })
//   .catch((err) => {
//     console.log(err, "Error")
//   });
  
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};
connectDB();
module.exports = mongoose;

