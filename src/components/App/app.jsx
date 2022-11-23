import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import Header from "../Header";

import "./style.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <div>
      <Header
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        setUserName={setUserName}
        userName={userName}
      />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserName}
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
