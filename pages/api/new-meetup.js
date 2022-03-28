// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(process.env.DB_API);

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const insertedDataRes = await meetupsCollection.insertOne(data);
    console.log(insertedDataRes);

    client.close();

    res
      .status(201)
      .json({ message: 'Meetup inserted!', id: insertedDataRes.insertedId });
  }
}

export default handler;
