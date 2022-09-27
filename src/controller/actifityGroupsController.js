const db = require('../models/index');

module.exports = {
    getAllActifity: async (req, res) => {
        await db.actifity.findAll({})
        .then((data) => {
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "Server Error",
                message: err,
            })
        })
    },

    getOneActifity: async (req, res) => {
        const { id } = req.params;
        await db.actifity.findOne({
            where: {
                id,
            }
        })
        .then((result) => {
            if (result === null) {
                return res.status(404).json({
                    status: "Not Found",
                    message: `Activity with ID ${id} Not Found`,
                    data: {},
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: result,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status: "Server Error",
                message: err,
            })
        })
    },

    postActifity: async (req, res) => {
        const data = req.body;
        if (data.title === undefined) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'title cannot be null',
                data: {},
            });
        }
        await db.actifity.create(data)
        .then((result) => {
            return res.status(201).json({
                status: "Success",
                message: "Success",
                data: result,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status: "Server Error",
                message: err,
            })
        })
    },

    updateActifity: async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        if (Object.keys(data).length < 1 ) {
            return res.status(400).json({
                status: "Bad Request",
                message: "title cannot be null",
                data: {},
            })
        }
        await db.actifity.update(data, {
            where: {
                id,
            }
        })
        .then(async(result) => {
            if (!result[0]) {
                return res.status(404).json({
                    status: "Not Found",
                    message: `Activity with ID ${id} Not Found`,
                    data: {}
                });
            }
            const data = await db.actifity.findOne({
                where: {
                    id,
                }
            })
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "Server Error",
                message: err,
            });
        });
    },

    deleteActifity: async (req, res) => {
        const { id } = req.params;
        await db.actifity.destroy({
            where: {
                id,
            }
        })
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    status: "Not Found",
                    message: `Activity with ID ${id} Not Found`,
                    data: {},
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: {},
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "Server Error",
                message: err,
            });
        })
    },

};