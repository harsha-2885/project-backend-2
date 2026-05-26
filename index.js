import express from 'express'

const app=express()

const port=3000
app.use(express.json())

let teaData=[]
let nextId=1

app.post('/teas',(req,res)=>{
    const{name,price}=req.body
    const newtea={id:nextId++,name,price}
    teaData.push(newtea)
    res.status(201).send(newtea)
})

app.get()

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})