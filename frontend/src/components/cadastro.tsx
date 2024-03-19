import React, { useState } from 'react';
import axios from 'axios';
import '../styles/listaVeiculos.scss';
const CadastroVeiculo = () => {
  const [motorista, setMotorista] = useState('');
  const [placa, setPlaca] = useState('');

  const handleCadastro = async () => {
    try {
      const newVeiculo = { motorista, placa };
      await axios.post('http://localhost:3001/veiculos', newVeiculo);
      alert('Veículo cadastrado com sucesso!');
      setMotorista('');
      setPlaca('');
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      alert('Erro ao cadastrar veículo. Verifique o console para mais informações.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Veículo</h2>
      <form onSubmit={handleCadastro}>
        <label htmlFor="motorista">Motorista:</label>
        <input
          type="text"
          id="motorista"
          value={motorista}
          onChange={(e) => setMotorista(e.target.value)}
        />
        <label htmlFor="placa">Placa:</label>
        <input
          type="text"
          id="placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroVeiculo;
