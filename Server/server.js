const express =require("express");
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app=express();
app.use(cors());
app.use(bodyParser.json());


//DATABASE CONNECTION
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root', // Use your MySQL credentials
    password: 'stefan.manci',
    database: 'cineplay'
  });
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

//ROUTES
app.post("/comments",(req,res)=>{
    const {name,movie,text,date}=req.body;

    const query ='INSERT INTO comments(user_sub,movie_title,comment,comment_date) VALUES(?,?,?,?)'
    db.execute(query, [name,movie,text,date], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ message: 'Error inserting data' });
        }
        
        console.log('Data inserted:', result);
        res.json({ message: 'Form submitted successfully!' });
      });
});
app.get("/comments", (req, res) => {
  const query = 'SELECT * FROM comments ORDER BY comment_date DESC';

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching comments:', err);
          return res.status(500).json({ message: 'Error fetching comments' });
      }

      res.json(results);
  });
});

app.post("/watched",(req,res)=>{
    const {name,movie,date}=req.body;

    const query='INSERT INTO watched(user_sub,movie_title,watch_date) VALUES(?,?,?)'
    db.execute(query,[name,movie,date],(err,result)=>{
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
          }
          console.log('Data inserted:', result);
        res.json({ message: 'Form submitted successfully!' });
    });
})
app.get("/watched",(req,res)=>{

  const query='SELECT * FROM watched';

  db.query(query,(err,results)=>{
    if(err){
      console.error('Error fetching watched movies:',err);
      return res.status(500).json({message: "Error fetching watched movies"});
    }

    res.json(results);
  })


})
app.post("/bought",(req,res)=>{
  const {name,movie,date,method}=req.body;
  const query='INSERT INTO bought(user_sub,movie_title,purchase_date,payment_method) VALUES(?,?,?,?)'

  db.execute(query,[name,movie,date,method],(err,result)=>{
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }
    console.log('Data inserted:', result);
  res.json({ message: 'Form submitted successfully!' });
  });
});
app.get("/bought",(req,res)=>{

  const query='SELECT * FROM bought';

  db.query(query,(err,results)=>{
    if(err){
      console.error('Error fetching bought movies:',err);
      return res.status(500).json({message: "Error fetching watched movies"});
    }

    res.json(results);
  })


})

app.post("/favourites",(req,res)=>{
  const {name,movie,date}=req.body;

  const query='INSERT INTO favourites(user_sub,movie_title,added_date) VALUES(?,?,?)'

  db.execute(query,[name,movie,date],(err,result)=>{
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }
    console.log('Data inserted:', result);
  res.json({ message: 'Form submitted successfully!' });
  });
});
app.get("/favourites",(req,res)=>{

  const query='SELECT * FROM favourites';

  db.query(query,(err,results)=>{
    if(err){
      console.error('Error fetching favourite movies:',err);
      return res.status(500).json({message: "Error fetching watched movies"});
    }

    res.json(results);
  })


})

app.post("/rented",(req,res)=>{
  const {name,movie,date,method,days}=req.body;

  const query='INSERT INTO rented(user_sub,movie_title,rental_start,payment_method,rental_days) VALUES(?,?,?,?,?)'

  db.execute(query,[name,movie,date,method,days],(err,result)=>{
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }
    console.log('Data inserted:', result);
  res.json({ message: 'Form submitted successfully!' });
  });
});
app.get("/rented",(req,res)=>{

  const query='SELECT * FROM rented';

  db.query(query,(err,results)=>{
    if(err){
      console.error('Error fetching rented movies:',err);
      return res.status(500).json({message: "Error fetching watched movies"});
    }

    res.json(results);
  })


})
//SERVER INITIATION
app.listen(3000,()=>{
    console.log("Server up and Running!");
})


