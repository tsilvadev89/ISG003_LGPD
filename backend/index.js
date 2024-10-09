require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require("path");
const http = require('http');

// IMPORTAÇÕES DE ROTAS DO BACKEND
const userRoutes = require('./routes/userRoute');
const loginRoutes = require('./routes/loginRoute');
const logoutRoutes = require('./routes/logoutRoute');
const cookieRoutes = require('./routes/cookieRoute');
const productRoutes = require('./routes/productRoute');

// Configurações do servidor
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Tempo de seção
    max: 200 //  Segurança quantidade de requisições
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './')));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors({
    origin: ['http://localhost', 'http://18.213.164.46'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));
app.set('view engine', 'ejs');
app.use(cookieParser());

// Organização sessão cookie
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // Um dia
    },
    name: 'userLogged'
}));

// Rotas do backend
app.use('/us', userRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/ck', cookieRoutes);
app.use('/product', productRoutes);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)})
