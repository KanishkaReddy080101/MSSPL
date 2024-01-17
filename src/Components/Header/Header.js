import React from "react";
import Image from "next/image";

function Header() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Image
            className="header-logo"
            src="/msspl-logo.png"
            alt="logo"
            width={115}
            height={115}
          />
        </div>
        <div className="col d-flex pe-4 pt-5 justify-content-end">
          <p className="title"> Search Stock</p>
        </div>
      </div>

      <hr />
    </>
  );
}

export default Header;