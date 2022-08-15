let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors')
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
//let mongoUrl = process.env.MonogUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;




//middleware (supporting lib)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

///apis
app.get('/',(req,res) => {
    res.send('Express Server default')
})

//api

app.get('/',(req,res) => {
  res.send('Express Server default')
})


// app.get('/recipe',(req,res) => {
//   db.collection('recipe').find().toArray((err,result) => {
//      if(err) throw err;
//      res.send(result)
//     })

// })

app.get('/kashmiriwazwan',(req,res) => {
  db.collection('kashmiriwazwan').find().toArray((err,result) => {
     if(err) throw err;
     res.send(result)
    })

})

app.get('/franchise',(req,res) => {
  db.collection('franchise').find().toArray((err,result) => {
     if(err) throw err;
     res.send(result)
    })

})

app.get('/coffee',(req,res) => {
  db.collection('coffee').find().toArray((err,result) => {
     if(err) throw err;
     res.send(result)
    })

})




app.get('/restaurantmenu',(req,res) => {
  db.collection('restaurantmenu').find().toArray((err,result) => {
     if(err) throw err;
     res.send(result)
    })

})

app.get('/menu',(req,res) => {
  db.collection('menu').find().toArray((err,result) => {
     if(err) throw err;
     res.send(result)
    })

})


///filter api

app.get(`/filter/:menu_price`,(req,res) => {
  let sort = {cost:1}
  let menu_price = Number(req.params.menu_price)
  let menu_type  = Number(req.query.menu_type)
  let lcost = Number(req.query.lcost)
  let hcost = Number (req.query.hcost)
  let query = {}
  if(req.query.sort){
    sort={cost:req.query.sort}
  }


  if(lcost && hcost && menu_type){
    query={
      "menu_price":menu_price,
      "menu_type":menu_type,
      $and:[{cost:{$gt:lcost,$lt:hcost}}]
      
    }
  }

  else if(lcost && hcost ){
    query={
      "menu_price":menu_price,
      $and:[{cost:{$gt:lcost,$lt:hcost}}]    
    }
  }
 
  else if(menu_type){
    query={
      "menu_price": menu_price,
      "menu_type":menu_type
    }
  }
  else{
    query={
      "menu_price":menu_price
    }
  }

  db.collection('restaurantmenu').find(query).sort(sort).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//details api

app.get('/details/:id',(req,res) => {
    let id =Number(req.params.id) 
    db.collection('restaurantmenu').find({menu_id:id}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })


  app.get('/menu/:id',(req,res) => {
    let id =Number(req.params.id) 
    db.collection('restaurantmenu').find({restaurant_id:id}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })


  app.get('/orders',(req,res) => {
    let email = req.query.email;
    let query = {}
    if(email){
      //query = {email:email}
      query = {email}
    }
    db.collection('orders').find(query).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })


  app.post('/placeOrder',(req,res) => {
    console.log(req.body)
    db.collection('orders').insert(req.body,(err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })


  app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
      {id:oid},
      {
        $set:{
          "status":req.body.status,
          "bank_name":req.body.bank_name,
          "date":req.body.date
        }
      },(err,result) => {
        if(err) throw err;
        res.send('Order Updated')
      }
    )
})

app.delete('/deleteOrder/:id',(req,res) => {
    let oid =  mongo.ObjectId(req.params.id)
    db.collection('orders').remove({_id:oid},(err,result) => {
      if(err) throw err;
      res.send('Order Deleted')
    })
})
   
  
//Connection with db
  MongoClient.connect(mongoUrl,(err,client) => {
     if(err) console.log(`Error While Connecting`);
     db = client.db('Tokdb');
     app.listen(port,(err) => {
     if(err) throw err;
     console.log(`Express Server listening on port ${port}`)
    })
  })

 


 