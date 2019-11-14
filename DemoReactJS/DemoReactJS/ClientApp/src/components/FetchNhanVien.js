import React, { Component } from 'react';
import { Link, withRouter, useHistory, Redirect } from 'react-router-dom';  

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
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(id) {
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


    static renderNhanviensTable(nhanviens) {
        return (
            <view>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Mã NV</th>
                            <th>Họ tên</th>
                            <th>Thành phố</th>
                            <th>Căn hộ</th>
                            <th>Giới tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nhanviens.map(nv =>
                            <tr key={nv.maNv}>
                                <td>{nv.maNv}</td>
                                <td>{nv.hoTen}</td>
                                <td>{nv.thanhPho}</td>
                                <td>{nv.canHo}</td>
                                <td>{nv.gioiTinh}</td>
                                <td>
                                    <Link to={'nhanviens/edit/' + nv.maNv} >Edit </Link>
                                    
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </view>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchNhanVien.renderNhanviensTable(this.state.nhanviens);

        return (
            <div>
                <h1>Index</h1>
                <p>
                    <Link to="/AddNhanVien">Create New</Link>
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