const mongoose = require('mongoose')
const c = require("colors")
module.exports = {

    start() {
        try{

            mongoose.connect(process.env.DATABASE_CONNECT, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })

            console.log(c.blue('[🎲] Mongoose Conectada!'))

        } catch(err) {
            if(err) return console.log('Database error:' + err)
        }
    }
}