import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const URI = process.env.MONGO_DB;
const client = new MongoClient(URI);

const conectar = async () => {
    if (global.conexaoMongo && global.conexaoMongo.state !== "disconnected") {
        return global.conexaoMongo;
    }
    try {
        const connection = await client.connect();
        global.conexaoMongo = connection;
        return connection;
    } catch (error) {
        console.error("Erro na conexão:", error);
        throw error;
    }
};

const getMovies = async (id = undefined) => {
    const conexao = await conectar();
    const colecao = conexao.db('Catalogo').collection('Filmes');
    if (!id) {
        return await colecao.find({}).toArray();
    }
    return await colecao.findOne({ _id: new ObjectId(id) });
};

const createMovie = async (movie) => {
    const conexao = await conectar();
    const res = await conexao.db('Catalogo').collection('Filmes').insertOne(movie);
    return res;
};

const updateMovie = async (id, movie) => {
    const conexao = await conectar();
    return await conexao.db('Catalogo').collection('Filmes').replaceOne(
        { _id: new ObjectId(id) }, 
        movie
    );
};

const deleteMovie = async (id) => {
    const conexao = await conectar();
    return await conexao.db('Catalogo').collection('Filmes').deleteOne({ _id: new ObjectId(id) });
};

console.log(await getMovies())

export default { getMovies, createMovie, updateMovie, deleteMovie };