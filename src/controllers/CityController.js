const cityService = require('../services/CityService')
const common = require('../utils/common');

module.exports = app => {

    const get = async (req, res) => {        
        try {
            const page = req.query.page || 1
            const dbKey = await common.getDBKeyFromRequest(req)            
            const citys = await cityService.get(dbKey, page)            
            res.status(200).json(citys)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    } 
    
    const getById = async (req, res) => {
        try {
            const cityId = req.params.id
            const dbKey = await common.getDBKeyFromRequest(req)            
            const city = await cityService.getById(cityId, dbKey)
            if (!city) {
                return res.status(400).json({ error: 'Usuário não encontrado!' })
            }          
            res.status(200).json(city)    
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    }

   return { get, getById }
}