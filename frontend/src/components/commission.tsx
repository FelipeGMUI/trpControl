import React, { useState } from 'react';

const CalculadoraComissao: React.FC = () => {
    const [valorFrete, setValorFrete] = useState<string>('');
    const [comissao, setComissao] = useState<number>(0);

    const calcularComissao = (): void => {
        // Verifica se o valor do frete é um número válido
        if (!isNaN(parseFloat(valorFrete)) && valorFrete !== '') {
            // Imposto de 13%
            const imposto: number = parseFloat(valorFrete) * 0.13;
            const valorLiquido: number = parseFloat(valorFrete) - imposto;

            // Comissão do motorista de 11%
            const comissaoMotorista: number = valorLiquido * 0.11;

            setComissao(Number(comissaoMotorista.toFixed(2))); // Define a comissão com 2 casas decimais
        } else {
            // Se o valor do frete não for válido, define a comissão como 0
            setComissao(0);
        }
    };

    return (
        <div>
            <h2>Calculadora de Comissão</h2>
            <div>
                <label htmlFor="valorFrete">Valor do Frete: </label>
                <input
                    type="text"
                    id="valorFrete"
                    value={valorFrete}
                    onChange={(e) => setValorFrete(e.target.value)}
                />
                <button onClick={calcularComissao}>Calcular</button>
            </div>
            <div>
                <h3>Comissão: R$ {comissao}</h3>
            </div>
        </div>
    );
};

export default CalculadoraComissao;
