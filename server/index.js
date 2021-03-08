import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRouter from './routes/posts.js'
import dotenv from 'dotenv'



const app =  express()
app.use(cors())

dotenv.config()


app.use(bodyParser.json({limit:'30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

app.use('/posts', postRouter)
const CONNECTION_URL = process.env.CONNECTION_URL


app.get('/', (req,res) => {
    res.send("HELLO TO THE MEMORIES API!")
})
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
       .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
       .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false)



