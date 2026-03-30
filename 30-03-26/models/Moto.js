import mongoose from 'mongoose';

const motoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: String,
    required: true,
    trim: true
  },
  ano: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  cilindradas: {
    type: Number,
    min: 50
  },
  tipo: {
    type: String,
    enum: ['street', 'sport', 'cruiser', 'touring', 'off-road'],
    default: 'street'
  },
  preco: {
    type: Number,
    required: true,
    min: 0
  },
  cor: {
    type: String,
    trim: true
  },
  kmRodados: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Moto', motoSchema);
