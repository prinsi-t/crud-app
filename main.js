require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient





const mongoURI = process.env.MONGODB_URI;

MongoClient.connect(mongoURI)
.then(client => {
  //console.log('Connected to database');
  const db = client.db('star-wars-quotes')  
  const quotesCollection = db.collection('quotes')

  app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  //res.send('Hello World!');
  //res.sendFile(__dirname + '/index.html');
   //const cursor = db.collection('quotes').find()
   //console.log(cursor)
    db.collection('quotes').find().toArray()
    .then(results => {
      //console.log(results);
      res.render('index.ejs', {quotes: results})
    })
    .catch(err => {
      console.log(err)
    });
  
});

app.post('/quotes', (req, res) => {
  quotesCollection
  .insertOne(req.body)
  .then(result => {
    //console.log(result);
    res.redirect('/');
  })
  .catch(err => {
    console.error(err)
  });

  console.log(req.body);
 
})

app.put('/quotes', (req, res) => {
  //console.log(req.body)
  quotesCollection
  .findOneAndUpdate(
    { name: 'Yoda' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    }
  )
  .then(result => {
    console.log(result)
   })
  .catch(error => console.error(error))
})

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Example app listening on port 8000!`)
})

})
.catch(err => { console.error(err) });






