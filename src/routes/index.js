const admin = require('../middlewares/admin')

module.exports = app => {

    app.post('/signup', app.src.controllers.AccountController.signup)
    app.post('/signin', app.src.controllers.auth.signin)
    // app.post('/validadeToken', app.src.controllers.AuthController.validateToken)
       
    app.route('/users')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.controllers.UserController.get))
        .post(admin(app.src.controllers.UserController.create))

    app.route('/users/:id')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.controllers.UserController.getById))
        .put(admin(app.src.controllers.UserController.update))
        .delete(admin(app.src.controllers.UserController.remove))
/*
    app.route('/municipios')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.MunicipioController.get)
        .post(app.src.controllers.MunicipioController.save)
    
    app.route('/municipios/:id')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.MunicipioController.getById)
        .put(app.src.controllers.MunicipioController.save)
        .delete(app.src.controllers.MunicipioController.remove)

    app.route('/bancos')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.BancoController.get)
        .post(app.src.controllers.BancoController.save)
    
    app.route('/bancos/:id')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.BancoController.getById)
        .put(app.src.controllers.BancoController.save)
        .delete(app.src.controllers.BancoController.remove)
*/
}