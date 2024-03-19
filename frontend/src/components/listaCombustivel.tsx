import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/listaCombustivel.scss'

const ListaCombustivel = () => {
    const [veiculos, setVeiculos] = useState<any[]>([]);
    const [selectedVeiculo, setSelectedVeiculo] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [abastecimentosFiltrados, setAbastecimentosFiltrados] = useState<any[]>([]);
    const [totalAbastecimentos, setTotalAbastecimentos] = useState(0);

    useEffect(() => {
        fetchVeiculos();
    }, []);

    const fetchVeiculos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/veiculos');
            setVeiculos(response.data);
        } catch (error) {
            console.error('Erro ao buscar veículos: ', error);
        }
    };

    const handleFilter = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/abastecimentos?veiculoId=${selectedVeiculo}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
            setAbastecimentosFiltrados(response.data);
            // Calcular o total dos abastecimentos filtrados
            const total = response.data.reduce((acc: any, abastecimento: any) => acc + abastecimento.valorTotal, 0);
            setTotalAbastecimentos(total);
        } catch (error) {
            console.error('Erro ao filtrar abastecimentos: ', error);
        }
    };
    
    

    return (
        <div className='combustivel-container'>
            <h2>Lista de Abastecimentos</h2>
            <div className='form-container'>
                <div>
                    <label htmlFor="veiculo">Veículo:</label>
                    <select id="veiculo" value={selectedVeiculo} onChange={(e) => setSelectedVeiculo(e.target.value)}>
                        <option value="">Selecione um veículo</option>
                        {veiculos.map((veiculo) => (
                            <option key={veiculo.id} value={veiculo.id}>{veiculo.motorista} - {veiculo.placa}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="dataInicial">Data Inicial:</label>
                    <input type="date" id="dataInicial" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="dataFinal">Data Final:</label>
                    <input type="date" id="dataFinal" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
                </div>
                <button onClick={handleFilter}>Filtrar</button>
            </div>
            <div className='show-container'>
                <h3>Abastecimentos:</h3>
                <ul>
                    {abastecimentosFiltrados.map((abastecimento) => (
                        <li key={abastecimento.id}>
                            Data: {abastecimento.dataAbastecimento} -
                            Veículo: {veiculos.find(veiculo => veiculo.id === abastecimento.veiculoId)?.placa} -
                            Litragem: {abastecimento.litragem} -
                            Valor Total: {abastecimento.valorTotal} -
                            Hodômetro: {abastecimento.hodometro}
                        </li>
                    ))}
                </ul>
                <h3>Total do Filtro: R$ {totalAbastecimentos.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default ListaCombustivel;
