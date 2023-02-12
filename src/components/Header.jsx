import React from "react";

function Header() {
  return (
    <div className="text-center pt-12 lg:mt-[5%] mt-[8%] lg:w-[30%] mx-auto">
      <p className="text-sm color black mb-3">✨ Welcome to my blog ✨</p>
      <h2
        data-text="Tech and Lifestyle"
        className="text-3xl header relative text-[#F7F7F8] clipy"
      >
        {" "}
        Tech and Lifestyle
      </h2>
    </div>
  );
}

export default Header;
