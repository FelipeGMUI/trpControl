import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Combustivel = () => {
    const [veiculos, setVeiculos] = useState<any[]>([]);
    const [selectedVeiculo, setSelectedVeiculo] = useState('');
    const [litragem, setLitragem] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [hodometro, setHodometro] = useState(0);
    const [dataAbastecimento, setDataAbastecimento] = useState('');

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const veiculoSelecionado = veiculos.find(veiculo => veiculo.id === parseInt(selectedVeiculo));
            if (veiculoSelecionado) {
                const abastecimento = {
                    veiculoId: veiculoSelecionado.id,
                    litragem: litragem,
                    valorTotal: valorTotal,
                    hodometro:hodometro,
                    dataAbastecimento: dataAbastecimento // Adicionando a data de abastecimento
                };
                await axios.post('http://localhost:3001/abastecimentos', abastecimento);
                // Limpa os campos após adicionar o abastecimento
                setSelectedVeiculo('');
                setLitragem(0);
                setValorTotal(0);
                setHodometro(0);
                setDataAbastecimento('');
            }
        } catch (error) {
            console.error('Erro ao cadastrar abastecimento: ', error);
        }
    };

    return (
        <div>
            <h2>Registro de Abastecimento</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='veiculoAbastecimento'>Selecione o veículo:</label>
                <select id='veiculoAbastecimento' value={selectedVeiculo} onChange={(e) => setSelectedVeiculo(e.target.value)}>
                    <option value=''>Selecione um veículo:</option>
                    {veiculos.map((veiculo) => (
                        <option key={veiculo.id} value={veiculo.id}>{veiculo.motorista} - {veiculo.placa}</option>
                    ))}
                </select>
                <label htmlFor='litragem'>Litragem (em litros):</label>
                <input type='number' id='litragem' value={litragem} onChange={(e) => setLitragem(parseFloat(e.target.value))} />
                <label htmlFor='valorTotal'>Valor total (em reais):</label>
                <input type='number' id='valorTotal' value={valorTotal} onChange={(e) => setValorTotal(parseFloat(e.target.value))} />
                <label htmlFor='hodometro'>Hodômetro:</label>
                <input type='number' id='hodometro' value={hodometro} onChange={(e)=>setHodometro(parseFloat(e.target.value))}/>
                <label htmlFor='dataAbastecimento'>Data de abastecimento:</label>
                <input type='date' id='dataAbastecimento' value={dataAbastecimento} onChange={(e) => setDataAbastecimento(e.target.value)} />
                <button type='submit'>Registrar Abastecimento</button>
            </form>
        </div>
    );
};

export default Combustivel;
