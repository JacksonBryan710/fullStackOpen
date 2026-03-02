const logger = require('./logger')

const reqLogger = (req, resp, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, resp, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return resp.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return resp.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  reqLogger,
  unknownEndpoint,
  errorHandler
}