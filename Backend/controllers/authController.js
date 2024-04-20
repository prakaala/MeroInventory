const User = require("../models/authModel")
const createError = require("http-errors")
const { authSchema } = require("../middleware/authHelpers/validationSchema")
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../middleware/authHelpers/jwtHelper")


//Register
exports.register = async (req, res, next) => {
    console.log(req.body);
    try {
        const result = await authSchema.validateAsync(req.body)
        console.log(result ,"abd")
        const doesExist = await User.findOne({ email: result.email })
        if (doesExist)
            throw createError.Conflict(`${result.email} is already registered.`)

        const user = await User.create({email:result.email, password:result.password})
        // const savedUser = await user.save()
        // const accessToken = await signAccessToken(savedUser.id)
        // const refreshToken = await signRefreshToken(savedUser.id)

        res.send({user})

    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        console.log(error);
        next(error);
    }
}

//Login
exports.login = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await authSchema.validateAsync(req.body);
        console.log(result);
        const user = await User.findOne({ email: result.email })

        if (!user) {
            throw createError.NotFound("User not registered");
        }

        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) {
            throw createError.Unauthorized('Username/Password not valid');
        }

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.send({ accessToken, refreshToken });
    } catch (error) {
        if (error.isJoi === true) {
            return next(createError.BadRequest("Invalid Username/Password"));
        }
        console.log(error);
        next(error);
    }
};

//Refresh Token
exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken)
            throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId)
        res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
        next(error)
    }
}



//Logout
exports.logout = async (req, res, next) => {
    try {
        console.log(req.body)
        const { refreshToken } = req.body
        console.log(refreshToken)
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        console.log(userId)
        client.DEL(userId, (err, val) => {
            if (err) {
                console.log(err.message)
                throw createError.InternalServerError()
            }
            console.log(val)
            res.sendStatus(204)
        })
    } catch (error) {
        next(error)
    }
}


