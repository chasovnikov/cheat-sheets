import express from 'express';

const app = express();

// GET
app.get('/', (req, res) => {
    console.log(req.query);
    res.status(200).json('Сервер работает');
});
app.listen(PORT, () => console.log('server started on port ' + PORT));

// POST
app.use(express.json());
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json('Сервер работает');
});
app.listen(PORT, () => console.log('server started on port ' + PORT));
