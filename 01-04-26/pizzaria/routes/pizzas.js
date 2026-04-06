import { Router } from 'express';

const router = Router();


let pizzas = [
  {
    id: 1,
    name: 'Margherita',
    price: 25.0,
    ingredients: ['tomate', 'mussarela', 'manjericão']
  },
  {
    id: 2,
    name: 'Calabresa',
    price: 28.0,
    ingredients: ['calabresa', 'cebola', 'queijo']
  },
  {
    id: 3,
    name: 'Quatro Queijos',
    price: 32.0,
    ingredients: ['gorgonzola', 'provolone', 'mussarela', 'parmesão']
  }
];


router.post('/', (req, res) => {
  const { name, price, ingredients } = req.body;

  if (!name || !price || !ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Name, price (number), and ingredients (array) are required' });
  }

  const newPizza = {
    id: Date.now(),
    name,
    price: parseFloat(price),
    ingredients
  };

  pizzas.push(newPizza);
  res.status(201).json(newPizza);
});


router.get('/', (req, res) => {
  res.json(pizzas);
});


router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pizza = pizzas.find(p => p.id === id);

  if (!pizza) {
    return res.status(404).json({ error: 'Pizza not found' });
  }

  res.json(pizza);
});

router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pizzaIndex = pizzas.findIndex(p => p.id === id);

  if (pizzaIndex === -1) {
    return res.status(404).json({ error: 'Pizza not found' });
  }

  const updates = req.body;
  pizzas[pizzaIndex] = { ...pizzas[pizzaIndex], ...updates };

  res.json(pizzas[pizzaIndex]);
});


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pizzaIndex = pizzas.findIndex(p => p.id === id);

  if (pizzaIndex === -1) {
    return res.status(404).json({ error: 'Pizza not found' });
  }

  pizzas.splice(pizzaIndex, 1);
  res.status(204).send();
});

export default router;

