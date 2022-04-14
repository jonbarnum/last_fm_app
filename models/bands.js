const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Band Blueprint
const bandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
    },
    url: {
        type: String
    },
    img: {
        type: String
    }
})

module.exports = mongoose.model('Band', bandSchema)