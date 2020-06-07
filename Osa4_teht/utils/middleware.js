const express = require('express')
const morgan = require('morgan')

morgan.token('contents', function (req) {
  return JSON.stringify(req.body)
})

//Logs the request info
const morg = morgan(':method :url :status :res[content-length] - :response-time ms :contents')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown blog' })
}


const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  morg,
  unknownEndpoint,
  errorHandler
}
