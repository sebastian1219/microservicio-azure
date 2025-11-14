import express from 'express';
import usuariosRouter from './routes/usuarios.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/usuarios', usuariosRouter);

app.get('/', (req, res) => {
  res.send('API de Usuarios funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});