//Dependencies
const express = require('express');
const graphlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');

//Schema
const schema = require('./server/graphql/schema');

const app = express();

// Allow cross-origin
app.use(cors());

app.use(
  '/graphql',
  graphlHTTP({
    schema,
    graphiql: false
  })
);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));