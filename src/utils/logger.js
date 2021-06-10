const { syncBuiltinESMExports } = require('module')
const moment = require('moment')

module.exports = {
    async sucess(content) {
        console.log(`[${moment().format("DD-MM-YYYY HH:mm")} - Sucesso 🚀]` + content)
    },
    async error(content) {
        console.log(`[${moment().format("DD-MM-YYYY HH:mm")} - Erro ❌]` + content)
    },
    async warn(content) {
        console.log(`[${moment().format("DD-MM-YYYY HH:mm")} - Aviso ⚠]` + content)
    }
}