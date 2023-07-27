const mongoose = require("mongoose");

// for altas connection try it
//mongoose.set("strictQuery" , true);


const conncetDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_URL);
    console.log(
      `app is connected to mongodb database ${conn.connection.host}`.bgMagenta
    );
  } catch (error) {
    console.log(`mongodb connect to Error ${error}`.bgBlue.white);
  }
};

//for connecting databse from mongodb altas
//mongodb+srv://shaquib:mgpass@cluster0.ai9ki2k.mongodb.net/dbname=blogApp

module.exports = conncetDB;
