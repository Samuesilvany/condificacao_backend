
import express from 'express';


app.use(express.json());


const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require("express");
const app = express();


app.use(express.json());

const pacienteRoutes = require("./routes/pacientes.routes");


app.use("/pacientes", pacienteRoutes);


app.listen(3000, () => console.log("Rodandooo"));


