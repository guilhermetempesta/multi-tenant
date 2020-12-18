const app = require('express')()
const consign = require('consign')
const port = process.env.PORT || 3330 
// const db = require('./database/index')

// let dbRepo = {}
// app.db = db.addSequelizeConnectionToRepo(dbRepo, 'default');

consign() 
    .include('./src/config/passport.js')
    .then('./src/middlewares/index.js')
    .then('./src/services')
    .then('./src/utils')
    .then('./src/controllers')
    .then('./src/routes/index.js')
    .into(app)

app.listen(port, () => {
    console.log(`Server is running in port ${port}...`)
})