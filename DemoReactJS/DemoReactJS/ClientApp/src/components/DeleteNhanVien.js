import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { EmployeeData } from './AddNhanVien';

export class DeleteNhanVien extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "Delete", loading: true, thanhphoList: [], empData: new EmployeeData() };

        var empid = this.props.match.params["empid"];

            fetch('api/Nhanviens/Details/' + empid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ loading: false, empData: data });
                });
        

        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(event) {
        event.preventDefault();
        if (!window.confirm("Do you want to delete employee with Id: " + this.state.empData.id))
            return;
        else {
            fetch('api/Nhanviens/Delete/' + this.state.empData.id, {
                method: 'delete'
            }).then(response => response.json())
                .then(() => {
                    this.props.history.push('/fetch-nhanvien');
                });
        }
    }


    renderDeleteForm() {
        return (
            <form onSubmit={this.handleDelete}>
                <div className="form-group row" >
                    <label htmlFor="id">Id</label>: {this.state.empData.id}
                </div>
                < div className="form-group row">
                    <label  htmlFor="name">Name</label>: {this.state.empData.name}
                </div >
                <div className="form-group row">
                    <label htmlFor="gender">Gender</label>: {this.state.empData.gender}
                </div >
                <div className="form-group row">
                    <label htmlFor="apartment" >Apartment</label>: {this.state.empData.apartment}
                </div>
                <div className="form-group row">
                    <label htmlFor="city">City</label>: {this.state.empData.city}
                </div >
                <div className="form-group">
                    <button type="submit">Delete</button>
                </div >
                <Link to='/fetch-nhanvien'>Back to list</Link>
            </form >
        )
    }

    render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderDeleteForm();
        return <div>
            <h1>{this.state.title}</h1>
            <hr />
            {contents}
        </div>;
    }


}