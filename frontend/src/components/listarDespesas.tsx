import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/listaDespesas.scss';

interface Despesa {
    nome: string;
    valor: number;
    veiculoId: number;
    dataCadastro: string;
}

const ListaDespesas = () => {

    const [filtroDataInicial, setFiltroDataInicial] = useState<string>('');
    const [filtroDataFinal, setFiltroDataFinal] = useState<string>('');
    const [filtroVeiculo, setFiltroVeiculo] = useState<string>('');
    const [despesasFiltradas, setDespesasFiltradas] = useState<Despesa[]>([]);
    const [veiculos, setVeiculos] = useState<any[]>([]);
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

    const fetchDespesas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/despesas');
            setDespesas(response.data);
        } catch (error) {
            console.error('Erro ao buscar despesas: ', error);
        }
    };

    const filtrarDespesas = () => {
        let despesasFiltradasTemp = despesas;

        if (filtroVeiculo) {
            despesasFiltradasTemp = despesasFiltradasTemp.filter(despesa => despesa.veiculoId.toString() === filtroVeiculo);
        }

        if (filtroDataInicial && filtroDataFinal) {
            const dataInicialFilter = new Date(filtroDataInicial);
            const dataFinalFilter = new Date(filtroDataFinal);

            despesasFiltradasTemp = despesasFiltradasTemp.filter(despesa => {
                const dataDespesa = new Date(despesa.dataCadastro);
                return dataDespesa >= dataInicialFilter && dataDespesa <= dataFinalFilter;
            });
        }

        // Ordenando as despesas por data de cadastro
        despesasFiltradasTemp.sort((a, b) => new Date(a.dataCadastro).getTime() - new Date(b.dataCadastro).getTime());

        setDespesasFiltradas(despesasFiltradasTemp);
    };


    const calcularTotalDespesas = () => {
        const total = despesasFiltradas.reduce((acc, despesa) => acc + despesa.valor, 0);
        return total.toFixed(2);
    };

    return (
        <div className='filter-container'>
            <div>
                <label htmlFor="dataInicial">Data Inicial:</label>
                <input type="date" id="dataInicial" value={filtroDataInicial} onChange={(e) => setFiltroDataInicial(e.target.value)} />
            </div>
            <div>
                <label htmlFor="dataFinal">Data Final:</label>
                <input type="date" id="dataFinal" value={filtroDataFinal} onChange={(e) => setFiltroDataFinal(e.target.value)} />
            </div>
            <div>
                <label htmlFor='veiculoDespesa'>Filtrar por veiculo: </label>
                <select id="veiculoDespesa" value={filtroVeiculo} onChange={(e) => setFiltroVeiculo(e.target.value)}>
                    <option value="">Selecione um veículo:</option>
                    {veiculos.map((veiculo: any) => (
                        <option key={veiculo.id} value={veiculo.id}>
                            {veiculo.motorista} - {veiculo.placa}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={filtrarDespesas}>Filtrar</button>

            <div className="despesa-list">
                <h3>Despesas Adicionadas:</h3>
                <ul>
                    {despesasFiltradas.map((despesa, index) => (
                        <li key={index}> Data:{despesa.dataCadastro} Veículo: {veiculos.find(veiculo => veiculo.id === despesa.veiculoId)?.placa} - {despesa.nome}: R$ {despesa.valor.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Total de Despesas: R$ {calcularTotalDespesas()}</h3>
            </div>
        </div>
    );
};

export default ListaDespesas;
