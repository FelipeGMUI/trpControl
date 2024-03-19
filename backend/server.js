const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Use o middleware cors corretamente
app.use(cors());
app.use(express.json());

const port = 3001;

const db = new sqlite3.Database('../data/database.db'); // Conecta-se ao arquivo .db

// Criação das tabelas (se necessário)
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS veiculos (id INTEGER PRIMARY KEY, motorista TEXT, placa TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS despesas (id INTEGER PRIMARY KEY, nome TEXT, valor REAL, veiculoId INTEGER, FOREIGN KEY (veiculoId) REFERENCES veiculos(id))');
    db.run('CREATE TABLE IF NOT EXISTS abastecimentos (id INTEGER PRIMARY KEY, veiculoId INTEGER, litragem REAL, valorTotal REAL, dataAbastecimento TEXT)');

});

// Rotas CRUD para veículos
app.get('/veiculos', (req, res) => {
    db.all('SELECT * FROM veiculos', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
});

app.post('/veiculos', (req, res) => {
    const { motorista, placa } = req.body;
    db.run('INSERT INTO veiculos (motorista, placa) VALUES (?, ?)', [motorista, placa], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'Veículo cadastrado com sucesso', id: this.lastID });
    });
});

// Rotas CRUD para despesas
app.get('/despesas', (req, res) => {
    db.all('SELECT * FROM despesas', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
});

app.post('/despesas', (req, res) => {
    const { nome, valor, veiculoId, dataCadastro } = req.body;
    db.run('INSERT INTO despesas (nome, valor, veiculoId, dataCadastro) VALUES (?, ?, ?, ?)', [nome, valor, veiculoId, dataCadastro], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({ message: 'Despesa cadastrada com sucesso' });
    });
  });
  // Rota para obter todos os abastecimentos
app.get('/abastecimentos', (req, res) => {
    db.all('SELECT * FROM abastecimentos', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
});

// Rota para adicionar um novo abastecimento
app.post('/abastecimentos', (req, res) => {
    const { veiculoId, litragem, valorTotal, hodometro, dataAbastecimento } = req.body;

    db.run('INSERT INTO abastecimentos (veiculoId, litragem, valorTotal, hodometro, dataAbastecimento) VALUES (?, ?, ?, ?, ?)',
        [veiculoId, litragem, valorTotal, hodometro, dataAbastecimento],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ message: 'Abastecimento registrado com sucesso', id: this.lastID });
        });
});


// Outras rotas CRUD para atualização (PUT), exclusão (DELETE), etc. podem ser adicionadas aqui

app.listen(port, () => {
    console.log(`Servidor backend está rodando na porta ${port}`);
});
