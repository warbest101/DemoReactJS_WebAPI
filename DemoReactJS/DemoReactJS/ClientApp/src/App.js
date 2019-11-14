import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchNhanVien } from './components/FetchNhanVien';
import { FetchData } from './components/FetchData';
import { AddNhanVien } from './components/AddNhanVien';
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/fetch-nhanvien' component={FetchNhanVien} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/AddNhanVien' component={AddNhanVien} />
            <Route path='/nhanviens/edit/:nvmanv' component={AddNhanVien} />
      </Layout>
    );
  }
}