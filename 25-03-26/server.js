const express = require('express');
const app = express();
const moviesRoutes = require('./routes/movies.routes');

app.use(express.json());
app.use(moviesRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});