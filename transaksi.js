const express = require("express")
const app = express()
const mysql = require("mysql")
const moment = require("moment")
const transaksi = require("../models/index").transaksi
const detail_transaksi = require("../models/index").detail_transaksi
const menu = require("../models/index").menu
const meja = require("../models/index").meja
const user = require("../models/index").user
const auth = require("../auth")
const { sequelize } = require("../models/index")
const conn = require("../conn")

const { Op } = require('sequelize')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/detail", auth, async (req, res) => {
    detail_transaksi.findAll({
        include: ["transaksi", "menu"]
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/tanggal/:id", auth, async (req, res) => {
    let param = {
        id_transaksi: req.params.id
    }
    detail_transaksi.findAll({
        include: ["transaksi", "menu"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/detail/:id", auth, async (req, res) => {
    let param = {
        id_transaksi: req.params.id
    }
    detail_transaksi.findAll({
        include: ["transaksi", "menu"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/detail/menu/:id", auth, async (req, res) => {
    let param = {
        id_menu: req.params.id
    }
    detail_transaksi.findAll({
        include: ["transaksi", "menu"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/", auth, async (req, res) => {
    transaksi.findAll({
        include: ["user", "meja"]
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/user/:nama_user", auth, async (req, res) => {
    let param = {
        nama_user: req.params.nama_user,
    }
    transaksi.findAll({
        include: ["user", "meja"],
        where: {
            [Op.or]: [
                {'$user.nama_user$': {[Op.like]: `%${param.nama_user}%`}}
            ]
        }
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/riwayat/:status", auth, async (req, res) => {
    let param = {
        status: req.params.status,
    }
    transaksi.findAll({
        include: ["user", "meja"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/riwayat/:status/:id", auth, async (req, res) => {
    let param = {
        status: req.params.status,
        id_user: req.params.id
    }
    transaksi.findAll({
        include: ["user", "meja"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/qtybymenu", auth, async (req, res) => {
    conn.query(
        "SELECT menu.id_menu, menu.nama_menu, SUM(detail_transaksi.qty) AS total_qty FROM menu JOIN detail_transaksi ON menu.id_menu = detail_transaksi.id_menu GROUP BY menu.id_menu",
        (err, results, fields) => {
            if (!err) {
                res.send(results);
            } else {
                console.log(err);
            }
        }
    );
});


app.get("/:id", auth, async (req, res) => {
    let param = {
        id_transaksi: req.params.id
    }
    transaksi.findAll({
        include: ["user", "meja"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/", auth, async (req, res) => {
    let data_transaksi = {
        tgl_transaksi: moment().format("YYYY-MM-DD"),
        id_user: req.body.id_user,
        id_meja: req.body.id_meja,
        nama_pelanggan: req.body.nama_pelanggan,
        status: 'belum_bayar',
        jenis_pesanan: req.body.jenis_pesanan
    }
    transaksi.create(data_transaksi)
        .then(result => {
            let lastID = result.id_transaksi
            let detail = req.body.detail_transaksi
            detail.forEach(element => {
                element.id_transaksi = lastID
            });
            detail_transaksi.bulkCreate(detail)
            res.json({
                message: "Data Berhasil Ditambahkan",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/", auth, async (req, res) => {
    let param = {
        id_transaksi: req.body.id_transaksi
    }
    let data = {
        status: req.body.status
    }
    transaksi.update(data, { where: param })
        .then(result => {
            res.json({
                message: "Data Berhasil Diperbarui"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", auth, async (req, res) => {
    let param = {
        id_transaksi: req.params.id
    }
    try {
        await detail_transaksi.destroy({where: param})
        await transaksi.destroy({where: param})
        res.json({
            message : "data berhasil dihapus"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }

})
module.exports = app