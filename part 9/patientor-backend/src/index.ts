import express from 'express'
import cors from 'cors'
import diagnosesRouter from './routes/diagnoses'
import patientsRouter from './routes/patients'
const app = express()

// Config
const PORT = 3001

// Middleware
app.use(express.json())
app.use(cors())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/diagnosis', diagnosesRouter)
app.use('/api/patients', patientsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
