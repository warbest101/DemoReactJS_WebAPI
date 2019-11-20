import React, { Component } from 'react';
import { Link } from 'react-router-dom';  

export class FetchNhanVien extends Component {
    static displayName = FetchNhanVien.name;

    constructor(props) {
        super(props);
        this.state = { employees: [], loading: true };
        fetch('api/Nhanviens/GetAll')
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data, loading: false });
            });
    }

    renderNhanviensTable(employees) {
        return (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Apartment</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp =>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.gender}</td>
                                <td>{emp.apartment}</td>
                                <td>{emp.city}</td>
                                <td>
                                    <Link to={'/nhanviens/edit/' + emp.id}>Edit</Link> |
                                    <Link to={'/delete/' + emp.id}>Delete</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderNhanviensTable(this.state.employees);

        return (
            <div>
                <h1>Index</h1>
                <p>
                    <Link to="/addnhanvien">Create New</Link>
                </p>
                {contents}
            </div>
        );
    }


}
