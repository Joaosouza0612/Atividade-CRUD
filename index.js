import express from 'express';

const app = express();
app.use(express.json());

app.get('/hello/:nome', (req, res) => {
    const nome = req.params.nome
    res.send(`Hello ${nome}!`);
});

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`)
});