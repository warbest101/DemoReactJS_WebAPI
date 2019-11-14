import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor (props) {
    super(props);
    this.state = { forecasts: [], loading: true };

    fetch('api/SampleData/WeatherForecasts')
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
  }

  static renderForecastsTable (forecasts) {
      return (
          <view>
              <p>
                  <Link to="/addweather">Create New</Link>
              </p>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {forecasts.map(forecast =>
                    <tr key={forecast.weatherId}>
                      <td>{forecast.weatherId}</td>
                      <td>{forecast.dateFormatted}</td>
                      <td>{forecast.temperatureC}</td>
                      <td>{forecast.temperatureF}</td>
                      <td>{forecast.summary}</td>
                    </tr>
                  )}
                </tbody>
              </table>
          </view>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }


}
