const service = require("../services/pacientes.service");

const create = (req, res) => {
    const paciente = service.createPaciente(req.body);
    return res.status(201).json(paciente);
};

const getAll = (req, res) => {
    return res.json(service.getAllPaciente());
};

const getById = (req, res) => {
    const paciente = service.getPacienteById(req.params.id);
    if(!Paciente) return res.status(404).json({ message: "Not Found"});

    return res.json(update);
};


const Delete =(req, res) =>{
    const Delete = service.deletePaciente(req.params.id);
    if(!Deleted) return res.status(404).json({ message: "Not Found"});

    return res.status(204).send();
};



module.export = {
    create,
    getAll,
    getById,
    update,
    Delete
};