import React, { Component, useState } from 'react'
import $ from "jquery";
import axios from "axios";
import NavbarKasir from "../../Navbar/NavbarKasir";
// import { response } from '../../../../../backend/router/menu';

export default class ListMenu extends Component {
  constructor() {
    super()
    this.state = {
        menu: [],
        meja: [],
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
        id_menu: [],
        qty: 0
    }
    if (localStorage.getItem("token")) {
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

getTransaksi = () => {
    let url = "http://localhost:4000/cashier/api/pemesanan"
    axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({ transaksi: response.data.data })
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

getUser = () => {
    let url = "http://localhost:4000/cashier/api/user"
    axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({ user: response.data.data })
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
    let url = "http://localhost:4000/cashier/api/meja"
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
        action: "insert",
    })
}
AddDetail = (value, index) => {
    axios
        .get("http://localhost:4000/cashier/api/menu/" + value.id_menu, this.headerConfig())
        .then((res) => {
            console.log(res.data.data)
            console.log("id menu: " + this.state.menu[index].id_menu)
            console.log("index: " + index)
            console.log("panjang cart: " + this.state.cart.length)
            console.log("qty index " + this.state.cart[index])
            let i = this.state.cart.indexOf()
            console.log(i)
            if (this.state.cart.length === 0) {
                const keranjang = {
                    id_menu: value.id_menu,
                    qty: 1
                }
                this.state.cart.push(keranjang)
            } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
              this.state.cart.find(item => item.id_menu===value.id_menu).qty++
            } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
                const keranjang = {
                    id_menu: value.id_menu,
                    qty: 1
                }
                this.state.cart.push(keranjang)
            }
            this.qtyShow(value, index);
            console.log(this.state.cart)
            this.setState({
              cart: this.state.cart
            })
        })
        .catch(error => console.log(error))

};

  qtyShow = (value) => {
    return this.state.cart.find(item => item.id_menu === value.id_menu ? item.qty : 0 ); 
  };

handleMinus = (value, index) => {
  axios.get("http://localhost:4000/cashier/api/menu/" + value.id_menu, this.headerConfig())
.then((res) => {
  console.log(res.data.data)
  console.log("id menu: " + this.state.menu[index].id_menu)
  console.log("index: " + index)
  console.log("panjang cart: " + this.state.cart.length)
  console.log("qty index " + this.state.cart[index])
  let i = this.state.cart.indexOf()
  console.log(i)
    if (this.state.cart.length === 0) {
      // $("#modal_alert").show();
      console.log("we rong nambah transaksi")
    } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
      if (this.state.cart.find(item => item.qty > 0)) {
        this.state.cart.find(item => item.id_menu===value.id_menu).qty--
      }else{
        // $("#modal_alert").show();
        console.log("we rong nambah transaksi")
      }
    } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
      // $("#modal_alert").show();
      console.log("we rong nambah transaksi")
    }
    this.state.cart.find(item => item.qty == 0) ? this.state.cart.splice(i):console.log("lanjut")
    this.qtyShow(value, index);
    console.log(this.state.cart)
    this.setState({
      cart: this.state.cart
    })
})
.catch(error => console.log(error))

};

getItemQuantity(itemId) {
  const item = this.state.cart.find((item) => item.id_menu === itemId);
  return item ? item.qty : 0;
}

Edit = selectedItem => {
    $("#modal_transaksi").show()
    this.setState({
        action: "update",
        id_transaksi: selectedItem.id_transaksi,
        status: selectedItem.status,
    })
}
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
    let url = "http://localhost:4000/cashier/api/pemesanan"
    if (this.state.action === "insert") {
        axios.post(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.setState({ transaksi: response.data.data })
            })
    } else if (this.state.action === "update") {
        axios.put(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getTransaksi()
            })
            .catch(error => console.log(error))
    }
    $("#modal_transaksi").hide()
}
dropTransaksi = selectedItem => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        let url = "http://localhost:4000/cashier/api/pemesanan/" + selectedItem.id_transaksi
        axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
    }
}
bind = (event) => {
    this.setState({ [event.target.name]: event.target.value })
}
componentDidMount() {
    this.getMenu()
    this.getMeja()
}
close = () => {
    $("#modal_transaksi").hide()
}

handleQuantityChange(id, newQty) {
  const cart = this.state.cart.map((item) =>
    item.id_menu === id ? { ...item, qty: newQty } : item
  );
  this.setState({ cart });
}

getItemQuantity(id) {
  const item = this.state.cart.find((item) => item.id_menu === id);
  return item ? item.qty : 0;
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
            <br /><br /><br /><br /><br /><br /><br /><br />
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
          
            {this.state.menu.map((item, index) => (
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
                    onClick={() => this.handleMinus(item, index)}
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
                    />
                  </div>
                    
                  <button
                    onClick={() => this.AddDetail(item, index)}
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
                onClick={() => this.handleTesting()}
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
    )
  }
}
