const JWT = require('jsonwebtoken');
require('dotenv').config()
const createError = require('http-errors')
// const client = require('./init_redis')
console.log(process.env.ACCESS_TOKEN_SECRET)
module.exports = {
    
    signAccessToken: (userId) => {
        console.log(process.env.ACCESS_TOKEN_SECRET)
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: "3600s",
                issuer: "google.com",
                audience: userId
            }

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) {
            return next(createError.Unauthorized());
        }
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1]

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload;
            next();
        });
    },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '31536000s',
                issuer: 'google.com',
                audience: userId,
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                    // return;
                }

                // const ttlSeconds = 365 * 24 * 60 * 60; // 1 year in seconds

                // client.SET(userId, token, 'EX', ttlSeconds, (err, reply) => {
                //     if (err) {
                //         console.log(err.message);
                //         reject(createError.InternalServerError());
                //         return;
                //     }
                // });
                resolve(token);
            });
        });
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createError.Unauthorized())
                const userId = payload.aud;
                // client.GET(userId, (err, result) => {
                //     if (err) {
                //         console.log(err.message)
                //         reject(createError.InternalServerError())
                //         return
                //     }
                //     if (refreshToken === result) {
                //         return resolve(userId)
                //     }
                //     reject(createError.Unauthorized())
                //     resolve(userId)
                // })
                resolve(userId);
            })
        })

    }
}