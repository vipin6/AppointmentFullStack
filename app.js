
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database'); 
const userRoutes = require('./routes/customer');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


sequelize
  .sync()
  .then(result => {
    console.log('Database synchronized successfully.');
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch(err => {
    console.log('Error synchronizing the database:', err);
  });
