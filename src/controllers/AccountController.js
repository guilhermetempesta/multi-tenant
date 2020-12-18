const accountService = require('../services/AccountService')

module.exports = app => {

    const signup = async (req, res) => {
        try {
            const account = req.body
            try {
                await accountService.validate(account)
            } catch (err) {
                return res.status(400).json({ error: err })
            }
            await accountService.signup(account)
            res.status(204).send()
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }    
    }
    
    return { signup }
}