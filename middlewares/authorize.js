const authorizeUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(400).send('You are not authorized to see this resource')

    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).send('You are not authorized to see this resource')

    const secretKey = process.env.JWT_SECRET
    const verified = await jwt.verify(token, secretKey)

    next()
}

/**
 * 
 * @todo create a stronger ACL system
 */

module.exports = { authorizeUser }