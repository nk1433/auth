import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        welcome to auth-frontend
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">signup</Link>
        </li>
        <li>
          <Link to="/data">view user/org data</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
