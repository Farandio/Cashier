const express = require("express")
const app = express()
const moment = require("moment")
const transaksi = require("../models/index").transaksi
const detail_transaksi = require("../models/index").detail_transaksi

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/detail", async (req, res) => {
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

app.get("/detail/:id", async (req, res) => {
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

app.get("/", async (req, res) => {
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

app.get("/:id", async (req, res) => {
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

app.post("/", async (req, res) => {
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

app.put("/", async (req, res) => {
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

app.delete("/:id", async (req, res) => {
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