const mongoose = require('mongoose')
const logger = require('../utils/logger')

module.exports = {

    start() {
        try{

            mongoose.connect(process.env.DATABASE_CONNECT, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })

            logger.sucess('Mongoose Conectada!')

        } catch(err) {
            if(err) return logger.error('Database error:' + err)
        }
    }



}