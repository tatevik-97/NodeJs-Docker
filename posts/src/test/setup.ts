import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.NODE_ENV = 'test'
    process.env.JWT_KEY = 'test_key'
    process.env.JWT_EXPIRATION = '15m'

    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()
    await mongoose.connect(mongoUri)
})


beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        await collection.deleteMany({})
    }

    jest.clearAllMocks()
    jest.resetAllMocks()
    jest.restoreAllMocks()
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
});
