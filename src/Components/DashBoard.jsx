import React from "react";
import DashboardCharts from "./Charts";
import DashBoardProducts from "./DashBoardProducts";
import Widgets from "./Widgets";

function DashBoard() {
  return (
    <>
      <Widgets />
      <DashboardCharts />
      <DashBoardProducts />
    </>
  );
}

export default DashBoard;
