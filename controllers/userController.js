const User = require('../database/models/User')
const bcrypt = require('bcrypt')

/* GET users listing. */
exports.scan = (req, res) => {
    res.send('wesh')
}

/* POST login a user */
exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).send('Invalid login request')

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).send('Invalid login request')

    const token = await user.generateToken()
    res.status(200).send(token)
 }

/* POST a new user. */
exports.plug = async (req, res) => {
    const { username, email, password } = req.body

    /**
     * @todo implement validation logic with Joi
     */

    const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    })
    try {
        await user.save()
        res.send(user)
    } catch (e) {
        console.error(e)
        return res.status(400).send('There was a problem plugging the user in')
    }
}

/* PUT a user. */
exports.update = (req, res) => {
    res.send('wesh')
}

/* DELETE a user. */
exports.unplug = (req, res) => {
    res.send('wesh')
}