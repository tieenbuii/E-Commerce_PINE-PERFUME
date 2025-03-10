const express = require('express');
const app = express();
const dotenv =  require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes/indexRoutes');
const { init } = require('./models/userModel');

const port = process.env.PORT || 3000

app.use(express.json());

app.use(cors());

dotenv.config();

app.use(express.urlencoded({extended : true}))
dbConnect();
initRoutes(app);

app.use('/',(req, res) => { res.send('SEVER ONNN')})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);   
});