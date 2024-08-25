const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const bodyParser = require('body-parser');

dotenv.config();

connectDB();

const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
