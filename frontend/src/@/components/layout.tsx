/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";
import IsAuth from '../utils/authorized';
import { Toaster } from "./ui/toaster"
import Header from "./Header";
import StarsCanvas from "./Starback";
import { useState } from "react";

export default function Layout() {
  const isAuthorized = IsAuth();


  return (
    <div className="flex flex-col h-screen">
      <Header auth={isAuthorized} />
      <main className="flex-grow">
        <Outlet />
      </main>

      <Toaster />
      <StarsCanvas />
    </div>
  );
}
