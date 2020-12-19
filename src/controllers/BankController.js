const bankService = require('../services/BankService')
const common = require('../utils/common');

module.exports = app => {

    const get = async (req, res) => {        
        try {
            const dbKey = await common.getDBKeyFromRequest(req)            
            const banks = await bankService.get(dbKey)            
            res.status(200).json(banks)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    } 
    
    const getById = async (req, res) => {
        try {
            const bankId = req.params.id
            const dbKey = await common.getDBKeyFromRequest(req)            
            const bank = await bankService.getById(bankId, dbKey)
            if (!bank) {
                return res.status(400).json({ error: 'Usuário não encontrado!' })
            }          
            res.status(200).json(bank)    
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    }

   return { get, getById }
}