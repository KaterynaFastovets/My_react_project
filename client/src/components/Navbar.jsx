import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const activeStyles = {
    color: "white",
  };

  return (
    <div className="flex p-4 bg-emerald-300 justify-around items-evenly">
      
      <ul className="flex gap-8">
        <li>
          <NavLink
            to={"/"}
            href="/"
            className="text-s text-white hover:text-gray-400"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Головна
          </NavLink>
        </li>
    
      </ul>
      <div className="flexs justify-center items-center bg-emerald-600 text-s text-white px-4 py-2 rounded-sm">
        <NavLink to={"/newProduct"}>
          <button>Додати продукт</button>
        </NavLink>
      </div>
    </div>
  );
};
