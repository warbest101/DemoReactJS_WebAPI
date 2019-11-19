import React, { Component } from 'react';
import { Link } from 'react-router-dom';  

export class FetchNhanVien extends Component {
    static displayName = FetchNhanVien.name;

    constructor(props) {
        super(props);
        this.state = { nhanviens: [], loading: true };
        fetch('api/Nhanviens/GetAll')
            .then(response => response.json())
            .then(data => {
                this.setState({ nhanviens: data, loading: false });
            });
    }

    handleEdit = (id) => {
        this.props.history.push('/nhanviens/edit/' + id)
    }

    handleDelete = (id) => {
        if (!window.confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/Nhanviens/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        nhanviens: this.state.nhanviens.filter((rec) => {
                            return (rec.maNv != id);
                        })
                    });
            });
        }
    } 

    renderNhanviensTable(nhanviens) {
        return (
            <div>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Mã NV</th>
                            <th>Họ tên</th>
                            <th>Giới tính</th>
                            <th>Căn hộ</th>
                            <th>Thành phố</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nhanviens.map(nv =>
                            <tr key={nv.maNv}>
                                <td>{nv.maNv}</td>
                                <td>{nv.hoTen}</td>
                                <td>{nv.gioiTinh}</td>
                                <td>{nv.canHo}</td>
                                <td>{nv.thanhPho}</td>
                                <td>
                                    <a onClick={(id) => this.handleEdit(nv.maNv)}>Edit </a> |
                                    <a onClick={(id) => this.handleDelete(nv.maNv)}>Delete </a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderNhanviensTable(this.state.nhanviens);

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

export class NhanvienData {
    maNv = 0;
    hoTen = "";
    thanhPho = "";
    canHo = "";
    gioiTinh = "";
}