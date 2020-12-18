const { authSecret } = require('../../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

const dbRepo = require('../models')
const common = require('../utils/common')

module.exports = app => {
    const signin = async (req, res) => {
        try{ 
            const tenantId = req.headers['x-tenant-id']

            if ((!tenantId) || isNaN(tenantId))  {
                return res.status(401).json({ error: 'O header x-tenant-id não foi informado corretamente!'})
            }

            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ error: 'Informe usuário e senha!' })
            }

            const dbKey = await common.getDBKeyFromRequest(req)
            const User = dbRepo[dbKey].User

            const user = await User.findOne({ 
                where: { email: req.body.email } 
            })
            if (!user) return res.status(401).json({ error: 'Usuário inexistente!' })

            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!isMatch) return res.status(401).send({ error: 'Email/Senha inválidos!' })

            const now = Math.floor(Date.now() / 1000) // valor da data atual em segundos
            
            const payload = {                
                id: user.id,
                email: user.email,
                admin: user.admin,
                tenantId: tenantId,
                iat: now,
                exp: now + (60 * 60 * 8 * 1) // soma a data atual: (60 seg * 60 minutos * 24 horas * 1 dia)
            }

            return res.json({
                // ...payload,
                auth: true,
                token: jwt.encode(payload, authSecret) 
            })
        } catch(e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }

    // const validateToken = async (req, res) => {
    //     const userData = req.body || null
    //     try {
    //         if(userData) {
    //             const token = jwt.decode(userData.token, authSecret)
    //             // passa a data para segundos
    //             if(new Date(token.exp * 1000) > new Date()) {
    //                 return res.send(true)
    //             }
    //         }
    //     } catch(e) {
    //         // problema com o token
    //     }

    //     res.send(false)
    // }

    return { signin/*, validateToken*/ }
}