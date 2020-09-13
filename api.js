const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const DBURL = process.env.DBURL || 'mongodb://localhost/'

mongoose.connect(DBURL + 'counter?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(cors())

const counterSchema = new mongoose.Schema({
    value: Number,
    lastReset: Date
})
const Counter = mongoose.model('Counter', counterSchema);
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.debug('I have connected to the database \\o/')
})

app.get('/', (req, res) => {
    Counter.findOne((err, counter) => {
        if (err) return console.error(err)
        if (counter) {
            console.debug('I have found the counter: ' + counter.value)
            counter.value++;
            console.debug('I have incremented the counter to ' + counter.value)
        } else {
            console.debug('I could not find the counter, and created a new one!')
            counter = new Counter({ value: 1, lastReset: Date.now() })
        }
        counter.save((err, counter) => {
            if (err) return console.error(err)
        })
        res.json({ counter })
    })
})


app.listen(PORT, () => {
    console.log(`I hear you on ${PORT}`)
})