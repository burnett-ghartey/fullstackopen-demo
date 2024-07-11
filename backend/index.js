const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ];


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

/* ---------
  routes for notes api
  ------------ */
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0
  return String(maxId + 1)
}


app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
      return res.status(400).json({
        error: 'content missing'
      })
    }

      const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId()
      }

      notes = notes.concat(note)
      res.json(note)

   
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)

    if (note){
        res.json(note)
    } else {
        res.status(404).end()
    }
    
  })

  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
  })

  /* ---------
  routes for persons api
  ------------ */
  app.get('/api/persons', (req, res) => {
    res.json([
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
  ])
  })

    /* ---------
  routes for phonebook
  ------------ */

  let contacts = [
    {
      "id": 1,
      "name": "Elma Herring",
      "email": "elmaherring@unq.com",
      "phone": "+1 (913) 497-2020"
    },
    {
      "id": 2,
      "name": "Knapp Berry",
      "email": "knappberry@unq.com",
      "phone": "+1 (951) 472-2967"
    },
    {
      "id": 3,
      "name": "Bell Burgess",
      "email": "bellburgess@unq.com",
      "phone": "+1 (887) 478-2693"
    },
    {
      "id": "73ae",
      "name": "Sam White",
      "phone": "+1 (913) 493-2020"
    }
  ]
  
  app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for two people</p><br><p></p>')
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const phone = contacts.filter(contact => contact.id === id)
    
    if (phone){
      res.json(phone)
  } else {
      res.status(404).end()
  }

  })

  /* --------------
  middleware
  ------------------ */
  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('----')
    next()
  }

  // applying middleware
  app.use(requestLogger)

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknownEndpoint'})
  }

  app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


