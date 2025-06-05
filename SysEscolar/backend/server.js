const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
//log
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/alumnos', require('./routes/alumnos'));
app.use('/carreras', require('./routes/carreras'));
app.use('/materias', require('./routes/materias'));
app.use('/profesores', require('./routes/profesores'));
app.use('/inscripciones', require('./routes/inscripciones'));

app.use('/login', authRoutes); // <-- Importante
app.use("/login", require("./routes/auth"));

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
