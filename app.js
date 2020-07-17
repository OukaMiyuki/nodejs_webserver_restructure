const Joi = require('joi'); //capitalize the first letter of the variable name means it is a class (Joi)
const express = require('express');
const app = express();
const home = require('./Routes/home');
const manga = require('./Routes/manga');

app.use(express.json()); //enable json parsing for expressjs because it's not enabled by default
app.use('/api/manga', manga);
app.use('/', home);
  
const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});