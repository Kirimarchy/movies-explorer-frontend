import React from "react";
import "./PreLoader.css";

const PreLoader= (isOpen = false) => {
  return (
    <>
      {isOpen && (
        <div className="preloader">
          <div className="preloader__container">
            <span className="preloader__round"></span>
          </div>
        </div>
      )}
    </>
  );
}

export default PreLoader;
