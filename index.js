const express = require('express');
const app = express();
const employees = require('./Employees');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setting up routes
app.use('/api/employees', require('./routes/api/employees'))




const PORT = process.env.PORT || 3000; //in dev

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// http://localhost:3000/api/employees