import React from "react";
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <ul className="flex justify-between py-5 top-0 absolute">
      <li className="text-2xl font-bold">
        <Link to="/"> PreshDev</Link>
      </li>
    </ul>
  );
}

export default Navbar;
