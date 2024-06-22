import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Layout from "./@/components/layout";
import Error, { Error2 } from "./@/utils/error";
import Mainp from "./App";
import Signinup from "./pages/signin-up";
import { ThemeProvider } from "./@/components/theme-provider"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error2 />}>
      <Route path="*" element={<Error />} />
      <Route index element={<Mainp />} />
      <Route path="signin-up" element={<Signinup />} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
