import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WithTwoActions from "./Test";
const App = () => {
    return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WithTwoActions/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
    )};

export default App;
