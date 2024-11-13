const mongoose = require('mongoose')
require('dotenv').config();
exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Success"))
    .catch((error)=>{
        console.log("DB Connction faild")
        console.log(error)
        process.exit(1)
    })
}