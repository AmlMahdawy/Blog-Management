const express = require('express') 
const app = express();

const BlogsRoutes=require('./Routes/BlogsRoutes')


const PORT = process.env.PORT || 2025;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/blogs',BlogsRoutes)


app.listen(PORT,()=>{})