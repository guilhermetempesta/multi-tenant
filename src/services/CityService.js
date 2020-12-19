const dbRepo = require('../models');

const get = async (dbKey, page) => {
    try {
        const City = dbRepo[dbKey].City;
        const limit = 200 // limite usado para paginacao 
        
        const result = await City.count({
            where: { deletedAt: null }
        })
        const count = parseInt(result)

        const cities = await City.findAll({ 
            attributes: ['id', 'name', 'state', 'code'], 
            where: { deletedAt: null },
            order: ['id'],
            limit: limit,                // limite por pagina  
            offset: page * limit - limit // deslocamento
        })
        return { data: cities, count, limit}
    } catch (err) {
        throw err
    }
}

const getById = async (cityId, dbKey) => {
    try {
        const City = dbRepo[dbKey].City;
        const city = await City.findOne({ 
            attributes: ['id', 'name', 'state', 'code'],
            where: { 
                id: cityId,
                deletedAt: null 
            } 
        })
        return city
    } catch (err) {
        throw err
    }
}

module.exports = { get, getById }