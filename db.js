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
