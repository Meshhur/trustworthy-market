import React, { useContext } from 'react';
import { Routes, Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes.js';
import { Context } from '../index.js';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    );
});

export default AppRouter;