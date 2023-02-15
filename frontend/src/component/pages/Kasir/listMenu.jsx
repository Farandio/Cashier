// import React, { Component } from 'react'
// import $ from "jquery";
// import axios from "axios";
// import NavbarAdmin from "../../Navbar/NavbarAdmin";
// import { response } from '../../../../../backend/router/menu';

// export default class newMenu extends Component {
//     constructor() {
//         super()
//         this.state = {
//             menu: [],
//             action: "",
//             id_menu: 0,
//             nama_menu: '',
//             jenis: '',
//             deskripsi: '',
//             gambar: null,
//             harga: '',
//             menuReview: [],
//             action: "",
//             id_menuReview: 0,
//             nama_menuReview: '',
//             jenisReview: '',
//             deskripsiReview: '',
//             gambarReview: null,
//             hargaReview: ''
//         }
//     }

//     reviewModal = (selectedItem) => {
//       $("#modal_review").show()
//       let url = "http://localhost:4000/cashier/api/menu/" + selectedItem.id_menu
//       axios.get(url)
//       .then(response => {
//         this.setState({ menuReview: response.data.data })
//       })
//       .catch(err => {
//         if (err.response) {
//           if (err.response.status) {
//               window.alert(err.response.data.message)
//               window.location = '/'
//           }
//       } else {
//           console.log(err);
//       }
//       })
//     }

//     getMenu = () => {
//         let url = "http://localhost:4000/cashier/api/menu"
//         axios.get(url)
//             .then(response => {
//                 this.setState({ menu: response.data.data })
//             })
//             .catch(error => {
//                 if (error.response) {
//                     if (error.response.status) {
//                         window.alert(error.response.data.message)
//                         window.location = '/'
//                     }
//                 } else {
//                     console.log(error);
//                 }
//             })
//     }

//     Add = () => {
//         $("#modal_menu").show()
//         this.setState({
//             id_menu: 0,
//             nama_menu: '',
//             jenis: '',
//             deskripsi: '',
//             gambar: null,
//             harga: '',
//             action: "insert"
//         })
//     }
//     Edit = selectedItem => {
//         $("#modal_menu").show()
//         this.setState({
//             id_menu: selectedItem.id_menu,
//             nama_menu: selectedItem.nama_menu,
//             jenis: selectedItem.jenis,
//             deskripsi: selectedItem.deskripsi,
//             gambar: null,
//             harga: selectedItem.harga,
//             action: "update"
//         })
//     }
//     saveMenu = (event) => {
//         event.preventDefault()
//         $("#modal_menu").show()
//         let form = new FormData()
//         form.append("id_menu", this.state.id_menu)
//         form.append("nama_menu", this.state.nama_menu)
//         form.append("jenis", this.state.jenis)
//         form.append("deskripsi", this.state.deskripsi)
//         form.append("gambar", this.state.gambar)
//         form.append("harga", this.state.harga)
//         let url = "http://localhost:4000/cashier/api/menu"
//         if (this.state.action === "insert") {
//             axios.post(url, form)
//                 .then(response => {
//                     window.alert(response.data.message)
//                     this.getMenu()
//                 })
//         } else if (this.state.action === "update") {
//             axios.put(url, form)
//                 .then(response => {
//                     window.alert(response.data.message)
//                     this.getMenu()
//                 })
//                 .catch(error => console.log(error))
//         }
//         $("#modal_menu").hide()
//     }
//     dropMenu = selectedItem => {
//         if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
//             let url = "http://localhost:4040/kasir/menu/" + selectedItem.id_menu
//             axios.delete(url)
//                 .then(response => {
//                     window.alert(response.data.message)
//                     this.getMenu()
//                 })
//                 .catch(error => console.log(error))
//         }
//     }

//     handleFile = (event) => {
//         this.setState({
//             gambar: event.target.files[0]
//         })
//     }

//     bind = (event) => {
//         this.setState({ [event.target.name]: event.target.value })
//     }
//     componentDidMount() {
//         this.getMenu()
//     }
//     close = () => {
//         $("#modal_menu").hide()
//     }
//     convertToRupiah(number) {

//         if (number) {

//             var rupiah = "";

//             var numberrev = number

//                 .toString()

//                 .split("")

//                 .reverse()

//                 .join("");

//             for (var i = 0; i < numberrev.length; i++)

//                 if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + ".";

//             return (

//                 "Rp. " +

//                 rupiah

//                     .split("", rupiah.length - 1)

//                     .reverse()

//                     .join("")

//             );

//         } else {

//             return number;

//         }

//     }

//   render() {
//     return (
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//             <NavbarAdmin />
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 <span className="sr-only">Image</span>
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Product
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Qty
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Price
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.menu.map(item => (
//             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//               <td className="w-32 p-4">
//                 <img class="rounded-t-lg" src={`http://localhost:4000/img/${item.gambar}`} alt="gambar" />
//               </td>
//               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                 {item.nama_menu}
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex items-center space-x-3">
//                   <button
//                     className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                     type="button"
//                   >
//                     <span className="sr-only">Quantity button</span>
//                     <svg
//                       className="w-4 h-4"
//                       aria-hidden="true"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                   <div>
//                     <input
//                       type="number"
//                       id="first_product"
//                       className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder=""
//                       required=""
//                     />
//                   </div>
//                   <button
//                     className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                     type="button"
//                   >
//                     <span className="sr-only">Quantity button</span>
//                     <svg
//                       className="w-4 h-4"
//                       aria-hidden="true"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </td>
//               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                 {this.convertToRupiah(item.harga)}
//               </td>
//               <td className="px-6 py-4">
//                 <a
//                   href="#"
//                   className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                 >
//                   Review
//                 </a>
//               </td>
//             </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )
//   }
// }
