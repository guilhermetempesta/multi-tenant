const userService = require('../services/UserService')
const common = require('../utils/common');

module.exports = app => {

    const create = async (req, res) => {
        try {
            const dbKey = await common.getDBKeyFromRequest(req) 
            
            const user = req.body
            try {
                userService.validate(user)
                await userService.alreadyExists(user, dbKey)
            } catch (err) {
                return res.status(400).json({ error: err })
            }
            await userService.create(user, dbKey)
            res.status(204).send()
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        } 
    }

    const update = async (req, res) => {        
        try {
            const dbKey = await common.getDBKeyFromRequest(req) 
            const user = req.body
            user.id = req.params.id
            try {
                userService.validate(user)
            } catch (err) {
                return res.status(400).json({ error: err })
            }
            await userService.update(user, dbKey)
            res.status(204).send()
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        } 
    }

    const get = async (req, res) => {        
        try {
            const dbKey = await common.getDBKeyFromRequest(req)            
            const users = await userService.get(dbKey)            
            res.status(200).json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    } 
    
    const getById = async (req, res) => {
        try {
            const userId = req.params.id
            const dbKey = await common.getDBKeyFromRequest(req)            
            const user = await userService.getById(userId, dbKey)
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado!' })
            }          
            res.status(200).json(user)    
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    }

    const remove = async (req, res) => {
        try {
            const userId = req.params.id
            const dbKey = await common.getDBKeyFromRequest(req) 
            const user = await userService.getById(userId, dbKey)
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado!' })
            }          

            if (user.admin===true) { 
                return res.status(400).json({ error: 'Não é permitido deletar um usuário administrador!' })
            }

            await userService.remove(userId, dbKey)            
            res.status(204).send()
        } catch (err) {
            console.log(err)
            res.status(500).json({error: err})
        }
    }
   
    return { create, update, get, getById, remove }
}