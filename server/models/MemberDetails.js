const mongoose = require('mongoose')
const ContactSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

module.exports = mongoose.model("Contacts",ContactSchema)