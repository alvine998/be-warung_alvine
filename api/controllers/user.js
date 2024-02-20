
const db = require('../models')
const users = db.users
const tSession = db.sessions
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
const fs = require('fs')
const crypto = require('crypto')
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = req.query.size || 10;
        const result = await users.findAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.app_id && { app_id: { [Op.eq]: req.header('x-app-id') } },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { email: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.role && { role: { [Op.eq]: req.query.role } },
            },
            order: [
                ['created_on', 'DESC'],
            ],
            attributes: {
                exclude: ['modified_on', 'deleted', 'password']
            },
            limit: size
        })
        return res.status(200).send({
            status: "success",
            total_items: result.length,
            items: result,
            code: 200
        })
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error: error })
    }
};

exports.create = async (req, res) => {
    try {
        const existUsers = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                email: { [Op.eq]: req.body.email },
                phone: { [Op.eq]: req.body.phone }
            }
        })
        if (existUsers) {
            return res.status(404).send({ message: "Email atau no telepon telah terdaftar!" })
        }
        const payload = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 8)
        };
        const result = await users.create(payload)
        return res.status(200).send({
            status: "success",
            items: result,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.login = async (req, res) => {
    try {
        const existUsers = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                [Op.or]: {
                    email: { [Op.eq]: req.body.email },
                    phone: { [Op.eq]: req.body.phone },
                }
            }
        })
        if (!existUsers) {
            return res.status(404).send({ message: "Email atau No Telepon tidak ditemukan!" })
        }
        const comparePassword = await bcrypt.compare(req.body.password, existUsers.password)
        if (!comparePassword) {
            return res.status(404).send({ message: "Password Salah" })
        }
        const existToken = await tSession.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                user_id: { [Op.eq]: existUsers.id },
            }
        })
        if(existToken){
            existToken.deleted = 1
            await existToken.save()
        }
        const payload = {
            user_id: existUsers.id,
            user_name: existUsers.name,
            access_token: crypto.randomBytes(Math.ceil(50 / 2)).toString('hex').slice(0, 50)
        }
        const createSession = await tSession.create(payload)
        res.status(200).send({ message: "Berhasil login", result: existUsers, access_token: createSession.access_token })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.logout = async (req, res) => {
    try {
        const result = await tSession.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                user_id: { [Op.eq]: req.header('x-user-id') },
                access_token: { [Op.eq]: req.header('x-access-token') },
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        await result.save()
        res.status(200).send({ message: "Berhasil logout" })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.update = async (req, res) => {
    try {
        const result = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        const payload = {
            ...req.body,
            ...req.body.password && { password: bcrypt.hashSync(req.body.password, 8) }
        }
        const onUpdate = await users.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results, update: onUpdate })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        await result.save()
        res.status(200).send({ message: "Berhasil hapus data" })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}