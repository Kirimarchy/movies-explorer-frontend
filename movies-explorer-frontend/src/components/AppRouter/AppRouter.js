import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {allRoutes} from "../../utils/router/GiveRoute";

const AppRouter = () => {

    return (
        <div>

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

        </div>
    );
};

export default AppRouter;