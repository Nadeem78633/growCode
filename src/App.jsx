import React from "react";
import Header from "./Components/Home/Header";
import Form from "./Components/Form/Form";
import Department from "./Components/Department/Department";

// React router
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { RouterProvider } from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <Header />
        </>
      }
    >
      <Route index element={<Form />} />
      <Route path="/department" element={<Department />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
