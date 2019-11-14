import { Link, withRouter,Redirect } from 'react-router-dom';
import React, { Component } from 'react';


export class AddNhanVien extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, thanhphoList: [], maNv: 0, nvData: NhanvienData };

        var nvmanv = this.props.match.params.nvmanv;

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
            this.state = { title: "Create", loading: false, thanhphoList: [], nvData: new NhanvienData };
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
    }


    handleSave(event) {
        
        event.preventDefault();
        const data = new FormData(event.target);

            fetch('api/Nhanviens/Edit', {
                method: 'PUT',
                body: data
            }).then((response) => response.json())
                .then(() => {  })
        
    }


    static renderCreateForm(thanhphoList, nvData) {
        return (
            <form onSubmit={<Redirect to='/fetch-nhanvien' />}>
                <div className="form-group row" >
                    <input type="hidden" name="maNv" value={nvData.maNv} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Họ tên</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={nvData.hoTen} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Giới tính</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={nvData.gioiTinh} required>
                            <option value="">-- Chọn giới tính --</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Căn hộ</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={nvData.canHo} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">Thành phố</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={nvData.thanhPho} required>
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
            : AddNhanVien.renderCreateForm(this.state.thanhphoList, this.state.nvData);
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Create new</h3>
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

