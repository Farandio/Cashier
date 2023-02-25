const express = require("express")
const app = express()
const meja = require("../models/index").meja
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "INIPUNYAKASIR"
const auth = require("../auth")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", auth, async (req, res) => {
    meja.findAll()
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

app.get("/:id", auth, async (req, res) => {
    let param = {
        id_meja: req.params.id
    }
    meja.findOne({ where: param })
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

app.get("/status/:status_meja", auth, async (req, res) => {
    let param = {
        status_meja: req.params.status_meja
    }
    meja.findAll({ where: param })
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
    let data = {
        nomor_meja: req.body.nomor_meja,
        status_meja: "tersedia"
    }
    meja.create(data)
        .then(result => {
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
        id_meja: req.body.id_meja
    }
    let data = {
        nomor_meja: req.body.nomor_meja,
        status_meja: req.body.status_meja
    }
    meja.update(data, { where: param })
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
        id_meja: req.params.id
    }
    meja.destroy({ where: param })
        .then(result => {
            res.json({
                message: "Data Berhasil Dihapus"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
module.exports = app