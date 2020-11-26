import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-faded">
      <a class="navbar-brand"></a>
      <div
        class="navbar-toggler navbar-toggler-right"
        type="div"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div class="nav-link">Home</div>
          </li>
          <li class="nav-item">
            <div class="nav-link">About</div>
          </li>
          <li class="nav-item">
            <div class="nav-link">Invest</div>
          </li>
          <li class="nav-item">
            <div class="nav-link">Products</div>
          </li>
          <li class="nav-item">
            <div class="nav-link">Login</div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
