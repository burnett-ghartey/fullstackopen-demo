const express = require('express')
const cors = require("cors")
require('dotenv').config()
const Note = require("./models/note")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
      res.json(notes)
    })
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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


