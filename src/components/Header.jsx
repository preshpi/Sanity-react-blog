import React from "react";

function Header() {
  return (
    <div className="text-center pt-12 lg:mt-[5%] mt-[8%]">
      <p className="text-xs color black mb-3">Welcome to my blog</p>
      <h2
        data-text="Tech and Lifestyle"
        className="text-3xl header relative text-white clipy"
      >
        {" "}
        Tech and Lifestyle
      </h2>
    </div>
  );
}

export default Header;
