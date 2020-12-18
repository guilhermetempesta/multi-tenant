const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { dbConfig } = require('../../.env')
const modelsDir = path.join(__dirname, '../models')

const addSequelizeConnectionToRepo = (dbRepo, dbKey) => {
    const db = {} 
    let sequelize
    
    if(dbKey === 'default') {
        sequelize = new Sequelize(dbConfig);
    } else {
        sequelize = new Sequelize({            
            dialect: dbConfig.dialect, 
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbKey,
            define: dbConfig.define,
            seederStorage: dbConfig.seederStorage
        });
    }

    fs
        .readdirSync(modelsDir)
        .filter(file => (file !== 'index.js'))
        .forEach(file => {
            const model = require(path.join(modelsDir, file))
            db[model.name] = model
        })
    
    Object.keys(db).forEach(model => db[model].init(sequelize))
    
    Object.keys(db)
        .filter(model => db[model].associate)
        .forEach(model => db[model].associate(sequelize.db[model]))
    
    db.sequelize = sequelize
    db.Sequelize = Sequelize

    console.log('> Connected in schema: ' + dbKey)

    dbRepo[dbKey] = db
  
    return dbRepo
}

module.exports = {addSequelizeConnectionToRepo}