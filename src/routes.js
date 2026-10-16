import {
  homePage,
  students,
  courses,
  contact,
  pageNotFound,
  about,
  teachers,
  search,
  searchError,
  accessDenied,
  isStudent,
  isTeacher,
  getRoles,
} from './views.js';

function pegarParametro(query, chave) {
  const par = query.split('&').find((p) => p.startsWith(chave + '='));
  return par ? decodeURIComponent(par.split('=')[1]) : '';
}

export function rotear(req, res) {
  // '/busca?termo=java' -> caminho = '/busca' | query = 'termo=java'
  const partes = req.url.split('?');
  const caminho = partes[0];
  const query = partes[1] || '';

  // ---------------------------------------------------------------------------------------------------------- //
  // /contato aceita apenas GET. Fica no topo para pegar POST, PUT, DELETE etc.

  if ((caminho === '/contato' || caminho === '/contact') && req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8', Allow: 'GET' });
    console.log(req.method, req.url, res.statusCode);
    res.end('<h1>405 - Method Not Allowed</h1><p>Use GET on this route.</p>');
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && caminho === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(homePage());
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && caminho === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(about());
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && caminho === '/antigo') {
    res.writeHead(301, { Location: 'http://localhost:3000/about' });
    console.log(req.method, req.url, res.statusCode);
    res.end();
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && caminho === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(students());
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && (caminho === '/contato' || caminho === '/contact')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(contact());
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && caminho === '/courses') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(courses());
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //
  // Só professores: 401 sem nome, 403 se não for professor, 200 se for

  if (req.method === 'GET' && caminho === '/teacher') {
    const name = pegarParametro(query, 'name');

    if (!name) {
      res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
      console.log(req.method, req.url, res.statusCode);
      res.end(accessDenied('Identify yourself. Try: /teacher?name=Ana Souza'));
      return;
    }

    if (!isTeacher(name)) {
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      console.log(req.method, req.url, res.statusCode);
      res.end(accessDenied('Only teachers can access this page.'));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(teachers());
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && caminho === '/busca') {
    const termo = pegarParametro(query, 'termo');

    if (!termo) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      console.log(req.method, req.url, res.statusCode);
      res.end(searchError());
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(search(termo));
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  if (req.method === 'GET' && caminho === '/validate') {
    const name = pegarParametro(query, 'name');

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    console.log(req.method, req.url, res.statusCode);
    res.end(JSON.stringify({
      name,
      isStudent: isStudent(name),
      isTeacher: isTeacher(name),
      roles: getRoles(name),
    }));
    return;
  }

  // ---------------------------------------------------------------------------------------------------------- //

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  console.log(req.method, req.url, res.statusCode);
  res.end(pageNotFound());
}