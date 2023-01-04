const express = require('express')
const authRoutes = require('./src/routes/authRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const userRoutes = require('./src/routes/userRoutes')
const SECRET = require('./src/config/keys')
const cors = require('cors')
const db = require('./src/config/db')
const app = express() 

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//   if (req.method == "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }

//   next();
// });

app.use('/auth' , authRoutes)
app.use('/admin', adminRoutes)
app.use('/Quiz', userRoutes)

// app.get('/' , (req,res)=>{
//     return res.status(200).json({
//         "status" : "OK"
//     })
// })

// app.get('/test' , (req,res)=>{
//   return res.status(200).json({
//       "status" : "OK_tested"
//   })
// })

// if(process.env.NODE_ENV == 'production'){
  const path = require('path')

  app.use(express.static(path.join(__dirname, "frontend", "build")));

  app.get('*' , (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'./frontend' , 'build' ,'index.html'))
  })
  
  
// }else{
//   module.exports = require('./src/config/dev')
// }




app.listen(`${PORT}` , (req,res)=>{
  const path = require('path')
  let p = path.resolve(__dirname , '..' , 'frontend' , 'build')

  console.log(p);
    console.log(`server is running at PORT ${PORT} `)
    db()
  
})



