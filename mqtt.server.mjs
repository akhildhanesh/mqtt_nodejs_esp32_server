import express from 'express'
const app = express()

const PORT = process.env.PORT || 3000

import * as mqtt from "mqtt"
const client = mqtt.connect('mqtt://xxx.xxx.xxx.xxx', {
    username: 'username',
    password: 'password'
})

client.on('connect', () => console.log('connected to server'))

client.subscribe('esp32/output', (err) => {
    if (err) return err
})

client.on('message', function (topic, message) {
    console.log(message.toString())
    // client.end()
})

app.get('/on', (req, res) => {
    client.publish('esp32/output', 'on')
    res.send('ok')
})

app.get('/off', (req, res) => {
    client.publish('esp32/output', 'off')
    res.send('ok')
})

client.on('error', (err) => console.log(err.message))

app.listen(PORT)
