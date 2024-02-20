
const db = require('../models')
const stores = db.stores
const tUser = db.users
const Op = db.Sequelize.Op
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = +req.query.size || 10;
        const offset = req.query.page ? +req.query.page * +size : 0;
        const query = req.query
        const { rows, count } = await stores.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...query.id && { id: { [Op.eq]: query.id } },
                ...query.user_id && { user_id: { [Op.eq]: query.user_id } },
                ...query.status && { status: { [Op.in]: query.status } },
                ...query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query.search}%` } },
                        { user_name: { [Op.like]: `%${query.search}%` } },
                    ]
                },
            },
            order: [
                ['created_on', 'DESC'],
            ],
            attributes: {
                exclude: ['modified_on', 'deleted']
            },
            limit: size,
            offset: offset
        })
        return res.status(200).send({
            status: "success",
            total_items: count,
            total_pages: Math.ceil(count / size),
            current_page: +req.query.page || 0,
            items: rows,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.create = async (req, res) => {
    try {
        // Validasi
        ["user_id", "name", "longitude", "latitude", "type"]?.map(val => {
            if (!req.body[val]) {
                return res.status(404).send({ message: `Parameter tidak lengkap ${val}` })
            }
        })
        const existUser = await tUser.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.user_id }
            }
        })
        if (!existUser) {
            return res.status(404).send({ message: "Data user tidak ditemukan!" })
        }
        const payload = {
            ...req.body,
            user_id: existUser.id,
            user_name: existUser.name
        };
        const result = await stores.create(payload)
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

exports.update = async (req, res) => {
    try {
        const result = await stores.findOne({
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
        }
        const onUpdate = await stores.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data" })
        return
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Gagal mendapatkan data admin", error: error });
        return
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await stores.findOne({
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
        console.log(error);
        res.status(500).send({ message: "Gagal mendapatkan data admin", error: error });
        return
    }
}