const express = require("express");
const morgan = require('morgan');
const app = express();

app.use(express.json())


app.use(express.static('dist'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



app.get(`/api/info`, (request,response)=>{
  const numberPerson = persons.length
const date = new Date();
const message = `Phonebook has info ${numberPerson} people ${date}`
response.send(`<h1>${message}</h1>`)
})

app.get(`/api/persons`,(request,response)=>{
  response.json(persons)
})

app.get(`/api/persons/:id`,(request,response)=>{
const id = request.params.id
const person = persons.find((person)=> person.id === id)
if(person){
  response.json(person)
}else{
  response.status(404).json({Error:"person not found"})
}
})

app.delete(`/api/persons/:id`,(request,response)=>{
  const id = request.params.id
  persons = persons.filter((p)=> p.id !== id)
response.status(204).end()
  
})

app.post(`/api/persons`,(request,response)=>{
   const person = request.body

   if(!person.name){
   return response.status(400).json({error:'name is missing'})
  }
  if(!person.number){
   return response.status(400).json({error:"number is missing"})
  }
const nameNormal = person.name.trim().toLowerCase()
const nameExist = persons.some((p)=> p.name.trim().toLowerCase() === nameNormal)

  if(nameExist){
return response.status(400).json({error:"name must be unique"})
  }

   const maxId = persons.length> 0 ? Math.max(...persons.map((p)=> Number(p.id))):0
  const newPerson = 
    {
...person,
id: String(maxId + 1)
    }
  persons = persons.concat(newPerson)
  console.log(newPerson)
  response.json(newPerson)

  
 
})

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});



const PORT =  process.env.PORT  || 3001;
app.listen(PORT, ()=>{
  console.log(`serving is running on port ${PORT}`)
})