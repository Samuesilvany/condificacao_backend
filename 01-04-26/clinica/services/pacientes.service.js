const pacientes = require ("../data/pacientes");
const {randomUUID} =require("crypto");

function create(paciente){
    const novoPaciente = {id: randomUUID(), ... paciente};
    paciente.push(novopaciente);
    return novoPaciente;
}

function getAll(){
    return pacientes;
}

function getById(id){
    return pacientes.find(p =>p.id ===id);
}


function update (id, data) {
    const index = pacientes.findIndex(p =>p.id===id);
    if (index === -1) return null;
    pacientes[index] = {...pacientes[index], ...data};
    return pacientes[index];
}

module.exports ={
    create,
    getAll,
    getById,
    update,
    Delete
};
