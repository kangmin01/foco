import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './component/Header/Header';
import { PUBLIC_ROUTE_ARR, PRIVATE_ROUTE_ARR } from './Route';
import { PrivateRoute } from './component/util/CustomRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {PUBLIC_ROUTE_ARR.map((route, index) => {
          return (
            <Route path={route.path} element={<route.element />} key={index} />
          );
        })}

        {PRIVATE_ROUTE_ARR.map((route, index) => {
          return (
            <Route
              path={route.path}
              element={
                <PrivateRoute>
                  <route.element />
                </PrivateRoute>
              }
              key={index}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
