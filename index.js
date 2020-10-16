const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 4008

// app.get('/', (req, res) => {
//   res.send("hello from db it's working working")
// })
const app = express()
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://agentUser:tomal420@cluster0.tnjvj.mongodb.net/creativeAgency?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const orderCollection = client.db("creativeAgency").collection("order");
  const serviceCollection = client.db("creativeAgency").collection("service");
  const adminCollection = client.db("creativeAgency").collection("admin");
  
  app.post('/addOrder', (req, res) => {
    const order = req.body;
    orderCollection.insertOne(order)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
});

app.get('/services', (req, res) => {
  orderCollection.find({})
      .toArray((err, documents) => {
          res.send(documents);
      })
})

app.post('/addService', (req, res) => {
  const service = req.body;
  serviceCollection.insertOne(service)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
});

// app.post('/addAdmin', (req, res) => {
//   const email = req.body;
//   serviceCollection.insertOne(email)
//       .then(result => {
//           res.send(result.insertedCount > 0)
//       })
// });

app.post('/addReview', (req, res) => {
  const review = req.body;
  serviceCollection.insertOne(review)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
});

app.post('/isAdmin', (req, res) => {
  const email = req.body.email;
  adminCollection.find({ email: email })
      .toArray((err, admin) => {
          res.send(admin.length > 0);
      })
});

app.post('/addAdmin', (req, res) => {
  const admin = req.body;
  adminCollection.insertOne(admin)
  .then(result => {
      res.send(result.insertedCount > 0)
  })
});


});
app.listen(process.env.PORT || port)
