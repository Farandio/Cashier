import React from "react";
import $ from "jquery";
import axios from "axios";
import NavbarAdmin from "../../Navbar/NavbarAdmin";

export default class Meja extends React.Component {
    constructor() {
        super()
        this.state = {
            meja: [],
            token: "",
            action: "",
            id_meja: 0,
            nomor_meja: "",
            status_meja: "",
            judul: "",
            fillpassword: true
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem("token") && user.role == "admin") {
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
        $("#dropdown").hide()
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

    getMejaStatus = (status) => {
        $("#dropdownAction").hide()
        let url = "http://localhost:4000/cashier/api/meja/status/" + status
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
        $("#modal_meja").show()
        this.setState({
            judul: "Tambah Meja",
            id_meja: 0,
            nomor_meja: "",
            status_meja: "tersedia",
            // fillpassword: true,
            action: "insert"
        })
    }
    Edit = selectedItem => {
        $("#modal_meja").show()
        this.setState({
          judul: "Edit Meja",
          id_meja: selectedItem.id_meja,
          nomor_meja: selectedItem.nomor_meja,
          status_meja: selectedItem.status_meja,
          action: "update"
        })
    }
    saveMeja = (event) => {
        event.preventDefault()
        $("#modal_meja").show()
        let form = {
            id_meja: this.state.id_meja,
            nomor_meja: this.state.nomor_meja,
            status_meja: this.state.status_meja,
        }
        let url = "http://localhost:4000/cashier/api/meja"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMeja()
                })
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMeja()
                })
                .catch(error => console.log(error))
        }
        $("#modal_meja").hide()
    }
    dropMeja = selectedItem => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let url = "http://localhost:4000/cashier/api/meja/" + selectedItem.id_meja
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMeja()
                })
                .catch(error => console.log(error))
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        this.getMeja()
    }
    status = () => {
        var x = document.getElementById("dropdown");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    }
    close = () => {
        $("#modal_meja").hide()
    }
    sortToggle = () => {
      $("#dropdownAction").show()
    }
    hideToggle = () => {
      $("#dropdownAction").hide()
    }
    render() {
        return (
            <div className='h-screen w-full dark:bg-secondary-bg bg-cover object-cover'>
                {/* <div class="w-full h-screen">
                    <NavbarAdmin />
                    <div class="relative mt-20 overflow-x-auto shadow-md sm:rounded-lg m-2">
                        <h2 className="dark:text-white text-lg font-sans mb-2">Daftar Petugas
                            <button className="hover:bg-green-500 float-right bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 mb-2 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Add()}>
                                Tambah Petugas
                            </button>
                        </h2>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" class="px-6 py-3 flex items-center">
                                        Jabatan
                                        <a href="#" onClick={() => this.status()} id="ikon1"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg></a>
                                        <a href="#" onClick={() => this.statusTutup()} id="ikon2" className="hidden"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg></a>
                                    </th>
                                    <div id="dropdown" class="z-10 hidden fixed bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li>
                                                <a href="#" onClick={() => this.getMeja()} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tampilkan Semua</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => this.getUserStatus("manajer")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Manajer</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => this.getUserStatus("admin")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Admin</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => this.getUserStatus("kasir")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kasir</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.user.map((item) => (
                                    <tr class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id_meja}>
                                        <td class="px-6 py-4">
                                            {item.nomor_meja}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.username}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.status}
                                        </td>
                                        <td class="px-6 py-4 text-center flex justify-evenly">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => this.Edit(item)}>Edit</a>
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => this.dropMeja(item)}>Hapus</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> */}
                {/* Modal */}
                {/* <div id="modal_meja" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
                    <div class="flex md:h-auto w-auto justify-center ">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Petugas</h3>
                                <form class="space-y-6" onSubmit={(event) => this.saveUser(event)}>
                                    <div>
                                        <label for="nomor_meja" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                        <input type="text" name="nomor_meja" id="nomor_meja" value={this.state.nomor_meja} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama anda" required />
                                    </div>
                                    <div>
                                        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jabatan</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Role" name="status" value={this.state.status} onChange={this.bind} required>
                                            <option value="">Pilih Jabatan</option>
                                            <option value="manajer">Manajer</option>
                                            <option value="admin">Admin</option>
                                            <option value="kasir">Kasir</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input type="text" name="username" id="username" value={this.state.username} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan username anda" required />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" value={this.state.password} placeholder="Masukkan Password" onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
                
                
                
                */}
                <NavbarAdmin />
                <div className="relative overflow-x-auto sm:rounded-lg pt-28 pl-14 pr-14">
    <div className="flex items-center justify-between pb-4 pt-4">
      <select className="outline outline-1 dark:outline-white inline-flex items-center border hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-primary-600 dark:text-white dark:border-white dark:hover:bg-primary-700 dark:hover:border-white">
        <option onClick={() => this.getMeja()}>Show All</option>
        <option onClick={() => this.getUserStatus("tersedia")}>Tersedia</option>
        <option onClick={() => this.getUserStatus("tidak_tersedia")}>Terpakai</option>
      </select>
      <div className="relative">
        <button onClick={() => this.Add()} className="outline outline-1 dark:outline-white inline-flex items-center border hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-primary-600 dark:text-white dark:border-white dark:hover:bg-primary-700 dark:hover:border-white">Tambah Meja</button>
      </div>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 outline outline-2 dark:outline-white">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-primary-600 dark:text-white">
        <tr>
          <th scope="col" className="px-6 py-3">
            Id Meja
          </th>
          <th scope="col" className="px-6 py-3">
            Nomor Meja
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-center flex justify-evenly">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {this.state.meja.map((item) => (
        <tr className="bg-white dark:bg-text-color hover:bg-gray-50 dark:hover:bg-gray-600">
          
          <td className="px-6 py-4">{item.id_meja}</td>
          <td className="px-6 py-4">{item.nomor_meja}</td>
          <td className="px-6 py-4">{item.status_meja}</td>
          <td className="px-6 py-4 text-center flex justify-evenly">
            <a
              onClick={() => this.Edit(item)}
              className="font-medium dark:text-primary-600"
            >
              Edit
            </a>
            <a
              onClick={() => this.dropMeja(item)}
              className="font-medium dark:text-red"
            >
              Hapus
            </a>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div id="modal_meja" tabindex="-1" aria-hidden="true" className="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-white bg-opacity-50">
                    <div className="flex lg:h-auto w-auto justify-center ">
                        <div className="relative bg-white rounded-lg shadow dark:bg-text-color w-1/3 outline outline-offset-2 outline-4 outline-text-color">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Tutup modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{this.state.judul}</h3>
                                <form className="space-y-6" onSubmit={(event) => this.saveMeja(event)}>
                                    <div>
                                        <label for="nomor_meja" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Meja</label>
                                        <input type="text" name="nomor_meja" id="nomor_meja" value={this.state.nomor_meja} onChange={this.bind} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nomor meja" required />
                                    </div>
                                    <div>
                                        <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                        <input type="text" name="nomor_meja" id="nomor_meja" value={this.state.status_meja} onChange={this.bind} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama menu" required readOnly />
                                        
                                    </div>
                                    <button type="submit" className="w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-text-color dark:hover:bg-primary-600 dark:focus:ring-primary-600 outline outline-2 outline-primary-600 dark:text-primary-600 dark:hover:text-white">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}