
const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const uri =
'mongodb+srv://tanhaa:nS0LMYF8NHW7mZO6@cluster0a.mscbtrh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await client.connect();
const database=client.db("insertDB");
const imageCollection=database.collection("user");

    app.post('/upload',async(req,res)=>{
      const user=req.body;
      console.log('user',user);
      const result=await imageCollection.insertOne(user);
      res.send(result);
    })

    app.get('/upload',async(req,res)=>{
      const cursor=imageCollection.find();
      const result=await cursor.toArray();
      res.send(result) ;
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('This is life');
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
