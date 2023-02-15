import React from "react";
import $ from "jquery";
import axios from "axios";
import NavbarAdmin from "../../Navbar/NavbarAdmin";

export default class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: [],
            action: "",
            id_menu: 0,
            nama_menu: '',
            jenis: '',
            deskripsi: '',
            gambar: null,
            harga: ''
        }
    }
    getMenu = () => {
        let url = "http://localhost:4000/cashier/api/menu"
        axios.get(url)
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

    Add = () => {
        $("#modal_menu").show()
        this.setState({
            id_menu: 0,
            nama_menu: '',
            jenis: '',
            deskripsi: '',
            gambar: null,
            harga: '',
            action: "insert"
        })
    }
    Edit = selectedItem => {
        $("#modal_menu").show()
        this.setState({
            id_menu: selectedItem.id_menu,
            nama_menu: selectedItem.nama_menu,
            jenis: selectedItem.jenis,
            deskripsi: selectedItem.deskripsi,
            gambar: null,
            harga: selectedItem.harga,
            action: "update"
        })
    }
    saveMenu = (event) => {
        event.preventDefault()
        $("#modal_menu").show()
        let form = new FormData()
        form.append("id_menu", this.state.id_menu)
        form.append("nama_menu", this.state.nama_menu)
        form.append("jenis", this.state.jenis)
        form.append("deskripsi", this.state.deskripsi)
        form.append("gambar", this.state.gambar)
        form.append("harga", this.state.harga)
        let url = "http://localhost:4000/cashier/api/menu"
        if (this.state.action === "insert") {
            axios.post(url, form)
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
        } else if (this.state.action === "update") {
            axios.put(url, form)
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
                .catch(error => console.log(error))
        }
        $("#modal_menu").hide()
    }
    dropMenu = selectedItem => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let url = "http://localhost:4040/kasir/menu/" + selectedItem.id_menu
            axios.delete(url)
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
                .catch(error => console.log(error))
        }
    }

    handleFile = (event) => {
        this.setState({
            gambar: event.target.files[0]
        })
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        this.getMenu()
    }
    close = () => {
        $("#modal_menu").hide()
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
            <div className='min-h-full min-w-full bg-secondary-bg object-cover bg-fixed bg-no-repeat bg-auto'>
                <div className="w-full h-full ">
                <div>
                    <NavbarAdmin />
                    <div className=" relative mt-28 overflow-x-auto shadow-md sm:rounded-lg m-2"><br />
                        <h2 className="dark:text-text-color mb-6 font-sans text-4xl font-extrabold tracking-tight ml-6 max-w-sm">DAFTAR MENU
                            <br />
                            <button className="hover:text-primary-300 mr-3 bg-text-color text-white font-bold uppercase text-sm px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Add()}>
                                Tambah Menu
                            </button>
                        </h2>
                        <div className="grid grid-cols-6">
                            {this.state.menu.map(item => (
                                <div className="max-w-sm outline outline-4 m-6  rounded-lg shadow dark:bg-text-color dark:outline-white" key={item.id_menu}>

                                    <img className="rounded-t-lg" src={`http://localhost:4000/img/${item.gambar}`} alt="gambar" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.nama_menu}</h5>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Jenis: {item.jenis}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Deskripsi: {item.deskripsi}</p>
                                        <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">Harga: {this.convertToRupiah(item.harga)}</p>
                                        <br />
                                        <div className="text-start flex">
                                            <button className="block px-5 py-1 font-medium dark:bg-text-color dark:hover:bg-primary-600 dark:hover:text-white dark:text-primary-600 outline outline-2 outline-primary-600 mr-4 rounded-md" onClick={() => this.Edit(item)}>Edit</button>
                                            <button className="block px-5 py-1 font-medium dark:bg-text-color dark:hover:bg-red dark:text-red dark:hover:text-white outline outline-2 outline-red mr-4 rounded-md" onClick={() => this.dropMenu(item)}>Delete</button>
                                            {/* <a href="#" className="font-medium dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white mr-4 rounded-md" onClick={() => this.Edit(item)}>Edit</a> */}
                                            {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => this.dropMenu(item)}>Hapus</a> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <div id="modal_menu" tabindex="-1" aria-hidden="true" className="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-white bg-opacity-50">
                    <div className="flex lg:h-auto w-auto justify-center ">
                        <div className="relative bg-white rounded-lg shadow dark:bg-text-color w-1/3 outline outline-offset-2 outline-4 outline-text-color">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Tutup modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Menu</h3>
                                <form className="space-y-6" onSubmit={(event) => this.saveMenu(event)}>
                                    <div>
                                        <label for="nama_menu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Menu</label>
                                        <input type="text" name="nama_menu" id="nama_menu" value={this.state.nama_menu} onChange={this.bind} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama menu" required />
                                    </div>
                                    <div>
                                        <label for="jenis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Menu</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Menu" name="jenis" value={this.state.jenis} onChange={this.bind} required>
                                            <option value="">Pilih Jenis Menu</option>
                                            <option value="makanan">Makanan</option>
                                            <option value="minuman">Minuman</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="deskripsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                                        <input type="text" name="deskripsi" id="deskripsi" value={this.state.deskripsi} onChange={this.bind} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan deskripsi menu" required />
                                    </div>
                                    <div>
                                        <label for="gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                                        <input type="file" name="gambar" id="gambar" placeholder="Pilih gambar menu" onChange={this.handleFile} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label for="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                                        <input type="text" name="harga" id="harga" value={this.state.harga} onChange={this.bind} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan harga menu" required />
                                    </div>
                                    <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-text-color dark:hover:bg-primary-600 dark:focus:ring-primary-600 outline outline-2 outline-primary-600 dark:text-primary-600 dark:hover:text-white">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
