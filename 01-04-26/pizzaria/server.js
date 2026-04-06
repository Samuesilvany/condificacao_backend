import express from 'express';

const app = express();

app.use(express.json());

import router from './routes/pizzas.js';
app.use('/api/pizzas', router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

