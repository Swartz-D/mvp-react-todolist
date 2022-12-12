const express = require('express')
const cors = require('cors')
const {Client} = require('pg')
const PORT = 5100;
const app = express();

const config = require('./config.js')['production' || 'dev']

const client = new Client({
  connectionString: config.connectionString
})

client.connect()
app.use(cors())
app.use(express.json())

app.get('/todos', (req,res) => {  
  client.query('SELECT * FROM check_list').then(result => (console.log(result.rows), res.send(result.rows)))
})

app.post('/todos', (req,res) => {
  const category = req.body.category
  const description = req.body.description
  client.query(`INSERT INTO check_list (category, description) 
    VALUES ('${category}', '${description}') RETURNING *`).then(result => res.send(result.rows))
})

app.patch('/todos/:id', (req,res) => {
  client.query(`UPDATE check_list SET complete = true 
  WHERE id = ${req.params.id} RETURNING *`)
    .then(result => res.send(result.rows[0]))
})

app.delete('/todos/:id', (req,res) => {
  client.query(`DELETE FROM check_list WHERE id = ${req.params.id} RETURNING *`)
    .then(result => res.send(result.rows[0]))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})