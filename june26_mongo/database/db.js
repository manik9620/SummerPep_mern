const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
    "mongodb+srv://<username>:<password>@nodepractice.hcpg4zr.mongodb.net/<dbname>?appName=Nodepractice";

let dbURL = uri;
dbURL = dbURL.replace("<username>", process.env.DB_USERNAME);
dbURL = dbURL.replace("<password>", process.env.DB_PASSWORD);
dbURL = dbURL.replace("<dbname>", process.env.DB_NAME);

const client = new MongoClient(dbURL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const database = client.db(process.env.DB_NAME);
const productsCollection = database.collection("products");

module.exports = {
    database,
    productsCollection,
};