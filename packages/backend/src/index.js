const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = 'db/db.sqlite'

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    const create_events_table_query = `CREATE TABLE calendar_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER, 
        client_id INTEGER, 
        data text
    )`

    db.run(create_events_table_query, (err) => {
      const insert_events =
        'INSERT INTO calendar_events (id, user_id, client_id, data) VALUES (?,?,?,?)'

      if (err) {
        // Table already created: truncate and restore default data
        db.run('DELETE FROM calendar_events')
      }

      db.run(insert_events, [1, 1, 1, '2022-05-22 09:00:00'], (err) => {})
      db.run(insert_events, [2, 1, 2, '2022-05-22 14:00:00'], (err) => {})
      db.run(insert_events, [3, 2, 3, '2022-05-22 09:30:00'], (err) => {})
      db.run(insert_events, [4, 2, 3, '2022-05-23 09:30:00'], (err) => {})
      db.run(insert_events, [5, 2, 3, '2022-05-23 09:30:00'], (err) => {})
      db.run(insert_events, [6, 2, 3, '2022-05-24 09:30:00'], (err) => {})
      db.run(insert_events, [7, 3, 4, '2022-05-25 14:30:00'], (err) => {})
      db.run(insert_events, [8, 3, 4, '2022-05-26 14:30:00'], (err) => {})
    })

    const create_users_table_query = `CREATE TABLE calendar_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname text,
        lastname text
    )`

    db.run(create_users_table_query, (err) => {
      const insert_users = `INSERT INTO calendar_users (id, firstname, lastname) VALUES (?,?,?)`

      if (err) {
        // Table already created: truncate and restore default data
        db.run(`DELETE FROM calendar_users`)
      }

      db.run(insert_users, [1, 'Gianfranco', 'Funari'], (err) => {})
      db.run(insert_users, [2, 'Romario', 'Whatever'], (err) => {})
      db.run(insert_users, [3, 'Peppe', 'de Databeis'], (err) => {})
    })
  }
})

// Root endpoint
app.get('/', cors(corsOptions), (req, res, next) => {
  res.status(200)
  res.json({ message: 'Ok' })
})

const getEvents = app.get('/api/events', (req, res, next) => {
  const params = []

  const sql = `SELECT calendar_events.*, firstname AS user_firstname, lastname AS user_lastname
               FROM calendar_events
               JOIN calendar_users
               ON calendar_events.user_id = calendar_users.id`

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json(rows)
  })
})

const getEvent = app.get(
  '/api/events/:id',
  cors(corsOptions),
  (req, res, next) => {
    const params = [req.params.id]

    const sql = `SELECT calendar_events.*, firstname AS user_firstname, lastname AS user_lastname
               FROM calendar_events
               JOIN calendar_users
               ON calendar_events.user_id = calendar_users.id
               WHERE calendar_events.id = ?`

    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message })
        return
      }
      res.json(rows)
    })
  }
)

const getUsers = app.get('/api/users', cors(corsOptions), (req, res, next) => {
  const params = []

  const sql = `SELECT * FROM calendar_users`

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json(rows)
  })
})

const getUser = app.get(
  '/api/users/:id',
  cors(corsOptions),
  (req, res, next) => {
    const params = [req.params.id]

    const sql = `SELECT * FROM calendar_users
               WHERE id = ?`

    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message })
        return
      }
      res.json(rows)
    })
  }
)

const postEvent = app.post(
  '/api/event/',
  cors(corsOptions),
  (req, res, next) => {
    let errors = []
    console.log(req.body)

    if (!req.body.id) {
      errors.push('No id specified')
    }
    if (!req.body.user_id) {
      errors.push('No user_id specified')
    }
    if (!req.body.client_id) {
      errors.push('No client_id specified')
    }
    if (!req.body.data) {
      errors.push('No data specified')
    }

    if (errors.length) {
      res.status(400).json({ error: errors.join(',') })
      return
    }

    const data = {
      id: req.body.id,
      user_id: req.body.user_id,
      client_id: req.body.client_id,
      data: req.body.data,
    }

    const params = [data.id, data.user_id, data.client_id, data.data]

    const sql =
      'INSERT INTO calendar_events (id, user_id, client_id, data) VALUES (?,?,?,?)'
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message })
        return
      }
      res.json(this.lastID)
    })
  }
)

const putUser = app.put('/api/users/', cors(corsOptions), (req, res, next) => {
  let errors = []
  console.log(req.body)

  if (!req.body.id) {
    errors.push('No id specified')
  }
  if (!req.body.firstname) {
    errors.push('No firstname specified')
  }
  if (!req.body.lastname) {
    errors.push('No lastname specified')
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(',') })
    return
  }

  const data = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }

  const params = [data.firstname, data.lastname, data.id]

  const sql = 'UPDATE calendar_users SET firstname=?, lastname=? WHERE id=?'
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json(data.id)
  })
})

const postUser = app.post(
  '/api/users/',
  cors(corsOptions),
  (req, res, next) => {
    let errors = []
    console.log(req.body)

    if (!req.body.firstname) {
      errors.push('No firstname specified')
    }
    if (!req.body.lastname) {
      errors.push('No lastname specified')
    }

    if (errors.length) {
      res.status(400).json({ error: errors.join(',') })
      return
    }

    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    }

    const params = [data.firstname, data.lastname, data.id]

    const sql = 'INSERT INTO calendar_users (firstname, lastname) VALUES (?,?)'
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message })
        return
      }
      res.json(this.lastID)
    })
  }
)

const deleteUser = app.delete(
  '/api/users/',
  cors(corsOptions),
  (req, res, next) => {
    let errors = []
    console.log(req.body)

    if (!req.body.id) {
      errors.push('No id specified')
    }

    if (errors.length) {
      res.status(400).json({ error: errors.join(',') })
      return
    }

    const data = {
      id: req.body.id,
    }

    const params = [data.id]

    const sql = 'DELETE FROM calendar_users WHERE id=?'
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message })
        return
      }
      res.json(data.id)
    })
  }
)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
