import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };

  return (
    <div className='list-container'>
      <h2>Lista de Veículos</h2>
      <ul className='veiculo-list'>
        {veiculos.map((veiculo:any) => (
          <li key={veiculo.id} className='veiculo-item'>
           <strong> Motorista: {veiculo.motorista}</strong>, <strong>Placa: {veiculo.placa}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaVeiculos;
