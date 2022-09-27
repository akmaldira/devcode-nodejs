const db = require("../models");

module.exports = {
    getAllTodo: async (req, res) => {
        const { activity_group_id } = req.query;
        if (activity_group_id == undefined) {
            await db.todo.findAll({})
            .then((data) => {
                return res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data,
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status: "Server Error",
                    message: err,
                })
            });
        } else {
            await db.todo.findAll({
                where: {
                    activity_group_id,
                }
            })
            .then((data) => {
                return res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data,
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status: "Server Error",
                    message: err,
                })
            });
        }
    },

    getOneTodo: async (req, res) => {
        const { id } = req.params;
        await db.todo.findOne({
            where: {
                id,
            }
        })
        .then((data) => {
            if (data === null) {
                return res.status(404).json({
                    status: "Not Found",
                    message: `Todo with ID ${id} Not Found`,
                    data: {}
                })
            }
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
        })
    },

    postTodo: async (req, res) => {
        const { title, activity_group_id } = req.body;
        const priority = req.body.priority || "very-high";
        if (title === undefined) {
            return res.status(400).json({
                status: "Bad Request",
                message: "title cannot be null",
                data: {},
            })
        }
        else if (activity_group_id === undefined) {
            return res.status(400).json({
                status: "Bad Request",
                message: "activity_group_id cannot be null",
                data: {},
            })
        }
        await db.todo.create({
            title,
            activity_group_id,
            is_active: true,
            priority,
        })
        .then((result) => {
            return res.status(201).json({
                status: "Success",
                message: "Success",
                data: result,
            })
        })
        .catch((err) => {
            if (err.name = 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                    status: "Bad Request",
                    message: `activity_group_id ${activity_group_id} Not Found`,
                })
            }
            return res.status(500).json({
                status: "Server Error",
                message: err,
            })
        });
    },

    deleteTodo: async (req, res) => {
        const { id } = req.params;
        await db.todo.destroy({
            where: {
                id,
            }
        })
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    status: "Not Found",
                    message: `Todo with ID ${id} Not Found`,
                    data: {},
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: {},
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status: "Server Error",
                message: err,
            })
        })
    },

    updateTodo: async (req, res) => {
        const { id } = req.params;
        const data = req.body
        await db.todo.update(data, {
            where: {
                id,
            }
        })
        .then(async(result) => {
            if (!result[0]) {
                return res.status(404).json({
                    status: "Not Found",
                    message: `Todo with ID ${id} Not Found`,
                    data: {}
                });
            }
            const data = await db.todo.findOne({
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
            })
        })
    },
}