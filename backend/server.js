const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

app.use(express.static(__dirname))

const user = require("./router/user")
app.use("/cashier/api/user", user)

const menu = require("./router/menu")
app.use("/cashier/api/menu", menu)

const meja =require("./router/meja")
app.use("/cashier/api/meja", meja)

const transaksi = require("./router/transaksi")
app.use("/cashier/api/transaksi", transaksi)

app.listen(4000, () => {
    console.log("Server run on port 4000")
})