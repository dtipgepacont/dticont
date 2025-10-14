import React, { useEffect, useState } from 'react';


const ContratosPage = () => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/contratos')
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setLoading(false);
      })
      .catch(err => {
        setErro(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Contratos</h2>
      {loading && <p>Carregando...</p>}
      {erro && <p style={{color:'red'}}>Erro: {erro}</p>}
      {dados && Array.isArray(dados) && dados.length > 0 && (
        <table border="1" cellPadding={5}>
          <thead>
            <tr>
              {dados[0].map((col, idx) => <th key={idx}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {dados.slice(1).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContratosPage;
