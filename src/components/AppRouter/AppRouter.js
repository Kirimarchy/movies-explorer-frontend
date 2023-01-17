import {Route, Router, BrowserRouter, Routes} from "react-router-dom";
import {allRoutes} from "../../utils/router/GiveRoute";

const AppRouter = () => {

    function check(){
      console.log("IT WORKS!!!!!");
    }

    return (

                  <Routes>
                    {allRoutes.map(route =>
                        <Route
                            key = {route.path}
                            exact={route.exact}
                            path={route.path}
                            element={route.element}
                        />
                    )}
                  </Routes>


    );
};

export default AppRouter;
