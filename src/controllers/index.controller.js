const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'dingo',
    port: '5595',
});

const getClientes = async (req, res) => {
    const response = await pool.query('SELECT * FROM clientes ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getClienteById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    res.json(response.rows);
};

const createCliente = async (req, res) => {
    const { nome, email } = req.body;
    const response = await pool.query("INSERT INTO clientes (id, nome, email) VALUES (nextval('gen_clientes'), $1, $2)", [nome, email]);
    res.json({
        message: 'Cliente Added successfully',
        body: {
            clientes: { nome, email }
        }
    })
};

const updateCliente = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;

    const response = await pool.query('UPDATE clientes SET nome = $1, email = $2 WHERE id = $3', [
        nome,
        email,
        id
    ]);
    res.json('Cliente Updated Successfully');
};

const deleteCliente = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM clientes where id = $1', [
        id
    ]);
    res.json(`Cliente ${id} deleted Successfully`);
};

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};