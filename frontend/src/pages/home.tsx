import React, { useState } from 'react';
import '../styles/homePage.scss'; // Arquivo de estilo CSS para o menu
import CalculadoraComissao from '../components/commission';
import DespesasVeiculo from '../components/expense';
import Cadastro from '../components/cadastro';
import Combustivel from '../components/combustivel';
import ListaVeiculos from '../components/listaVeiculos';
import ListarDespesas from '../components/listarDespesas';
import ListaCombustivel from '../components/listaCombustivel';
const HomePage: React.FC = () => {
    const [mostrarComissao, setMostrarComissao] = useState(false);
    const [mostrarDespesa, setMostrarDespesa] = useState(false);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [mostrarCombustivel, setMostrarCombustivel] = useState(false);
    const [mostrarSubMenuVeiculo, setMostrarSubMenuVeiculo] = useState(false);
    const [mostrarSubMenuDespesas, setMostrarSubMenuDespesas] = useState(false);
    const [mostrarSubMenuCombustivel, setMostrarSubMenuCombustivel] = useState(false);
    const [mostrarListaVeiculo, setMostrarListaVeiculo] = useState(false);
    const [mostrarListaDespesas, setMostrarListaDespesas] = useState(false);
    const [mostrarAdicionarDespesas, setAdicionarDespesas] = useState(false);
    const [mostrarListaCombustivel, setMostrarListaCombustivel] = useState(false);

    const toggleComissao = () => {
        setMostrarComissao(!mostrarComissao);
        setMostrarDespesa(false);
        setMostrarCadastro(false);
        setMostrarCombustivel(false);
    };
    const toggleCadastro =()=>{
        setMostrarCadastro(!mostrarCadastro);
        setMostrarCombustivel(false);
        setMostrarComissao(false);
        setMostrarDespesa(false);
  
    }
    const toggleCombustivel = () => {
        setMostrarCombustivel(!mostrarCombustivel);
        setMostrarCadastro(false);
        setMostrarComissao(false);
        setMostrarDespesa(false);
    }
    const toggleListarVeiculo = () =>{
        setMostrarListaVeiculo(!mostrarListaVeiculo);
    }
    const toggleListarDespesas = () =>{
        setMostrarListaDespesas(!mostrarListaDespesas);
    }
    const toggleAdicionarDespesas = () =>{
        setAdicionarDespesas(!mostrarAdicionarDespesas);
    }
    const toggleListaCombustivel = () =>{
        setMostrarListaCombustivel(!mostrarListaCombustivel);
    }
    const toggleSubMenuVeiculo = ()=>{
        setMostrarSubMenuVeiculo(!mostrarSubMenuVeiculo)
    }
    const toggleSubMenuDespesas = ()=>{
        setMostrarSubMenuDespesas(!mostrarSubMenuDespesas)
        setMostrarComissao(false);
        setMostrarCadastro(false);
        setMostrarCombustivel(false);
    }
    const toggleSubMenuCombustivel =()=>{
        setMostrarSubMenuCombustivel(!mostrarSubMenuCombustivel);
    }

    return (
        <div className="container">
            {/* Menu lateral */}
            <div className="menu">
                <h2>Menu</h2>
                <ul>
                <li onClick={toggleSubMenuVeiculo}>Cadastro</li>
                {mostrarSubMenuVeiculo && (
                    <ul>
                        <sub onClick={toggleCadastro}>Cadastrar Veiculo</sub>
                        <sub onClick={toggleListarVeiculo}>Listar Veiculos</sub>
                        {/* Adicione outras opções de cadastro aqui */}
                    </ul>
                )}
                    <li onClick={toggleComissao}>Comissão</li>
                    <li onClick={toggleSubMenuDespesas}>Despesas</li>
                    {mostrarSubMenuDespesas && (
                        <ul>
                        <sub onClick={toggleListarDespesas}>Listar Despesas</sub>
                        <sub onClick={toggleAdicionarDespesas}>Adicionar Despesas</sub>
                        </ul>
                    )

                    }
                    <li onClick={toggleSubMenuCombustivel}>Combustivel</li>
                    {mostrarSubMenuCombustivel && (

                        <ul>
                            <sub onClick={toggleCombustivel}>Adicionar Combustivel</sub>
                            <sub onClick={toggleListaCombustivel}>Listar Abastecimento</sub>
                        </ul>
                    )}
                    
                    
                    {/* Adicione outras opções de menu aqui */}
                </ul>
            </div>
            
            {/* Conteúdo principal */}
            <div className="content">
                <h1>Página Home</h1>
                {/* Renderiza o componente CalculadoraComissao se mostrarComissao for true */}
                {mostrarComissao && <CalculadoraComissao />}
                {mostrarAdicionarDespesas && <DespesasVeiculo/>}
                {mostrarCadastro && <Cadastro/>}
                {mostrarCombustivel && <Combustivel/>}
                {mostrarListaVeiculo && <ListaVeiculos/>}
                {mostrarListaDespesas&& <ListarDespesas/>}
                {mostrarListaCombustivel && <ListaCombustivel/>}
                
                {/* Outros componentes ou conteúdo da página */}
            </div>
        </div>
    );
};

export default HomePage;
