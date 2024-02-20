const db = require('../models')
const tSession = db.sessions
const Op = db.Sequelize.Op
const moment = require('moment')
exports.middlewareHere = async (req, res, next) => {
    try {
        const result = await tSession.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                user_id: { [Op.eq]: req.header('x-user-id') }
            }
        })
        if (!result?.access_token) {
            return res.status(401).send({
                message: "Access Denied for access token!",
                code: 401
            })
        }
        if (req.header('x-access-token') !== result?.access_token) {
            return res.status(401).send({
                message: "Access Denied, access token not registered!",
                code: 401
            })
        }
        if (moment().format("YYYY-MM-DD HH:mm:ss") > result?.expired_on) {
            return res.status(401).send({
                message: "Token Expired!",
                code: 401
            })
        }
        if (!req.header('x-store-id')) {
            return res.status(401).send({
                message: "Masukkan Asal Tokomu!",
                code: 401
            })
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

exports.middlewareNonStore = async (req, res, next) => {
    try {
        const result = await tSession.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                user_id: { [Op.eq]: req.header('x-user-id') }
            }
        })
        if (!result?.access_token) {
            return res.status(401).send({
                message: "Access Denied for access token!",
                code: 401
            })
        }
        if (req.header('x-access-token') !== result?.access_token) {
            return res.status(401).send({
                message: "Access Denied, access token not registered!",
                code: 401
            })
        }
        if (moment().format("YYYY-MM-DD HH:mm:ss") > moment(result.expired_on).format("YYYY-MM-DD HH:mm:ss")) {
            return res.status(401).send({
                message: "Token Expired!",
                code: 401
            })
        }
        next()
    } catch (error) {
        console.log(error);
    }
}