const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = 3001;

app.use(express.json());
let db;

const connectToMongoDB = async () => {
    try {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017/', { useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        db = client.db('mybookdb');
    } catch (err) {
        console.error("MongoDB Connection Error: ", err);
    }
}

app.get('/', (req, res) => {
    res.send('Welcome to my book API!');
});

app.post('/books', (req, res) => {
    const book = req.body;
    db.collection('books').insertOne(book, (err, result) => {
        if (err) {
            console.error("Insert Error: ", err);
            return res.status(500).send(err);
        }
        res.status(201).send(result.ops[0]);
    });
});

app.get('/books', (req, res) => {
    db.collection('books').find({}).toArray((err, books) => {
        if (err) {
            console.error("Find Error: ", err);
            return res.status(500).send(err);
        }
        res.status(200).send(books);
    });
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
    db.collection('books').updateOne({ _id: new ObjectId(id) }, { $set: updatedBook }, (err, result) => {
        if (err) {
            console.error("Update Error: ", err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    db.collection('books').deleteOne({ _id: new ObjectId(id) }, (err, result) => {
        if (err) {
            console.error("Delete Error: ", err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});