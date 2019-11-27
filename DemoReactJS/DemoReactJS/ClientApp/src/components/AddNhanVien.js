import { Link } from 'react-router-dom';
import React, { Component } from 'react';


export class AddNhanVien extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cityList:[], empData: new EmployeeData() };

        fetch('api/Nhanviens/GetCities')
            .then(response => response.json())
            .then(data => {
                this.setState({ cityList: data });
            });

        var empid = this.props.match.params["empid"];


        if (empid > 0) {
            fetch('api/Nhanviens/Details/' + empid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, empData: new EmployeeData(), cityList: [] };
        }

        this.handleSave = this.handleSave.bind(this);
    }


    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.empData.id) {
            fetch('api/Nhanviens/Update/' + this.state.empData.id, {
                method: 'PUT',
                body: data,
            }).then(response => response.json())
                .then((data) => {
                    this.props.history.push('/fetch-nhanvien');
                    console.log(JSON.stringify(data));
                })
        }
        else {
            fetch('api/Nhanviens/Create', {
                method: 'POST',
                body: data,
            }).then(response => response.json())
                .then((data) => {
                    this.props.history.push("/fetch-nhanvien");
                    console.log(JSON.stringify(data));
                })  
        }
        
    }


    renderCreateForm(cityList) {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.empData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="apartment" >Apartment</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="apartment" defaultValue={this.state.empData.apartment} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="city">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="city" defaultValue={this.state.empData.city} required>
                            {cityList.map(c =>
                                <option>{c.name}</option>)
                            }
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit">Save</button>
                </div >
                <Link to='/fetch-nhanvien'>Back to list</Link>
            </form >
        )
    }  

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);
        return <div>
            <h1>{this.state.title}</h1>
            <hr />
            {contents}
        </div>;
    }


}

export class EmployeeData {
    id = 0;
    name = "";
    gender = "";
    city = "";
    apartment = "";
    
}

