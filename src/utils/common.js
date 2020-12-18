const dbRepo = require('../models')
const dbConnector = require('../database/index')
const accountService = require('../services/AccountService');

let common = {

    getDBKeyFromRequest: async (req) => {
        try {
            let tenant_id = req.headers['x-tenant-id']
            // console.log('>>>>>> tenant_id: ' + tenant_id)
            
            if (tenant_id==='') {tenant_id = 0}

            let dbKey = 'default'
            if(tenant_id) {
                dbKey = `tenant_${tenant_id}`
            }
        
            // console.log('>>>>>> schema: ' + dbKey)

            // if(!dbRepo[dbKey]) {
                const account = await accountService.getAccount(tenant_id)
                if(account) {
                    dbConnector.addSequelizeConnectionToRepo(dbRepo, dbKey)
                } else {
                    dbKey = 'default'
                }        
            // }        
            // console.log('>>>>>> dbKey: ' + dbKey)
            return dbKey;
        } catch (e) {
            throw e
        }
    }
}

module.exports = common