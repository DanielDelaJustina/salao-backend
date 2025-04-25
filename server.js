// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados iniciais
let agendas = [
  { 
    id: 1, 
    cliente: 'João', 
    servico: 'Corte de cabelo', 
    dataHora: new Date().toISOString() 
  },
  { 
    id: 2, 
    cliente: 'Maria', 
    servico: 'Manicure', 
    dataHora: new Date().toISOString() 
  },
  { 
    id: 3, 
    cliente: 'Pedro', 
    servico: 'Barba', 
    dataHora: new Date(Date.now() + 86400000).toISOString() // Amanhã
  }
];

// Rotas
app.get('/api/agendas', (req, res) => {
  res.json(agendas);
});

app.get('/api/agendas/:id', (req, res) => {
  const agenda = agendas.find(a => a.id === parseInt(req.params.id));
  if (!agenda) return res.status(404).send('Agenda não encontrada');
  res.json(agenda);
});

app.post('/api/agendas', (req, res) => {
  const novaAgenda = {
    id: agendas.length + 1,
    ...req.body,
    dataHora: new Date(req.body.dataHora).toISOString() || new Date().toISOString()
  };
  agendas.push(novaAgenda);
  res.status(201).json(novaAgenda);
});

app.put('/api/agendas/:id', (req, res) => {
  const agenda = agendas.find(a => a.id === parseInt(req.params.id));
  if (!agenda) return res.status(404).send('Agenda não encontrada');

  Object.assign(agenda, req.body);
  if (req.body.dataHora) {
    agenda.dataHora = new Date(req.body.dataHora).toISOString();
  }

  res.json(agenda);
});

app.delete('/api/agendas/:id', (req, res) => {
  agendas = agendas.filter(a => a.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});