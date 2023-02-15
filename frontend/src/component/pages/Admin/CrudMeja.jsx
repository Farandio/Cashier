import React, { Component } from 'react';
import axios from "axios";
import NavbarUs from '../../Navbar/NavbarAdmin';
import $ from "jquery";

export default class Meja extends React.Component {
    constructor(){
        super()
        this.state = {
            id_meja: "",
            nomor_meja: "",
            status_meja: "",
            meja: [],
            action: "",
            judul: "",
            isModalOpen: false
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

    getMeja = () => {
        $("#dropdown").hide()
        let url = "http://localhost:4000/cashier/api/meja"
        axios.get(url)
        .then(response => {
            this.setState({meja: response.data.data })
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        console.log(this.state.meja)
    }

    getStatus = (status) => {
        $("#dropdown").hide()
        let url = "http://localhost:4000/cashier/meja/status/" + status
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

    componentDidMount = () =>{
        this.getMeja()
    }

    handleAdd = () =>{
        $("#modal_form").show()
        this.setState({
            id_meja: 0,
            nomor_meja : "",
            action: "insert",
            judul: "Tambah Meja",
            isModalOpen: true
        })
    }

    handleEdit = (meja) =>{
        $("#modal_form").show()
        this.setState({
            id_meja: meja.id_meja,
            nomor_meja : meja.nomor_meja,
            action: "update",
            judul: "Edit Meja",
            isModalOpen: true
        })
    }

    handleSave =(event)=>{
        event.preventDefault();
        let url = "http://localhost:4000/cashier/api/meja"
        let form = {
            id_meja: this.state.id_meja,
            nomor_meja: this.state.nomor_meja
        }
        if (this.state.action === "insert") {
            axios.post(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getMeja()
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getMeja()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }

    handleDelete = (id_meja) => {
        let url = "http://localhost:4000/cashier/api/meja/" + id_meja
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getMeja();
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
        }
    }

    handleClose = () => {
        $("#modal_form").hide()
        this.setState({
            isModalOpen: false
        })
    }

  render() {
    return (
        <div className='flex h-screen w-full bg-main-bg dark:bg-secondary-bg bg-cover object-cover' >
                <div className="w-full h-screen">
                    <NavbarUs />
                    <div className="relative mt-20 overflow-x-auto shadow-md sm:rounded-lg m-2">
                    <button
                        onClick={() => this.handleAdd()}
                        data-modal-target="authentication-modal"
                        data-modal-toggle="authentication-modal"
                        className="block text-a bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-b dark:hover:text-white dark:focus:ring-blue-800"
                        type="button"
                    >
                        Tambah Meja
                    </button><br />
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-a dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID Meja
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nomor Meja
                                    </th>
                                    <th scope="col" className="px-6 py-3 flex items-center">
                                        Status Meja
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.meja.map((meja) => (
                                    <tr className="bg-white border-b font-sans dark:bg-white dark:border-a hover:bg-b dark:hover:bg-b dark:hover:text-a" key={meja.id_meja}>
                                        <td className="px-6 py-4 text-a font-medium">
                                            {meja.id_meja}
                                        </td>
                                        <td className="px-6 py-4 text-a font-medium">
                                            {meja.nomor_meja}
                                        </td>
                                        <td className="px-6 py-4 text-a font-medium">
                                            {meja.status_meja}
                                        </td>
                                        <td className="px-6 py-4 text-center flex justify-evenly">
                                            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => this.handleEdit(meja)}>Edit</a>
                                            <a className="font-medium text-red dark:text-red hover:underline" onClick={() => this.handleDelete(meja.id_meja)}>Hapus</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Modal */}
                <div
                    id="modal_form"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                >
                <div className="relative w-full h-full max-w-md md:h-auto">
                {/* Modal content */}
                    <div className="relative rounded-lg shadow dark:bg-a">
                        <button
                        onClick={() => this.handleClose()}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            {this.state.judul}
                        </h3>
                        <form onSubmit={this.handleSave} className="space-y-6" action="#">
                            <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Nomor Meja
                            </label>
                            <input
                                type="number"
                                name="nomor_meja"
                                id="nomor_meja"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required=""
                                placeholder='Nomor Meja'
                                value={this.state.nomor_meja}
                                onChange={(ev) =>
                                    this.setState({ nomor_meja: ev.target.value })
                                }
                            />
                            </div>
                            <button
                            type="submit"
                            className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-a dark:hover:bg-b dark:focus:ring-blue-800 outline outline-1 outline-b"
                            >
                            Submit
                            </button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    );  
  }
}
