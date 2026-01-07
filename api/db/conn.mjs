import { MongoClient } from "mongodb"

let db
if (process.env.SKIP_DB_CONNECTION === 'true' || process.env.NODE_ENV === 'test') {
  const mockData = []

  const mockCollection = {
    find: () => ({ limit: () => ({ toArray: async () => mockData }) }),
    findOne: async () => null,
    insertOne: async (doc) => ({ insertedId: 'mock-id', acknowledged: true }),
    findOneAndUpdate: async () => ({ value: null }),
    findOneAndDelete: async () => ({})
  };

  db = {
    collection: () => mockCollection
  }
}
else {
  const connectionString = process.env.ATLAS_URI || ""
  const client = new MongoClient(connectionString)

  let conn
  try {
    conn = await client.connect()
  } 
  catch(e) {
    console.error(e)
  }

  db = conn.db("ajj22")
}

export default db