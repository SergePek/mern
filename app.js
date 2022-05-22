const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        }, err => {
            if (err) throw err;
            console.log('Подключение к MongoDB прошло удачно!!!')
        });
        app.listen(PORT, () => console.log(`Приложение запущено на порту ${PORT}...`))
    } catch (e) {
        console.log('Ошибка сервера ', e.message)
        process.exit(1)
    }
}

start()

