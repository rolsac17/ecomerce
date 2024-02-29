
import React from "react";
import Dashboard from "../admin/dashboard";
import Auth from "@components/Auth"

const HomePage = () => {
  return (
    // <LayoutBase />=
    <Auth>
      <Dashboard/>
    </Auth>
  );
};

export default HomePage;
