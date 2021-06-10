const mongoose = require('mongoose')
const Schema = mongoose.Schema

let guildSchema = new Schema({
    _id: {type: String, required: true},
    prefix: {type: String, default: "s."},
    entrada: {
        status: {type: Boolean, default: false},
        channel: {type: String, default: "null"},
        msg: {type: String, default: "null"}
    },
    saida: {
        status: {type: Boolean, default: false},
        channel: {type: String, default: "null"},
        msg: {type: String, default: "null"}
    }
})

let Guild = mongoose.model("Guilds", guildSchema)
module.exports = Guild