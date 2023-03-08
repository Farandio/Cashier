import React from "react";
import axios from "axios";
import NavbarManajer from "../../Navbar/NavbarManajer";
import $ from "jquery";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      detail_transaksi: [],
      //   transaksiBelumBayar: [],
      //   transaksiLunas: [],
      transaksi: [],
      menu: [],
      meja: [],
      token: "",
      id_transaksi: 0,
      status: "",
    };
    let user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("token") && user.role == "manajer") {
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/";
    }
  }
  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getTransaksiUser = (event) => {
    event.preventDefault();
    let url =
      "http://localhost:4000/cashier/api/transaksi/user/" + this.state.nama_user;
      axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ transaksi: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  getTransaksi = () => {
    let url = "http://localhost:4000/cashier/api/transaksi/";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ transaksi: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  getDetail = (selectedItem) => {
    $("#modal_detail").show();
    let url =
      "http://localhost:4000/cashier/api/transaksi/detail/" +
      selectedItem.id_transaksi;
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ detail_transaksi: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  componentDidMount() {
    this.getTransaksi();
  }
  
  handleRefresh = () => {
    this.getTransaksi();
  }

  convertTime = (time) => {
    let date = new Date(time);
    return `${date.getDate()}/${
      Number(date.getMonth()) + 1
    }/${date.getFullYear()}`;
  };

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  close = () => {
    $("#modal_detail").hide();
  };

  render() {
    return (
      <div className='h-screen w-full dark:bg-secondary-bg'>
        <NavbarManajer />
      <div>
      <div class="relative shadow-md sm:rounded-lg m-2 pt-32">
              <h2 className="dark:bg-text-color dark:text-white text-3xl font-bold font-sans text-center py-6 shadow-xl rounded-full">RIWAYAT TRANSAKSI</h2>
            <div className="flex justify-end items-center m-4 pt-6">
            
              
              <form className="flex items-center" onSubmit={(event) => this.getTransaksiUser(event)}>
  <label htmlFor="search" className="sr-only">
    Search
  </label>
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-500 dark:text-text-color"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <input
      type="search"
      id="search"
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white dark:border-text-color dark:placeholder-text-color dark:text-text-color dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search"
      name="nama_user"
      onChange={this.bind}
    />
  </div>
  <button
            type="button"
    onClick={() => this.handleRefresh()}
    className="p-2 ml-2 text-xs font-medium dark:text-white rounded-lg border border-text-color dark:bg-white dark:hover:bg-primary-100"
  >
    <svg 
      className="icon" 
      height="24" 
      viewBox="0 0 24 24" 
      width="24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="m23.8995816 10.3992354c0 .1000066-.1004184.1000066-.1004184.2000132 0 0 0 .1000066-.1004184.1000066-.1004184.1000066-.2008369.2000132-.3012553.2000132-.1004184.1000066-.3012552.1000066-.4016736.1000066h-6.0251046c-.6025105 0-1.0041841-.4000264-1.0041841-1.00006592 0-.60003954.4016736-1.00006591 1.0041841-1.00006591h3.5146443l-2.8117154-2.60017136c-.9037657-.90005932-1.9079498-1.50009886-3.0125523-1.90012523-2.0083682-.70004614-4.2175733-.60003954-6.12552305.30001977-2.0083682.90005932-3.41422594 2.50016478-4.11715481 4.5002966-.20083682.50003295-.80334728.80005275-1.30543933.60003954-.50209205-.10000659-.80334728-.70004613-.60251046-1.20007909.90376569-2.60017136 2.71129707-4.60030318 5.12133891-5.70037568 2.41004184-1.20007909 5.12133894-1.30008569 7.63179914-.40002637 1.4058578.50003296 2.7112971 1.30008569 3.7154812 2.40015819l3.0125523 2.70017795v-3.70024386c0-.60003955.4016736-1.00006591 1.0041841-1.00006591s1.0041841.40002636 1.0041841 1.00006591v6.00039545.10000662c0 .1000066 0 .2000132-.1004184.3000197zm-3.1129707 3.7002439c-.5020921-.2000132-1.1046025.1000066-1.3054394.6000396-.4016736 1.1000725-1.0041841 2.200145-1.9079497 3.0001977-1.4058578 1.5000989-3.5146444 2.3001516-5.623431 2.3001516-2.10878662 0-4.11715482-.8000527-5.72384938-2.4001582l-2.81171548-2.6001714h3.51464435c.60251046 0 1.0041841-.4000263 1.0041841-1.0000659 0-.6000395-.40167364-1.0000659-1.0041841-1.0000659h-6.0251046c-.10041841 0-.10041841 0-.20083682 0s-.10041841 0-.20083682 0c0 0-.10041841 0-.10041841.1000066-.10041841 0-.20083682.1000066-.20083682.2000132s0 .1000066-.10041841.1000066c0 .1000066-.10041841.1000066-.10041841.2000132v.2000131.1000066 6.0003955c0 .6000395.40167364 1.0000659 1.0041841 1.0000659s1.0041841-.4000264 1.0041841-1.0000659v-3.7002439l2.91213389 2.8001846c1.80753138 2.0001318 4.31799163 3.0001977 7.02928871 3.0001977 2.7112971 0 5.2217573-1.0000659 7.1297071-2.9001911 1.0041841-1.0000659 1.9079498-2.3001516 2.4100418-3.7002439.1004185-.6000395-.2008368-1.2000791-.7029288-1.3000857z" 
        transform=""
      />
    </svg>
    <span className="sr-only">Refresh</span>
  </button>
  <button
    type="submit"
    className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <span className="sr-only">Search</span>
  </button>
  
</form>

            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 outline outline-2 dark:outline-white">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-primary-600 dark:text-white">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Nama Pelanggan
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Nomor Meja
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Petugas
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
                </tr>
              </thead>
              <tbody>
                {this.state.transaksi.map(item => (
                  <tr className="bg-white dark:bg-text-color bg-opacity-70 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 dark:border-b-white" onClick={() => this.getDetail(item)} key={item.id_transaksi}>
                    <td class="px-6 py-4">
                      {item.nama_pelanggan}
                    </td>
                    <td class="px-6 py-4">
                      {item.meja.nomor_meja}
                    </td>
                    <td class="px-6 py-4">
                      {item.user.nama_user}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        <div id="modal_detail" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
          <div class="flex md:h-auto w-auto justify-center ">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
              <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Tutup modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Detail</h3>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Nama Menu
                      </th>
                      <th scope="col" class="px-6 py-3 flex items-center">
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.detail_transaksi.map(item => (
                      <tr class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id_detail_transaksi}>
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
              </div>
            </div>
      </div>
      </div>
      </div>
    );
  }
}