import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchNhanVien } from './components/FetchNhanVien';
import { AddNhanVien } from './components/AddNhanVien';
import { DeleteNhanVien } from './components/DeleteNhanVien';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/fetch-nhanvien' component={FetchNhanVien} />
            <Route path='/addnhanvien' component={AddNhanVien} />
            <Route path='/nhanviens/edit/:empid' component={AddNhanVien} />
            <Route path='/delete/:empid' component={DeleteNhanVien} />
      </Layout>
    );
  }
}
