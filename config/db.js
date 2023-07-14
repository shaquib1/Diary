const mongoose = require('mongoose')



const conncetDB = async()=>{

    try {
        const conn = await mongoose.connect(process.env.Mongo_URL);
        console.log(`app is connected to mongodb database ${conn.connection.host }`.bgMagenta)
    } catch (error) {
        console.log(`mongodb connect to Error ${error}`.bgBlue.white)
    }
}



module.exports = conncetDB;