const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();

const uri = "mongodb+srv://Assignment2:Harshsharma2611@assignment2.vvm0a29.mongodb.net/Assignment2?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected correctly to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
