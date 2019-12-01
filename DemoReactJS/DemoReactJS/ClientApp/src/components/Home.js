import React, { Component } from 'react';
import { Link } from 'react-router-dom';  

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to the Demo of ReactJS and ASP.NET CORE API single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>
                We will be creating a sample Employee Record Management system and performing CRUD operations on it. <br></br>
                <Link to="/fetch-nhanvien">Click Here to start</Link>    
        </p>
            <p>Here are the members from our group:</p>
            <ul>
                <li>Le Truong Thanh - 43.01.104.162</li>
                <li>Tran Thien Phuc - 43.01.104.134</li>
                <li>Nguyen Thanh Huy Hoang - 43.01.104.056</li>
                <li>Le Tan Khoi - 43.01.104.084</li>
            </ul>
        
      </div>
    );
  }
}
