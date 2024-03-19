import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/expense.scss';

interface Despesa {
    nome: string;
    valor: number;
    veiculoId: number;
    dataCadastro: string;
}

const DespesasVeiculo: React.FC = () => {
    const [novaDespesa, setNovaDespesa] = useState<Despesa>({ nome: '', valor: 0, veiculoId: 0, dataCadastro: '' });
    const [veiculos, setVeiculos] = useState<any[]>([]);
    const [selectedVeiculo, setSelectedVeiculo] = useState('');
    const [despesas, setDespesas] = useState<Despesa[]>([]);


    useEffect(() => {
        fetchVeiculos();
        fetchDespesas();
    }, []);

    const fetchVeiculos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/veiculos');
            setVeiculos(response.data);
        } catch (error) {
            console.error('Erro ao buscar veículos: ', error);
        }
    };
    const fetchDespesas = async () =>{
        try{
            const response = await axios.get('http://localhost:3001/despesas');
            setDespesas(response.data);
        }catch (error){
            console.error('Erro ao buscar despesas', error)
        }

    }

    const adicionarDespesa = async () => {
        try {
            const veiculoSelecionado = veiculos.find(veiculo => veiculo.id === parseInt(selectedVeiculo));
            if (veiculoSelecionado) {
                const novaDespesaComVeiculo = { ...novaDespesa, veiculoId: veiculoSelecionado.id, dataCadastro: novaDespesa.dataCadastro, valor: novaDespesa.valor, nome: novaDespesa.nome };
                await axios.post('http://localhost:3001/despesas', novaDespesaComVeiculo);
                setNovaDespesa({ nome: '', valor: 0, veiculoId: 0, dataCadastro: '' });
                fetchDespesas();
            }
        } catch (error) {
            console.error('Erro ao adicionar despesa: ', error);
        }
    };

    return (
        <div className='despesas-veiculo-container'>
            <h2>Despesas do Veículo</h2>
            <div>
                <label htmlFor='veiculoDespesa'>Selecione o veículo: </label>
                <select id="veiculoDespesa" value={selectedVeiculo} onChange={(e) => setSelectedVeiculo(e.target.value)}>
                    <option value="">Selecione um veículo:</option>
                    {veiculos.map((veiculo: any) => (
                        <option key={veiculo.id} value={veiculo.id}>
                            {veiculo.motorista} - {veiculo.placa}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="nomeDespesa">Nome da Despesa: </label>
                <input
                    type="text"
                    id="nomeDespesa"
                    value={novaDespesa.nome}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="valorDespesa">Valor da Despesa: </label>
                <input
                    type="number"
                    id="valorDespesa"
                    value={novaDespesa.valor}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: parseFloat(e.target.value) })}
                />
            </div>
            <div>
                <label htmlFor="dataCadastroDespesa">Data de Cadastro: </label>
                <input
                    type="date"
                    id="dataCadastroDespesa"
                    value={novaDespesa.dataCadastro}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, dataCadastro: e.target.value })}
                />
            </div>
            <button onClick={adicionarDespesa}>Adicionar Despesa</button>
        </div>
    );
};

export default DespesasVeiculo;
