const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://umer:UmEr121820@ocr.5akbp23.mongodb.net/?appName=OCR";
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await client.connect();
        const database = client.db('OCR_Data');
        const collection = database.collection('scanned_addresses');
        
        const result = await collection.insertOne(req.body);
        res.status(200).json({ success: true, id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}