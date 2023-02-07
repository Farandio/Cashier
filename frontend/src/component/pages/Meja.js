import React, { Component } from 'react';
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import './User.css'
// import NavbarUs from "../Navbar/NavbarUs";

export default class Meja extends React.Component {
    constructor(){
        super()
        this.state = {
            id_meja: "",
            nomor_meja: "",
            tables: [],
            action: "",
            isModalOpen: false
        }
    }

    getMeja = () => {
        let url = "http://localhost:4000/cashier/api/meja"
        axios.get(url)
        .then(response => {
            this.setState({tables: response.data.data })
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        console.log(this.state.tables)
    }

    componentDidMount = () =>{
        this.getMeja()
    }

    handleAdd = () =>{
        this.setState({
            id_meja: 0,
            nomor_meja : "",
            action: "insert",
            isModalOpen: true
        })
    }

    handleEdit = (item) =>{
        this.setState({
            id_meja: item.id_meja,
            nomor_meja : item.nomor_meja,
            action: "update",
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
        this.setState({
            isModalOpen: false
        })
    }

  render() {
    return (
        <div>
          {/* <NavbarUs /> */}
          <div>
            <Container className="my-4">
              <Card.Body className="card-body">
                <h2 className="user-title">LIST OF TABLE</h2>

                <br />

                <ul>
                  {this.state.tables.map((meja) => (
                    <li className="list">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                          <h1 className="text">Nomor Meja :</h1>
                          <h6 className="isi">{meja.nomor_meja}</h6>
                        </div>

                        <div className="col-lg-2 col-md-3 ">
                          <button
                            className="edit"
                            onClick={() => this.handleEdit(meja)}
                          >
                            <AiFillEdit className="icon" />
                          </button>
                          <button
                            className="delete"
                            onClick={() =>
                              this.handleDelete(meja.id_meja)
                            }
                          >
                            <MdDelete className="icon" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                  <div>
                    <Button
                      className="button-add"
                      onClick={() => this.handleAdd()}
                    >
                      Add Table
                    </Button>
                  </div>
                </ul>
              </Card.Body>
            </Container>

            <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Form New Meja</Modal.Title>
              </Modal.Header>
              <Form onSubmit={this.handleSave}>
                <Modal.Body>
                  <Form.Group className="mb-2">
                    <Form.Label>Nomor Meja</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder='Nomor Meja'
                      value={this.state.nomor_meja}
                      onChange={(ev) =>
                        this.setState({ nomor_meja: ev.target.value })
                      }
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Modal.Body>
              </Form>
            </Modal>
          </div>
        </div>
      );  
  }
}
