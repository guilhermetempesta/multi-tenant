const { dbConfig } = require('../../.env')
const dbRepo = require('../models') 
const Account = dbRepo['default'].Account;
const cli = require('../utils/cli');
const dbConnector = require('../database/index');
const userService = require('../services/UserService')

const validate = async (account) => {
    try {
        if (!account.companyName) {throw 'Nome da empresa não informado!'}
        if (!account.email) {throw 'E-mail não informado!'}
        // if (!account.subDomain) {throw 'Sub-domínio não informado!'}
        if (!account.firstName) { throw 'Nome não informado!'}
        if (!account.lastName) { throw 'Sobrenome não informado!'}
        if (!account.password) { throw 'Senha não informada!'}
        if (!account.confirmPassword) { throw 'Confirme sua senha!'}
        if (account.password !== account.confirmPassword) { throw 'As senhas não conferem!' }

        dbConnector.addSequelizeConnectionToRepo(dbRepo, 'default')        
        const emailExists = await Account.findOne({ 
            where: { 
                email: account.email, 
                deletedAt: null,
            }
        })
        if (emailExists) { throw 'Este e-mail já está sendo utilizado!' }

        // const subDomainExists = await Account.findOne({ 
        //     where: { 
        //         subDomain: account.subDomain, 
        //         deletedAt: null,
        //     }
        // })
        // if (subDomainExists) { throw 'Este Sub-domínio já está sendo utilizado!' }
    
    } catch(err) {            
        throw err
    }
}

const createAccount = async (account) => {
    try {  
        dbConnector.addSequelizeConnectionToRepo(dbRepo, 'default')
        newAccount = await Account.create(account)
        return newAccount
    } catch(err) {
        throw err
    }
}

const getAccount = async (accountId) => {
    try {
        dbConnector.addSequelizeConnectionToRepo(dbRepo, 'default')
        account = Account.findOne({ 
            where: { id: accountId } 
        })
        return account
    } catch (err) {
        throw err
    }
}

const createTenantDB = async (accountId) => {   
    let connectionString = `${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/tenant_${accountId}`;
    await cli.executeCommand(`npx sequelize db:create --url ${connectionString}`);
    await cli.executeCommand(`npx sequelize db:migrate --url ${connectionString}`);
    await cli.executeCommand(`npx sequelize db:seed:all --url ${connectionString}`);
    dbConnector.addSequelizeConnectionToRepo(dbRepo, `tenant_${accountId}`);   
}

const signup = async (body) => {
    const account = {
        "companyName": body.companyName,
        "email": body.email,
        "subDomain": body.subDomain
    }

    const user = {
        "firstName": body.firstName,
        "lastName": body.lastName,
        "email": body.email,
        "password": body.password,
        "admin": true
    }

    try {
        const newAccount = await createAccount(account)
        
        const accountId = newAccount.id
        await createTenantDB(accountId)
        
        const dbKey = `tenant_${accountId}`
        await userService.create(user, dbKey)
        
    } catch (err) {
        throw err
    } finally {
        // dbConnector.addSequelizeConnectionToRepo(dbRepo, 'default')
    }
}

module.exports = { signup, getAccount, validate }