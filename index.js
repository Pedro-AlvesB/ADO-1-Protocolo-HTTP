import http from 'http';
import { rotear } from './routes.js';

const servidor = http.createServer(rotear);

servidor.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});