const express = require('express')
const { listen } = require('express/lib/application')
const app = express()
const port = 80

app.use(express.static('frontend/dist'))

app.listen(port, () => console.log('Server has been started on port 80...'))
