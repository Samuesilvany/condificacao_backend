import { Router } from 'express';
import {
  getAllMotos,
  getMotoById,
  createMoto,
  updateMoto,
  deleteMoto
} from '../controllers/motoController.js';

const router = Router();

router.get('/', getAllMotos);
router.get('/:id', getMotoById);
router.post('/', createMoto);
router.put('/:id', updateMoto);
router.delete('/:id', deleteMoto);

export default router;
