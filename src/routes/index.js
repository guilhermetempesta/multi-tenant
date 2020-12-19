const admin = require('../middlewares/admin')

module.exports = app => {

    app.post('/signup', app.src.controllers.AccountController.signup)
    app.post('/signin', app.src.controllers.auth.signin)
       
    app.route('/users')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.controllers.UserController.get))
        .post(admin(app.src.controllers.UserController.create))

    app.route('/users/:id')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.controllers.UserController.getById))
        .put(admin(app.src.controllers.UserController.update))
        .delete(admin(app.src.controllers.UserController.remove))
 
    app.route('/cities')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.CityController.get)
    
    app.route('/cities/:id')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.CityController.getById)
    
    app.route('/banks')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.BankController.get)
    
    app.route('/banks/:id')
        .all(app.src.config.passport.authenticate())
        .get(app.src.controllers.BankController.getById)
}