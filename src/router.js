import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FiscaisPage, EmpresasPage, ContratosPage } from './components';
import App from './App';

const AppRouter = () => (
  <Router>
    <App />
    <Routes>
      <Route path="/fiscais" element={<FiscaisPage />} />
      <Route path="/empresas" element={<EmpresasPage />} />
      <Route path="/contratos" element={<ContratosPage />} />
      <Route path="*" element={<FiscaisPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
