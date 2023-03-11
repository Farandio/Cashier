import React, { Component, useState } from 'react'
import $ from "jquery";
import axios from "axios";
import NavbarKasir from "../../Navbar/NavbarKasir";
// import { response } from '../../../../../backend/router/menu';

export default class ListMenu extends Component {
  constructor() {
    super()
    this.state = {
        makanan: [],
        minuman: [],
        meja: [],
        menus: [],
        action: "",
        token: "",
        id_transaksi: 0,
        tgl_transaksi: '',
        id_user: 0,
        id_meja: 0,
        nama_pelanggan: '',
        status: '',
        jenis_pesanan: '',
        cart: [],
        total: [],
        totalBayar: 0
    }
    let user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem("token") && user.role == "kasir") {
        this.state.token = localStorage.getItem("token")
    } else {
        window.location = "/"
    }
}
headerConfig = () => {
    let header = {
        headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header;
}

getMakanan = () => {
    let url = "http://localhost:4000/cashier/api/menu/jenis/makanan"
    axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({ makanan: response.data.data })
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    window.location = '/'
                }
            } else {
                console.log(error);
            }
        })
}

getMinuman = () => {
    let url = "http://localhost:4000/cashier/api/menu/jenis/minuman"
    axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({ minuman: response.data.data })
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    window.location = '/'
                }
            } else {
                console.log(error);
            }
        })
}

getMeja = () => {
    let url = "http://localhost:4000/cashier/api/meja/status/tersedia"
    axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({ meja: response.data.data })
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    window.location = '/'
                }
            } else {
                console.log(error);
            }
        })
}

Add = () => {
    $("#modal_transaksi").show()
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({
        id_transaksi: 0,
        tgl_transaksi: '',
        id_meja: 0,
        id_user: user.id_user,
        nama_pelanggan: '',
        status: 'belum_bayar',
        jenis_pesanan: '',
    })
}
handlePlus = (value) => {
    axios
        .get("http://localhost:4000/cashier/api/menu/" + value.id_menu, this.headerConfig())
        .then((res) => {
            if (this.state.cart.length === 0) {
                const keranjang = {
                    id_menu: value.id_menu,
                    qty: 1
                }
                this.state.cart.push(keranjang)
                this.state.menus.push(res.data.data)
                let harga1 = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                this.setState({ totalBayar : harga1 })
            } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
                this.state.cart.find(item => item.id_menu === value.id_menu).qty++
                let harga2 = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                this.setState({ totalBayar: this.state.totalBayar + harga2 })
            } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
                const keranjang = {
                    id_menu: value.id_menu,
                    qty: 1
                }
                this.state.cart.push(keranjang)
                this.state.menus.push(res.data.data)
                let harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                this.setState({ totalBayar: this.state.totalBayar + harga })
            }
            this.setState({
                cart: this.state.cart,
                menus: this.state.menus
            })
        })
        .catch(error => console.log(error))
};

handleMinus = (value) => {
    axios.get("http://localhost:4000/cashier/api/menu/" + value.id_menu, this.headerConfig())

        .then((res) => {
            let i = this.state.cart.indexOf()
            let a = this.state.menus.indexOf()
            if (this.state.cart.length === 0) {
                window.alert("Belum ada yang dipesan")
            } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
                if (this.state.cart.find(item => item.qty > 0)) {
                    this.state.cart.find(item => item.id_menu === value.id_menu).qty--
                    let harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                    this.setState({ totalBayar: this.state.totalBayar - harga })
                } else {
                    window.alert("Belum ada yang dipesan")
                }
            } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
                window.alert("Belum ada yang dipesan")
            }
            this.state.cart.find(item => item.qty === 0) ? this.state.cart.splice(i) && this.state.menus.splice(a) : console.log("lanjut")
            console.log(this.state.cart)
            this.setState({
                cart: this.state.cart,
                menus: this.state.menus
            })
        })
        .catch(error => console.log(error))

};

getItemQuantity(itemId) {
    const item = this.state.cart.find((item) => item.id_menu === itemId);
    return item ? item.qty : 0;
}
getHarga(itemId) {
    const item = this.state.cart.find((item) => item.id_menu === itemId);
    const menu = this.state.menus.find((item) => item.id_menu === itemId);
    return item ? menu.harga * item.qty : 0;
}
// getTotalBayar(itemId) {
//     var item = []
//     item.push(this.state.cart.find((item) => item.id_menu === itemId))
//     var menu = []
//     menu.push(this.state.menus.find((item) => item.id_menu === itemId))
//     var totalBayar = 0
//     for (var i = 0; i < item.length; i++) {
//         totalBayar += menu[i].harga * item[i].qty
//     }
//     return totalBayar
// }
saveTransaksi = (event) => {
    event.preventDefault()
    $("#modal_transaksi").show()
    let sendData = {
        id_transaksi: this.state.id_transaksi,
        tgl_transaksi: this.state.tgl_transaksi,
        id_user: this.state.id_user,
        id_meja: this.state.id_meja,
        nama_pelanggan: this.state.nama_pelanggan,
        status: this.state.status,
        jenis_pesanan: this.state.jenis_pesanan,
        detail_transaksi: this.state.cart
    }
    let sendData2 = {
        id_transaksi: this.state.id_transaksi,
        tgl_transaksi: this.state.tgl_transaksi,
        id_user: this.state.id_user,
        id_meja: null,
        nama_pelanggan: this.state.nama_pelanggan,
        status: this.state.status,
        jenis_pesanan: this.state.jenis_pesanan,
        detail_transaksi: this.state.cart
    }
    let data = {
        id_meja: this.state.id_meja,
        status_meja: "tidak_tersedia"
    }
    let url = "http://localhost:4000/cashier/api/transaksi"
    if (this.state.jenis_pesanan === "dine_in") {
        axios.post(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                axios.put("http://localhost:4000/cashier/api/meja/", data, this.headerConfig())
                window.location = '/kasir/riwayatKasir'
                this.getMenu()

            })
            .catch(error => console.log(error))
    } else if (this.state.jenis_pesanan === "take_away") {
        axios.post(url, sendData2, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                window.location = '/kasir/riwayatKasir'
                this.getMenu()
            })
            .catch(error => console.log(error))
    }
    $("#modal_transaksi").hide()
}
dropTransaksi = selectedItem => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        let url = "http://localhost:4000/cashier/api/transaksi/" + selectedItem.id_transaksi
        axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMenu()
            })
            .catch(error => console.log(error))
    }
}

inputMeja = () => {
  if(this.state.jenis_pesanan == "dine_in"){
    $("#input_meja").show()
  } else {
    $("#input_meja").hide()
  }
}

bind = (event) => {
    this.setState({ [event.target.name]: event.target.value })
}
componentDidMount() {
    this.getMakanan()
    this.getMinuman()
    this.getMeja()
}
close = () => {
    $("#modal_transaksi").hide()
}

convertToRupiah(number) {

    if (number) {

        var rupiah = "";

        var numberrev = number

            .toString()

            .split("")

            .reverse()

            .join("");

        for (var i = 0; i < numberrev.length; i++)

            if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + ".";

        return (

            "Rp. " +

            rupiah

                .split("", rupiah.length - 1)

                .reverse()

                .join("")

        );

    } else {

        return number;

    }
    
    

}

  render() {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:bg-secondary-bg bg-fixed">
            <NavbarKasir />
            <div className="relative pl-5 pt-36">
              <button onClick={() => this.Add()} className="outline outline-1 dark:outline-white inline-flex items-center border hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-primary-600 dark:text-white dark:border-white dark:hover:bg-primary-700 dark:hover:border-white">Pesan</button>
            </div><br />
        <table className="shadow-2xl place-items-center w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-primary-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Gambar</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Produk
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis
              </th>
              <th scope="col" className="px-6 py-3">
                Jumlah
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          
            {this.state.makanan.map((item) => (
              // const cart = this.state.cart.find(cart => cart.id_menu === item.id_menu);
              // const qty = cart ? cart.qty : 0;
            <tr className="bg-tranparent bg-text-color bg-opacity-50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-32 p-4">
                <img className="rounded-t-lg outline outline-2 dark:outline-white" src={`http://localhost:4000/img/${item.gambar}`} alt="gambar" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.nama_menu}
              </td>
              <td className="px-6 py-4 font-sm text-gray-900 dark:text-gray-300">
                {item.jenis}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => this.handleMinus(item)}
                    className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-primary-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                    
                    <div>
                    <input
                      type="number"
                      id="first_product"
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-text-color dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={this.getItemQuantity(item.id_menu)}
                      placeholder=""
                      required=""
                      readOnly
                    />
                  </div>
                    
                  <button
                    onClick={() => this.handlePlus(item)}
                    className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-primary-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {this.convertToRupiah(item.harga)}
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Review
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        
        <table className="mt-9 shadow-2xl place-items-center w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-primary-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Gambar</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Produk
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis
              </th>
              <th scope="col" className="px-6 py-3">
                Jumlah
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          
            {this.state.minuman.map((item) => (
            <tr className="bg-tranparent bg-text-color bg-opacity-50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-32 p-4">
                <img className="rounded-t-lg outline outline-2 dark:outline-white" src={`http://localhost:4000/img/${item.gambar}`} alt="gambar" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.nama_menu}
              </td>
              <td className="px-6 py-4 font-sm text-gray-900 dark:text-gray-300">
                {item.jenis}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => this.handleMinus(item)}
                    className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-primary-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                    
                    <div>
                    <input
                      type="number"
                      id="first_product"
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-text-color dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={this.getItemQuantity(item.id_menu)}
                      placeholder=""
                      required=""
                      readOnly
                    />
                  </div>
                    
                  <button
                    onClick={() => this.handlePlus(item)}
                    className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-primary-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {this.convertToRupiah(item.harga)}
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Review
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

        {/*Modal*/}
        <div id="modal_transaksi" tabindex="-1" aria-hidden="true" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent dark:bg-white dark:bg-opacity-50">
                    <div class="flex lg:h-auto w-auto justify-center ">
                        <div class="relative bg-white rounded-lg shadow dark:bg-text-color w-auto outline outline-offset-2 outline-4 outline-text-color">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="text-xl font-medium text-gray-900 dark:text-white">Pemesanan</h3>
                                <div class="space-y-6">
                                    <table class="rounded-lg w-full text-sm text-left dark:text-white">
                                        <thead class="text-xs uppercase dark:bg-primary-700 dark:text-white">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Nama Menu
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Harga
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    qty
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.menus.map((item) => (
                                                <tr class="border-b font-sans dark:bg-text-color dark:border-gray-700  dark:hover:bg-gray-900" key={item.id_menu}>
                                                    <td class="px-6 py-4">
                                                        {item.nama_menu}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {this.convertToRupiah(item.harga)}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {this.getItemQuantity(item.id_menu)}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {this.convertToRupiah(this.getHarga(item.id_menu))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="bg-primary-700 rounded-lg p-2 border-2">
                                        <p className="dark:text-white">Total Bayar: {this.convertToRupiah(this.state.totalBayar)}</p>
                                    </div>
                                </div>
                                <form class="space-y-6 mt-6" onSubmit={(event) => this.saveTransaksi(event)}>
                                    <div>
                                        <label for="nama_pelanggan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pelanggan</label>
                                        <input type="text" name="nama_pelanggan" id="nama_pelanggan" value={this.state.nama_pelanggan} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama pelanggan" required />
                                    </div>
                                    <div>
                                        <label for="jenis_pesanan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Pesanan</label>
                                        <select onClick={() => this.inputMeja()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Pesanan" name="jenis_pesanan" value={this.state.jenis_pesanan} onChange={this.bind} required>
                                            <option value=''>Pilih Jenis Pesanan</option>
                                            <option value="dine_in">Dine In</option>
                                            <option value="take_away">Take Away</option>
                                        </select>
                                    </div>

                                    <div className='hidden modal' aria-hidden="true" id='input_meja'>
                                        <label for="jenis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meja</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Pesanan" name="id_meja" value={this.state.id_meja} onChange={this.bind}>
                                            <option value="">Pilih Meja</option>
                                            {this.state.meja.map(item => (
                                                <option value={item.id_meja}>{item.nomor_meja}: {item.status_meja}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-text-color dark:hover:bg-primary-600 dark:focus:ring-primary-600 outline outline-2 outline-primary-600 dark:text-primary-600 dark:hover:text-white">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
    )
  }
}
