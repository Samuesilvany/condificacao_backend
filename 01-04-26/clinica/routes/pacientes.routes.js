const express = require("express");
const router = express.Router();
const controller = require("../controller/paciente.controlle");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/id:", controller.getById);
router.patch("/id:", controller.update);
router.delete("/id:", controller.remove);

module.export = router;
