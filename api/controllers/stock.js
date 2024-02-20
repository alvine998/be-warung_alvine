
const db = require('../models')
const stocks = db.stocks
const Op = db.Sequelize.Op
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const query = req.query
        const size = +query.size || 10;
        const offset = query.page ? +query.page * +size : 0;
        const { rows, count } = await stocks.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                store_id: { [Op.eq]: req.header('x-store-id') },
                ...query.status && { status: { [Op.in]: query.status } },
                ...query.product_id && { product_id: { [Op.in]: query.product_id } },
                ...query.search && {
                    [Op.or]: [
                        { product_name: { [Op.like]: `%${query.search}%` } },
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
            current_page: +query.page || 0,
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
        const payload = {
            ...req.body,
        };
        const result = await stocks.create(payload)
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
        const result = await stocks.findOne({
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
        const onUpdate = await stocks.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await stocks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results, update: onUpdate })
        return
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Gagal mendapatkan data admin", error: error });
        return
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await stocks.findOne({
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