import { Router } from "express";
import multer from "multer";
import { 
  readMotos, 
  writeMotos, 
  generateId, 
  fuzzySearch 
} from "../utils/helpers.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
import { validateMoto } from "../middleware/validate.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

// GET /api/motos - Paginação, filtros, ordenação, busca fuzzy
router.get("/", async (req, res) => {
  try {
    const motos = readMotos();
    let filtered = motos;

    // Filtros
    if (req.query.marca) filtered = filtered.filter(m =>
      m.marca.toLowerCase().includes(req.query.marca.toLowerCase())
    );
    if (req.query.tipo) filtered = filtered.filter(m => m.tipo === req.query.tipo);
    if (req.query.preco_min) filtered = filtered.filter(m => m.preco >= parseFloat(req.query.preco_min));
    if (req.query.preco_max) filtered = filtered.filter(m => m.preco <= parseFloat(req.query.preco_max));
    if (req.query.disponivel !== undefined) filtered = filtered.filter(m => m.disponivel === (req.query.disponivel === "true"));

    // Busca fuzzy
    if (req.query.q) filtered = await fuzzySearch(filtered, req.query.q);

    // Ordenação
    const sortBy = req.query.sortBy || "createdAt";
    const sortDir = req.query.sortDir === "asc" ? 1 : -1;
    filtered.sort((a, b) => (a[sortBy] > b[sortBy] ? -sortDir : sortDir));

    // Paginação
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    res.json({
      motos: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/motos/:id
router.get("/:id", async (req, res) => {
  try {
    const motos = readMotos();
    const moto = motos.find(m => m.id === req.params.id);
    if (!moto) return res.status(404).json({ error: "Moto não encontrada" });
    res.json(moto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/motos
router.post("/", authenticateToken, upload.single("imagem"), validateMoto, async (req, res) => {
  try {
    const motos = readMotos();
    const newMoto = {
      id: generateId(),
      ...req.body,
      imagem_url: req.file ? `/uploads/${req.file.filename}` : "",
      disponivel: true,
      createdAt: new Date().toISOString()
    };
    motos.unshift(newMoto);
    writeMotos(motos);
    res.status(201).json(newMoto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/motos/:id
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const motos = readMotos();
    const index = motos.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Moto não encontrada" });

    motos[index] = { ...motos[index], ...req.body };
    writeMotos(motos);
    res.json(motos[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/motos/:id
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const motos = readMotos();
    const index = motos.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Moto não encontrada" });

    motos.splice(index, 1);
    writeMotos(motos);
    res.json({ message: "Moto deletada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
