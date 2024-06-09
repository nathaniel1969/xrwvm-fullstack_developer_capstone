/*jshint esversion: 8 */

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3050;

app.use(cors());
app.use(express.urlencoded({extended: false}));

const carsData = JSON.parse(fs.readFileSync('car_records.json', 'utf8'));

mongoose.connect('mongodb://mongo_db:27017/', {dbName: 'dealershipsDB'});


const Cars = require('./inventory');

try {

    Cars.deleteMany({}).then(() => {
        Cars.insertMany(carsData.cars);
    });
} catch (error) {
    console.error(error);
    // Handle errors properly here
}app.get('/', async (req, res) => {
    res.send('Welcome to the Mongoose API');
});


app.get('/cars/:id', async (req, res) => {
    try {
        const documents = await Cars.find({dealer_id: req.params.id});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching reviews'});
    }
});

app.get('/carsbymake/:id/:make', async (req, res) => {
    try {
        const documents = await Cars.find({dealer_id: req.params.id, make: req.params.make});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching reviews by car make and model'});
    }
});

app.get('/carsbymodel/:id/:model', async (req, res) => {
    try {
        const documents = await Cars.find({dealer_id: req.params.id, model: req.params.model});
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching dealers by ID'});
    }
});


app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
    try {
        let mileage = parseInt(req.params.mileage);
        if (isNaN(mileage)) {
            return res.status(400).json({error: 'Invalid mileage parameter'});
        }

        let condition = {};

        if (mileage <= 50000) {
            condition = {
                $lte: 50000
            };
        } else if (mileage > 50000 && mileage <= 100000) {
            condition = {
                $gt: 50000,
                $lte: 100000
            };
        } else if (mileage > 100000 && mileage <= 150000) {
            condition = {
                $gt: 100000,
                $lte: 150000
            };
        } else if (mileage > 150000 && mileage <= 200000) {
            condition = {
                $gt: 150000,
                $lte: 200000
            };
        } else if (mileage > 200000) {
            condition = {
                $gt: 200000
            };
        }

        const documents = await Cars.find({dealer_id: req.params.id, mileage: condition});

        res.json(documents);
    } catch (error) {
        console.error('Error fetching cars by mileage:', error);
        res.status(500).json({error: 'Error fetching cars by mileage'});
    }
});


app.get('/carsbyprice/:id/:price', async (req, res) => {
    try {
        let price = parseInt(req.params.price);
        if (isNaN(price)) {
            return res.status(400).json({ error: 'Invalid price parameter' });
        }

        let condition = {};

        if (price <= 20000) {
            condition = { $lte: 20000 };
        } else if (price > 20000 && price <= 40000) {
            condition = { $gt: 20000, $lte: 40000 };
        } else if (price > 40000 && price <= 60000) {
            condition = { $gt: 40000, $lte: 60000 };
        } else if (price > 60000 && price <= 80000) {
            condition = { $gt: 60000, $lte: 80000 };
        } else if (price > 80000) {
            condition = { $gt: 80000 };
        }

        const documents = await Cars.find({
            dealer_id: req.params.id,
            price: condition
        });

        res.json(documents);
    } catch (error) {
        console.error('Error fetching cars by price:', error);
        res.status(500).json({ error: 'Error fetching cars by price' });
    }
});


app.get('/carsbyyear/:id/:year', async (req, res) => {
    try {
        const documents = await Cars.find({
            dealer_id: req.params.id,
            year: {
                $gte: req.params.year
            }
        });
        res.json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching dealers by ID'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
