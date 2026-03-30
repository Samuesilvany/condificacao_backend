import Joi from "joi";

const motoSchema = Joi.object({
  marca: Joi.string().min(2).max(50).required(),
  modelo: Joi.string().min(2).max(100).required(),
  ano: Joi.number().min(1900).max(2030).required(),
  cilindradas: Joi.number().min(50),
  tipo: Joi.string().valid("street", "sport", "cruiser", "touring", "off-road"),
  preco: Joi.number().min(0).required(),
  cor: Joi.string().max(30),
  kmRodados: Joi.number().min(0),
  disponivel: Joi.boolean(),
  imagem_url: Joi.string().uri().allow("")
});

export const validateMoto = (req, res, next) => {
  const { error } = motoSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
