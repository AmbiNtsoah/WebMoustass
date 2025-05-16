const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const { connectWithRetry } = require('./db/mysql'); // Import de la fonction de connexion
const userRoutes = require('./src/routes/userroutes');
const audioRoutes = require('./src/routes/audioroutes');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

// 🔽 Sert les fichiers frontend (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'src/public')));

// 🔽 Route principale qui envoie l'index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/public', 'login.html'));
});

// 🔽 Tes routes API
app.use('/audio', audioRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes); 

app.listen(3000, () =>{
    console.log(`Server on http://localhost:3000`);
})