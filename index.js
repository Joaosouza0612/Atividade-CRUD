import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

// Listar filmes
app.get('/movies/:id', async (req, res) => {
    try {
        const filmes = await db.getMovies(req.params.id);
        res.status(200).send(filmes);
    } catch (err) {
        res.status(500).send("Erro ao buscar filmes");
    }
});

// Criar filme
app.post('/movies', async (req, res) => {
    try {
        const { titulo, diretor } = req.body;
        await db.createMovie({ titulo, diretor });
        res.status(201).send("Filme criado com sucesso!");
    } catch (err) {
        res.status(500).send("Erro ao criar filme");
    }
});

// Deletar filme
app.delete('/movies/:id', async (req, res) => {
    try {
        await db.deleteMovie(req.params.id);
        res.send("Filme deletado com sucesso!");
    } catch (err) {
        res.status(400).send("ID inválido ou erro no banco");
    }
});

app.put('/movies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dadosAtualizados = req.body; 

        const resultado = await db.updateMovie(id, dadosAtualizados);

        if (resultado.matchedCount === 0) {
            return res.status(404).send("Filme não encontrado para atualizar.");
        }

        res.send("Filme atualizado com sucesso!");
    } catch (err) {
        res.status(400).send("Erro ao atualizar: ID inválido ou dados incorretos.");
    }
});

app.listen(3000, () => {
    console.log(`🎬 Servidor rodando em http://localhost:3000`);
});