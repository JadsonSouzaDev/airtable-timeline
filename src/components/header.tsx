import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Thanks for this test! {"\u2728"}</h1>
      <h2 className="text-base text-gray-500">
        This is my version of a timeline to show tasks.
      </h2>
    </div>
  );
};

export default Header;
