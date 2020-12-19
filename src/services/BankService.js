const dbRepo = require('../models');

const get = async (dbKey) => {
    try {
        const Bank = dbRepo[dbKey].Bank;
        const banks = await Bank.findAll({ 
            attributes: ['id', 'name', 'code'], 
            where: { deletedAt: null },
            order: ['id']
        })
        return banks
    } catch (err) {
        throw err
    }
}

const getById = async (bankId, dbKey) => {
    try {
        const Bank = dbRepo[dbKey].Bank;
        const bank = await Bank.findOne({ 
            attributes: ['id', 'name', 'code'],
            where: { 
                id: bankId,
                deletedAt: null 
            } 
        })
        return bank
    } catch (err) {
        throw err
    }
}

module.exports = { get, getById }