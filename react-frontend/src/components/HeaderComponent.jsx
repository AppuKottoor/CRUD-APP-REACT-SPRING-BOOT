import React, { Component } from "react";
import {NavLink} from 'react-router-dom'

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Employee Management System
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <NavLink to="/" className="nav-link" activeClassName="active">Employee List</NavLink>                
                <NavLink to="/add-employee/-1" className="nav-link" activeClassName="active" >Add Employee</NavLink>                
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;
