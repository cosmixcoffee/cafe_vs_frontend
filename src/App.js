import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Header from './components/include/Header.js';
import CafeLogin from './components/log/CafeLogin.js'
import LoginSuccess from './components/test.js';

function App() {
  console.warn = function no_console() {};
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/member/login" element={<CafeLogin />} />
          <Route path="/success" element={<LoginSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
