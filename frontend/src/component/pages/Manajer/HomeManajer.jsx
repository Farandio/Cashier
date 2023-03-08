import React from "react";
import Chart from "react-apexcharts";
import NavbarManajer from "../../Navbar/NavbarManajer";
import axios from "axios";
import $ from 'jquery';

export default class Manajer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      nama_user: "",
      data: [],
      transaksi: [],
      detail_transaksi: [],
      options: {
        chart: {
          id: "basic-bar",
          foreColor: "#ffffff"
        },
        xaxis: {
          categories: [],
        },
        fill: {
          colors: ['#059669']
        },
      },
    };
    let user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem("token") && user.role == "manajer") {
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

  getTransaksiUser = (event) => {
    event.preventDefault()
    let url = "http://localhost:4000/cashier/api/transaksi/user/" + this.state.nama_user
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
  getTransaksi = () => {
    let url = "http://localhost:4000/cashier/api/transaksi/"
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
  getDetail = (selectedItem) => {
    $("#modal_detail").show()
    axios.get("http://localhost:4000/cashier/api/transaksi/detail/" + selectedItem.id_transaksi, this.headerConfig())
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
  }

  convertTime = time => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
  }
  close = () => {
    $("#modal_detail").hide()
  }

  componentDidMount() {
    this.getTransaksi()
    axios
      .get("http://localhost:4000/cashier/api/transaksi/qtybymenu", this.headerConfig())
      .then((response) => {
        const categories = response.data.map((data) => data.nama_menu);
        const values = response.data.map((data) => data.total_qty);

        this.setState({
          data: [
            {
              name: "Value",
              data: values,
            },
          ],
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: categories,
              labels: {
                style: {
                  fontFamily: "Arial, sans-serif",
                  fontSize: "18px",
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className='flex h-screen w-full dark:bg-secondary-bg'>
        <div class="w-full h-screen">
          <NavbarManajer />
          <div class="relative mt-20 overflow-x-auto shadow-md pt-20 sm:rounded-lg m-2">
            <h2 className="dark:bg-text-color dark:text-white text-3xl font-bold py-6 mb-8 font-sans text-center rounded-full">BEST SELLER
            </h2>
            <div class="p-4 mb-6 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <Chart
                options={this.state.options}
                series={this.state.data}
                type="bar"
                height={350}
                className="dark:bg-text-color dark:bg-opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}