import "./Loader.css";

const Loader= (isOpen) => {
  return (
          <>
          {isOpen && (
                  <div className="loader">
                    <div className="loader__container">
                      <span className="loader__round"></span>
                    </div>
                  </div>
                  )}
          </>
          );
}

export default Loader;
