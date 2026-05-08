import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const URI = process.env.MONGO_DB;
const client = new MongoClient(URI);

const conectar = async () => {
    if (global.conexaoMongo && global.conexaoMongo.state !== "disconnected") {
        return global.conexaoMongo;
    } else {
        try {
            const db = await client.connect();
            global.conexaoMongo = db;
            return db;
        
        } catch (error){
            console.error(error);
        }
    }
}

const getUser = async (id=undefined) => {
    try {
        const conexao = await conectar();
        let resultado = [];
    
        if (!id){
            resultado = await conexao.db('Usuarios').collection('Usuario').find({}).toArray();
        } else {
            resultado = await conexao.db('Usuarios').collection('Usuario').findOne({_id: new ObjectId(id)});
        }
    
        await conexao.close();
        return resultado;
    
    } catch (e) {
        console.error(e);
    }
};

const createUser = async (user) => {
    try {
        const conexao = await conectar();
        await conexao.db('Usuarios').collection('Usuario').insertOne(user);
        await conexao.close();
        return `Usuário ${user.nome} adicionado ao MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const attUser = async (user, id) => {
    try {
        const conexao = await conectar();
        await conexao.db('Usuarios').collection('Usuario').replaceOne({_id: new ObjectId(id)}, user);
        await conexao.close();
        return `Usuário ${user.nome} atualizado no MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const deleteUser = async (id) => {
    try {
        const conexao = await conectar();
        await conexao.db('Usuarios').collection('Usuario').deleteOne({_id: new ObjectId(id)});
        await conexao.close();
        return `Usuário ${id} deletado do MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const db = {getUser, createUser, attUser, deleteUser};
export default db;