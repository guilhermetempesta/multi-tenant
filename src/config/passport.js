const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const { authSecret } = require('../../.env')

const dbRepo = require('../models');
const common = require('../utils/common')

module.exports = app => {

    const params = { 
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true
    }

    const userModel = async (request) => {
        try {
            const dbKey = await common.getDBKeyFromRequest(request)
            // console.log('----> userModel dbKey: ' + dbKey)
            const User = dbRepo[dbKey].User
            return User
        } catch (err) {
            throw err
        }
    }

    const strategy = new Strategy(params, async (request, payload, done)  => {  
        
        const tenantId = request.headers['x-tenant-id']
        if (tenantId!==payload.tenantId) {
            return done(null, false)
        }

        const User = await userModel(request) 
        await User.findOne({
            where: {
                id: payload.id,
                email: payload.email,
                deletedAt: null
            }    
        })        
        .then(user => done(null, user ? { ...payload } : false))
        .catch(err => done(err))


        // common.getDBKeyFromRequest(request)
        //     .then(async teste => {

        //         db.addSequelizeConnectionToRepo(dbRepo, dbKey)
        //         // console.log('>>> retorno dbKey to repo: ' + dbKey)
        //         // console.log('>>> testando payload dbkey: ' + payload.system_access)
                               
        //         const dbKey = payload.system_access
        //         console.log('system_access: ' + dbKey)

        //         const User = dbRepo[dbKey].User
        //         const user = await User.findOne({
        //             where: {
        //                 id: payload.id,
        //                 email: payload.email,
        //                 deletedAt: null
        //             }
        //         })
        //         return user
        //     })
        //     .then(user => done(null, user ? { ...payload } : false))
        //     .catch(err => done(err))
    })

    passport.use(strategy)

    return { authenticate: () => passport.authenticate('jwt', { session: false }) }
}

