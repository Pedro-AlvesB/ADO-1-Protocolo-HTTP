import {
  homePage,
  students,
  courses,
  contact,
  pageNotFound,
  about,
  teachers,
  highSchool
} from './views.js';

const authStudent = highSchool.map(a => a.std)
console.log(authStudent);
const authTeacher = highSchool.map(a => a.tdr)
console.log(authTeacher);

export function rotear(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log(req.method, req.url, res.statusCode);
    res.end(homePage());
    return;
  }

  if (req.method === 'GET' && req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log(req.method, req.url, res.statusCode);
    res.end(about());
    return;
  }

  if (req.method === 'GET' && req.url === '/students') {
    if (authStudent) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      console.log(req.method, req.url, res.statusCode);
      res.end(students());
      return
    } else
      res.writeHead(403, { 'Content-Type': 'text/html' })
      req.method, req.url, res.statusCode
      res.end(NotAuthenticated())
      return;
  }

  if (req.method === 'GET' && req.url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log(req.method, req.url, res.statusCode);
    res.end(contact());
    return;
  }

  if (req.method === 'GET' && req.url === '/courses') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log(req.method, req.url, res.statusCode);
    res.end(courses());
    return;
  }

  if (req.method === 'GET' && req.url === '/antiga') {
    res.writeHead(301, { Location: 'http://localhost:3000/about' });
    console.log(req.method, req.url, res.statusCode);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/teacher') {
    if (authTeacher) {
      res.writeHead(201, { 'Content-Type': 'text/html' })
      console.log(req.method, req.url, res.statusCode);
      res.end(teachers())
      return
  } else 
    res.writeHead(403, { 'Content-Type': 'text/html' })
    console.log(req.method, req.url, res.statusCode);
    res.end(NotAuthenticated())
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(pageNotFound());
}