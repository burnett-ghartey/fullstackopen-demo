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


app.post('/api/notes', (req, res, next) => {
    const body = req.body

    if (body.content === undefined) {
      return res.status(400).json({
        error: 'content missing'
      })
    }

    const note = new Note({
      content: body.content,
      important: body.important
    })

    note.save().then(savedNote => {
      res.json(savedNote)
    }) .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res, next) => { 
  Note.findById(req.params.id).then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

  app.delete('/api/notes/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id).then(result => {
      res.status(200).end()
    }).catch(error => next(error))
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const {content, important} = req.body

    Note.findByIdAndUpdate(request.params.id, {content, important}, {new: true, runValidator: true, context: 'query'}).then(updatedNote => {
      response.json(updatedNote)
    }).catch(error => next(error))
  })


  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
      return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
      return response.status(400).send({error: error.message})
    }

    next(error)
  }
  

  app.use(errorHandler)
  

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


