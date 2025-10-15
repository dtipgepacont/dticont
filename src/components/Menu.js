import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <nav style={{marginBottom: 20}}>
    <Link to="/fiscais" style={{marginRight: 10}}>Fiscais</Link>
    <Link to="/empresas" style={{marginRight: 10}}>Empresas</Link>
    <Link to="/contratos">Contratos</Link>
  </nav>
);

export default Menu;
