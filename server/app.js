const express = require('express')
const heroesRouter = require('./routes/heroes.routes')
const loginisationRouter = require('./routes/loginisation.routes')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors())
app.use('/api/champions', heroesRouter)
app.use('/api/loginisation', loginisationRouter)
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`)
})
