

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


let fruta = [
  { id: 1, nome: "Morango" },
  { id: 2, nome: "Uva" },
  { id: 3, nome: "Melancia" }
];


app.get('/fruta/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const fruta = fruta.find(f => f.id === id);

  if (!fruta) {
    return res.status(404).json({
      success: false,
      message: 'Fruta não encontrada'
    });
  }

  res.json({
    success: true,
    data: fruta
  });

});


app.post('/fruta', (req, res) => {

  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      success: false,
      message: 'O nome é obrigatório'
    });
  }

  const newFruta = {
    id: fruta.length + 1,
    nome
  };

  fruta.push(newFruta);

  res.status(201).json({
    success: true,
    data: newFruta,
    message: 'Fruta criada'
  });

});


app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

