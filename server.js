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
  

app.use('/auth' , authRoutes)
app.use('/admin', adminRoutes)
app.use('/Quiz', userRoutes)


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



