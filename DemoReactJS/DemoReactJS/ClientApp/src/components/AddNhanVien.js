import { Link } from 'react-router-dom';
import React, { Component } from 'react';


export class AddNhanVien extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, thanhphoList: [], nvData: new NhanvienData() };

        var nvmanv = this.props.match.params["nvmanv"];

        fetch('api/Nhanviens/GetThanhpho')
            .then(response => response.json())
            .then(data => {
                this.setState({ thanhphoList: data });
            });

        if (nvmanv > 0) {
            fetch('api/Nhanviens/Details/' + nvmanv)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, nvData: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, thanhphoList: [], nvData: new NhanvienData() };
        }

        this.handleSave = this.handleSave.bind(this);
    }


    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.nvData.maNv) {
            fetch('api/Nhanviens/Update', {
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


    renderCreateForm(thanhphoList) {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row" >
                    <input type="hidden" name="maNv" value={this.state.nvData.maNv} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="hoTen">Họ tên</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="hoTen" defaultValue={this.state.nvData.hoTen} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="gioiTinh">Giới tính</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gioiTinh" defaultValue={this.state.nvData.gioiTinh} required>
                            <option value="">-- Chọn giới tính --</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="canHo" >Căn hộ</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="canHo" defaultValue={this.state.nvData.canHo} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="thanhPho">Thành phố</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="thanhPho" defaultValue={this.state.nvData.thanhPho} required>
                            <option value="">-- Chọn thành phố --</option>
                            {thanhphoList.map(tp =>
                                <option key={tp.maTp} value={tp.tenTp}>{tp.tenTp}</option>
                            )}
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
            : this.renderCreateForm(this.state.thanhphoList);
        return <div>
            <h1>{this.state.title}</h1>
            <hr />
            {contents}
        </div>;
    }


}

export class NhanvienData {
    maNv = 0;
    hoTen = "";
    gioiTinh = "";
    thanhPho = "";
    canHo = "";
    
}

