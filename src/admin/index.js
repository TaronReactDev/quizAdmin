import React from 'react';
import Dashboard from "./dashboard/index"
import Menu from "./menu"
import "./style.scss"

const Index = (props) => {
  return (
    <div className="adminContainer">
      <Menu/>
      <Dashboard/>
    </div>
  );
}

export default Index;
