import Moto from '../models/Moto.js';


export const getAllMotos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      marca,
      tipo,
      preco_min,
      preco_max
    } = req.query;

    const filter = {};
    if (marca) filter.marca = { $regex: marca, $options: 'i' };
    if (tipo) filter.tipo = tipo;
    if (preco_min || preco_max) {
      filter.preco = {};
      if (preco_min) filter.preco.$gte = Number(preco_min);
      if (preco_max) filter.preco.$lte = Number(preco_max);
    }

    const motos = await Moto.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Moto.countDocuments(filter);

    res.json({
      motos,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMotoById = async (req, res) => {
  try {
    const moto = await Moto.findById(req.params.id);
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.json(moto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createMoto = async (req, res) => {
  try {
    const moto = new Moto(req.body);
    await moto.save();
    res.status(201).json(moto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateMoto = async (req, res) => {
  try {
    const moto = await Moto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.json(moto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteMoto = async (req, res) => {
  try {
    const moto = await Moto.findByIdAndDelete(req.params.id);
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.json({ message: 'Moto deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
