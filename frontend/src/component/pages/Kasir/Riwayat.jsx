import React, { Component } from 'react'
import axios from "axios";
import NavbarKasir from "../../Navbar/NavbarKasir";
import $ from "jquery";
import {RiCheckLine, RiBillFill} from 'react-icons/ri'

export default class Riwayat extends Component {
    constructor() {
        super()
        this.state = {
            detail_transaksi: [],
            transaksiBelumBayar: [],
            transaksiLunas: [],
            menu: [],
            meja: [],
            token: '',
            id_transaksi: 0,
            status: '',
            total: 0
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

    Edit = selectedItem => {
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

    totalBayar = () => {
        for (let i = 0; i < this.state.detail_transaksi.length; i++) {
            let harga = this.state.detail_transaksi[i].menu.harga
            let qty = this.state.detail_transaksi[i].qty
            let subTotal = harga * qty
            this.state.total = this.state.total + subTotal
        }
        let totalBayar = this.state.total
        return totalBayar
    }

    componentDidMount() {
        this.getMeja()
        this.getMenu()
        this.getTransaksiBelumBayar()
        this.getTransaksiLunas()
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    close = () => {
        $("#modal_detail").hide()
        this.state.total = 0
    }
  render() {
    return (
        <div className='flex h-screen w-full dark:bg-secondary-bg'>
        <div class="w-full h-screen">
            <NavbarKasir />
            <div class="relative mt-20 overflow-x-auto shadow-md sm:rounded-lg m-2">
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
                                    {this.convertTime(item.tgl_transaksi)}
                                </td>
                                <td class="px-6 py-4">
                                    {item.jenis_pesanan}
                                </td>
                                <td class="px-6 py-4">
                                    {item.status}
                                </td>
                                <td class="px-6 py-4 text-center flex justify-evenly">
                                    <button onClick={() => this.getDetail(item)} className="hover:bg-primary-700 float-right mr-3 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 dark:bg-primary-600" type="button">
                                    <RiCheckLine className='text-2xl'/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className="dark:text-white text-lg font-serif mt-28 ml-3 py-3 rounded-full dark:bg-text-color mb-5 font-bold text-center">Lunas</h2>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs dark:text-white uppercase dark:bg-primary-600">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Pelanggan
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
                                        {/* <td class="px-6 py-4">
                                            {item.meja.nomor_meja}
                                        </td> */}
                                        <td class="px-6 py-4">
                                            {this.convertTime(item.tgl_transaksi)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.jenis_pesanan}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.status}
                                        </td>
                                        <td class="px-6 py-4">
                                            
                                        </td>
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
                                    <p className="font-medium dark:text-white">Total : {this.totalBayar()}</p>
                        </div>
                        {this.state.transaksiBelumBayar.map(item => (
                                    <div className="hidden" id="submit">
                                        <button className="w-full dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-text-color dark:hover:bg-primary-600 border-2 border-white" type="button" onClick={() => this.Edit(item)}>Sudah Bayar</button>
                                        <button className="w-full mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => this.Edit(item)}>Cetak Nota</button>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}
