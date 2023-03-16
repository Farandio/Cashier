import React, { useRef } from "react";
import axios from "axios";
import NavbarKasir from "../../Navbar/NavbarKasir";
import $ from "jquery";
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'



export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            detail_transaksi: [],
            transaksiBelumBayar: [],
            transaksiLunas: [],
            makanan: [],
            minuman: [],
            menu: [],
            meja: [],
            menus: [],
            cart: [],
            nomor_meja: "",
            token: '',
            id_transaksi: 0,
            status: '',
            total: 0,
            // detail: [],
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem("token") && user.role === 'kasir') {
            this.state.token = localStorage.getItem("token")
        } else {
            window.alert("Maaf, anda bukan kasir")
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
    AddDetail = (value) => {
        axios
            .get("http://localhost:4000/cashier/api/menu/" + value.id_menu, this.headerConfig())
            .then((res) => {
                if (this.state.cart.length === 0) {
                    const keranjang = {
                        id_transaksi: this.state.id_transaksi,
                        id_menu: value.id_menu,
                        qty: 1
                    }
                    this.state.cart.push(keranjang)
                    this.state.menus.push(res.data.data)
                    let harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                    this.setState({ totalBayar: harga })
                } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
                    this.state.cart.find(item => item.id_menu === value.id_menu).qty++
                    let harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                    this.setState({ totalBayar: this.state.totalBayar + harga })
                } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
                    const keranjang = {
                        id_transaksi: this.state.id_transaksi,
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
                        var harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
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

    getQty(itemId) {
        const item = this.state.cart.find((item) => item.id_menu === itemId);
        return item ? item.qty : 0;
    }
    getHarga(itemId) {
        const item = this.state.cart.find((item) => item.id_menu === itemId);
        const menu = this.state.menus.find((item) => item.id_menu === itemId);
        return item ? menu.harga * item.qty : 0;
    }

    getMeja = () => {
        let url = "http://localhost:4000/cashier/api/meja/"
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

    getMenu = () => {
        let url = "http://localhost:4000/cashier/api/menu/"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ menu: response.data.data })
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

    getTransaksiBelumBayar = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        let url = "http://localhost:4000/cashier/api/transaksi/riwayat/belum_bayar/" + user.id_user
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ transaksiBelumBayar: response.data.data })
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

    // getNama = () => {
    //     let user = JSON.parse(localStorage.getItem('user'))
    //     if(user.nama_user !== null){ 
    //         return user.nama_user
    //     }else{
    //         return "tidak ada"
    //     }
    // }

    getTransaksiLunas = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        let url = "http://localhost:4000/cashier/api/transaksi/riwayat/lunas/" + user.id_user
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ transaksiLunas: response.data.data })
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

    getNomorMeja = (value) => {
        if (value.id_meja !== null) {
            return value.meja.nomor_meja
        } else {
            return "tidak ada"
        }

    }

    getDetail = (selectedItem) => {
        $("#modal_detail").show()
        let url = "http://localhost:4000/cashier/api/transaksi/detail/" + selectedItem.id_transaksi
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ detail_transaksi: response.data.data })
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
        if (selectedItem.status === "belum_bayar") {
            $("#submit").show()
        } else {
            $("#submit").hide()
        }
    }

    getQtyModal(itemId) {
        const item = this.state.detail_transaksi.find((item) => item.id_menu === itemId);
        return item ? item.qty : 0;
    }

    getHargaModal(itemId) {
        const item = this.state.detail_transaksi.find((item) => item.id_menu === itemId);
        const menu = this.state.detail_transaksi.find((item) => item.id_menu === itemId).menu;
        return item ? menu.harga * item.qty : 0;
    }

    totalBayar = () => {
        for (let i = 0; i < this.state.detail_transaksi.length; i++) {
            var harga = this.state.detail_transaksi[i].menu.harga
            var qty = this.state.detail_transaksi[i].qty
            var subTotal = harga * qty
            this.state.total = this.state.total + subTotal
        }
        let totalBayar = this.state.total
        return totalBayar
    }

    Edit = selectedItem => {
        const printContents = document.getElementById("nota").innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        let sendData = {
            id_transaksi: selectedItem.id_transaksi,
            status: 'lunas'
        }
        let data = {
            id_meja: selectedItem.id_meja,
            status_meja: 'tersedia'
        }
        axios.put('http://localhost:4000/cashier/api/transaksi/', sendData, this.headerConfig())
        axios.put('http://localhost:4000/cashier/api/meja/', data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                window.location.reload()
            })
            .catch(error => console.log(error))
    }
    pesanLagi = (value) => {
        // let url = "http://localhost:4000/cashier/api/transaksi/detail/" + value.id_transaksi
        // axios.get(url, this.headerConfig())
        //     .then(response => {
        //         this.setState({ detail: response.data.data })
        //     })
        //     .catch(error => {
        //         if (error.response) {
        //             if (error.response.status) {
        //                 window.alert(error.response.data.message)
        //                 window.location = '/'
        //             }
        //         } else {
        //             console.log(error);
        //         }
        //     })
        $('#tambah').show()
        $("#history").hide()
        this.setState({
            id_transaksi: value.id_transaksi,
        })

    }
    batalPesan = () => {
        window.location.reload()
    }

    componentDidMount() {
        this.getMeja()
        this.getMenu()
        this.getTransaksiBelumBayar()
        this.getTransaksiLunas()
        this.getMakanan()
        this.getMinuman()
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    close = () => {
        $("#modal_detail").hide()
        this.state.total = 0
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
    closeTransaksi = () => {
        $("#modal_transaksi").hide()
    }

    pesananBaru = () => {
        $("#modal_transaksi").show()
    }
    simpan = () => {
        let sendData = {
            detail_transaksi: this.state.cart
        }
        let url = "http://localhost:4000/cashier/api/transaksi/detail/add"
        axios.post(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                window.location = '/kasir/riwayatKasir'

            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:bg-secondary-bg bg-fixed">
                <div class="w-full h-screen">
                    <NavbarKasir />

                    {/* MODAL TAMBAH TRANSAKSI */}
                    <div id="tambah" class="hidden relative overflow-x-auto shadow-md sm:rounded-lg m-2 mt-36">
                        <h2 className="dark:text-white text-lg font-serif ml-3 py-3 rounded-full dark:bg-text-color mb-5 font-bold text-center">MENU</h2>
                        <div className="flex justify-between items-center mb-1">
                            <div>
                                <button className="dark:hover:bg-white dark:hover:text-primary-600 mr-3 dark:bg-primary-600 dark:text-white font-bold uppercase text-xs py-3 px-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 border dark:border-white" type="button" onClick={() => this.pesananBaru()}>
                                    Pesan
                                </button>
                                <button className="dark:bg-red dark:hover:text-red mr-3 bg-red-600 dark:text-white font-bold uppercase text-xs py-3 px-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 border dark:border-white dark:hover:bg-white" type="button" onClick={() => this.batalPesan()}>
                                    Batal
                                </button>
                            </div>
                        </div>
                    
                        <hr className="mt-5"></hr>
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
            <tr className="bg-tranparent bg-text-color bg-opacity-50 border-b dark:border-white dark:hover:bg-gray-900">
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
                      value={this.getQty(item.id_menu)}
                      placeholder=""
                      required=""
                      readOnly
                    />
                  </div>
                    
                  <button
                    onClick={() => this.AddDetail(item)}
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
            <tr className="bg-tranparent bg-text-color bg-opacity-50 border-b dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900">
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
                      value={this.getQty(item.id_menu)}
                      placeholder=""
                      required=""
                      readOnly
                    />
                  </div>
                    
                  <button
                    onClick={() => this.AddDetail(item)}
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
                    </div>

                    {/* DETAIL TRANSAKSI */}
                    <div id="history" class="relative mt-20 overflow-x-auto shadow-md sm:rounded-lg m-2">
                        <div className="flex justify-between items-center">
                            <h2 className="dark:text-white text-xl font-sans ml-3">Riwayat Pemesanan</h2>
                        </div>
                        <hr></hr>
                        <h2 className="dark:text-white text-lg font-serif mt-6 ml-3 dark:bg-text-color rounded-full py-3 text-center mb-5 font-bold">Belum Bayar</h2>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:bg-primary-600 dark:text-white">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Pelanggan
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Nomor Meja
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Tanggal Pemesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Jenis Pesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transaksiBelumBayar.map(item => (
                                    <tr class="dark:bg-text-color border-b font-sans dark:text-white dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900" key={item.id_transaksi}>
                                        <td class="px-6 py-4">
                                            {item.nama_pelanggan}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.getNomorMeja(item)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.convertTime(item.tgl_transaksi)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.jenis_pesanan}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.status}
                                        </td>
                                        <td class="px-2 py-4 text-center flex justify-evenly">
                                            <button className="hover:bg-green-500 flex justify-center bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.getDetail(item)}>
                                                <AiOutlineCheck />
                                            </button>
                                            <button className="hover:bg-green-500 flex justify-center bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.pesanLagi(item)}>
                                                <AiOutlinePlus />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* TRANSAKSI LUNAS */}
                        <h2 className="dark:text-white text-lg font-serif mt-28 ml-3 py-3 rounded-full dark:bg-text-color mb-5 font-bold text-center">Lunas</h2>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs dark:text-white uppercase dark:bg-primary-600">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Pelanggan
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Nomor Meja
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Tanggal Pemesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Jenis Pesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transaksiLunas.map(item => (
                                    <tr class="dark:bg-text-color border dark:border-b-white font-sans dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 dark:text-white" onClick={() => this.getDetail(item)} key={item.id_transaksi}>
                                        <td class="px-6 py-4">
                                            {item.nama_pelanggan}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.getNomorMeja(item)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.convertTime(item.tgl_transaksi)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.jenis_pesanan}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.status}
                                        </td>
                                        <td class="px-6 py-4"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Modal */}
                <div id="modal_detail" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent dark:bg-white dark:bg-opacity-50">
            <div class="flex md:h-auto w-auto justify-center ">
                <div class="relative rounded-lg shadow dark:bg-text-color w-1/3">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Tutup modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Detail Pemesanan</h3>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs uppercase dark:bg-primary-600 dark:text-white">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Menu
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Jumlah
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.detail_transaksi.map(item => (
                                    <tr class="bg-white border-b font-sans dark:border-white dark:bg-text-color hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-white" key={item.id_detail_transaksi}>
                                        <td class="px-6 py-4">
                                            {item.menu.nama_menu}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.qty}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="dark:bg-text-color rounded-lg p-2 my-4">
                                    <p className="font-medium dark:text-white">Total : {this.convertToRupiah(this.totalBayar())}</p>
                        </div>
                        {this.state.transaksiBelumBayar.map(item => (
                                    <div className="hidden" id="submit">
                                        <button className="w-full dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-text-color dark:hover:bg-primary-600 border-2 border-white" type="button" onClick={() => this.Edit(item)}>Sudah Bayar</button>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
        </div>
                <div id="modal_transaksi" tabindex="-1" aria-hidden="true" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent dark:bg-white dark:bg-opacity-50">
                    <div class="flex lg:h-auto w-auto justify-center ">
                        <div class="relative bg-white rounded-lg shadow dark:bg-text-color w-auto">
                            <button type="button" class="absolute top-3 right-2.5 dark:text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.closeTransaksi()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="text-xl font-medium dark:text-white">Pemesanan</h3>
                                <div class="space-y-6">
                                    <table class="w-full text-sm text-left dark:text-white">
                                        <thead class="text-xs uppercase dark:bg-primary-600 dark:text-white">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Nama Menu
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Harga
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Jumlah
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Total Harga
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.menus.map((item) => (
                                                <tr class="border-b font-sans dark:text-white dark:bg-text-color dark:border-white hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id_menu}>
                                                    <td class="px-6 py-4">
                                                        {item.nama_menu}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {this.convertToRupiah(item.harga)}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {this.getQty(item.id_menu)}
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
                                <button onClick={() => this.simpan()} type="submit" class="mt-4 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-text-color dark:hover:bg-primary-600 dark:text-white border-2 dark:border-white">Simpan</button>
                                {/* <form class="space-y-6 mt-6" onSubmit={(event) => this.saveTransaksi(event)}>
                                    <div>
                                        <label for="nama_pelanggan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pelanggan</label>
                                        <input type="text" name="nama_pelanggan" id="nama_pelanggan" value={this.state.nama_pelanggan} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama pelanggan" required />
                                    </div>
                                    <div>
                                        <label for="jenis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Pesanan</label>
                                        <select onClick={() => this.nomorMejaShow()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Pesanan" name="jenis_pesanan" value={this.state.jenis_pesanan} onChange={this.bind} required>
                                            <option value=''>Pilih Jenis Pesanan</option>
                                            <option value="ditempat">Makan Ditempat</option>
                                            <option value="bungkus">Dibungkus</option>
                                        </select>
                                    </div>
                                    <div className="hidden modal" aria-hidden="true" id="meja">
                                        <label for="jenis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meja</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Pesanan" name="id_meja" value={this.state.id_meja} onChange={this.bind}>
                                            <option value="">Pilih Meja</option>
                                            {this.state.meja.map(item => (
                                                <option value={item.id_meja}>{item.nomor_meja}: {item.status_meja}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
                                </form> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* NOTA */}
                <div class="relative h-auto bg-white rounded-lg shadow dark:bg-gray-700 w-auto hidden" id="nota" >
                    <h3 class="flex items-center justify-center m-6 text-2xl font-semibold text-gray-600">
                        AHEAD FOOD AND BEVERAGES
                    </h3>
                    <hr></hr>
                    <div class="px-6 py-3">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Menu
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Harga
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Jumlah
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Harga
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.detail_transaksi.map((item) => (
                                    <tr class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id_detail_transaksi}>
                                        <td class="px-6 py-4">
                                            {item.menu.nama_menu}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.convertToRupiah(item.menu.harga)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.getQtyModal(item.id_menu)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.convertToRupiah(this.getHargaModal(item.id_menu))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-gray-100 p-2 mb-2 hover:bg-gray-200">
                            <p className="font-sans text-gray-700">Total: {this.convertToRupiah(this.state.total)}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="px-6 py-3">
                        <h3 class="text-xl font-medium mb-4 text-gray-900 dark:text-white">Informasi Kontak</h3>
                        <label class="block font-bold">Alamat:
                            <p className="font-sans text-sm text-gray-700">Jl.Jati No.06 Karang Dinoyo, Kepung, Kediri</p>
                        </label>

                        <label class="block font-bold">Email:
                            <p className="font-sans text-sm text-gray-700">aheadfnb@gmail.com</p>
                        </label>

                        <label class="block font-bold">Telepon:
                            <p className="font-sans text-sm text-gray-700">082245586754</p>
                        </label>
                    </div>
                    <hr></hr>
                    <div class="px-6 py-3 text-center">
                        <h3 class="text-xl font-medium mb-4 text-gray-900 dark:text-white">Terima Kasih</h3>
                        <p className="font-sans text-gray-700">"tuangkan masalahmu dalam secangkir kopi"</p>
                        <label class="block font-bold mt-4">
                            <p className="font-sans text-gray-700">Selamat Menikmati</p>
                        </label>
                    </div>
                </div>

            </div >
        )
    }
}