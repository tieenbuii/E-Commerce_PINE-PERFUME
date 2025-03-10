const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use('/',(req, res) => { res.send('SEVER ONNN')})

app.listen(port, () => {
    console.log('Server running on the port: ' + port)
})