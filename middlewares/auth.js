const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(500).json('Membutuhkan header x-access-token')
        }else{
            const result = verifyToken(token);
            res.locals.user = result
            next()
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = authentication;