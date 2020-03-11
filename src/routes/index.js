const { Router } = require('express');
const router = Router();

const { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require('../controllers/index.controller');

router.get('/clientes', getClientes);
router.get('/clientes/:id', getClienteById);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateCliente)
router.delete('/clientes/:id', deleteCliente);

module.exports = router;