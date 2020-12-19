const dbRepo = require('../models');
const bcrypt = require('bcrypt-nodejs')

const validate = (user) => {
    try {
        if (!user.firstName) { throw 'Nome não informado!'}
        if (!user.lastName) { throw 'Sobrenome não informado!'}
        if (!user.email) { throw 'E-mail não informado!'}
        if (!user.password) { throw 'Senha não informada!'}
        if (!user.confirmPassword) { throw 'Confirme sua senha!'}
        if (user.password !== user.confirmPassword) { throw 'As senhas não conferem!' }
        
    } catch (err) {
        throw err
    }
}

const alreadyExists = async (user, dbKey) => {    
    try {
        const User = dbRepo[dbKey].User
        const emailExists = await User.findOne({ 
            where: { 
                email: user.email, 
                deletedAt: null,
            }
        })
        if (emailExists) { throw 'Este e-mail já está sendo utilizado!' }
    } catch (err) {
        throw err
    } 
} 

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const create = async (userData, dbKey) => {
    try {      
        userData.password = encryptPassword(userData.password)
        delete userData.confirmPassword

        const User = dbRepo[dbKey].User;
        const user = await User.create(userData)
        
        return user
    } catch(err) {
        throw err
    }
}

const update = async (userData, dbKey) => {
    try {
        userData.password = encryptPassword(userData.password)
        delete userData.confirmPassword
        
        const User = dbRepo[dbKey].User;
        const user = await User.update(userData, { 
            where: { id: userData.id} 
        })
        
        return user
    } catch (err) {
        throw err
    }
}

const get = async (dbKey) => {
    try {
        const User = dbRepo[dbKey].User;
        const users = await User.findAll({ 
            attributes: ['id', 'first_name', 'last_name', 'email', 'admin'], 
            where: { deletedAt: null },
            order: ['id']
        })
        return users
    } catch (err) {
        throw err
    }
}

const getById = async (userId, dbKey) => {
    try {
        const User = dbRepo[dbKey].User;
        const user = await User.findOne({ 
            attributes: ['id', 'first_name', 'last_name', 'email', 'admin'],
            where: { 
                id: userId,
                deletedAt: null 
            } 
        })
        return user
    } catch (err) {
        throw err
    }
}

const remove = async (userId, dbKey) => {
    try {
        const User = dbRepo[dbKey].User;
        await User.update(
            { deletedAt: new Date() },
            { where: { id: userId } }
        )
    } catch (err) {
        throw err
    }
}

module.exports = { create, update, get, getById, remove, validate, alreadyExists }