// ---------------------------- DADOS ---------------------------- //

const coursesData = {
  JavaScript: { name: 'JavaScript', workload: 40, price: 80 },
  'Banco de Dados': { name: 'Banco de Dados', workload: 60, price: 120 },
  'Server Language': { name: 'Server Language', workload: 50, price: 400 },
};

const studentsData = {
  'joao silva': {
    name: 'João Silva',
    ra: 123,
    email: 'joao@email.com',
    active: true,
    courses: ['JavaScript', 'Banco de Dados'],
  },
  'pedro alves': {
    name: 'Pedro Alves',
    ra: 543,
    email: 'pedro@email.com',
    active: true,
    courses: ['JavaScript'],
  },
  'yuri santos': {
    name: 'Yuri Santos',
    ra: 895,
    email: 'yuri@email.com',
    active: false,
    courses: ['Server Language'],
  },
};

const teachersData = {
  'ana souza': {
    name: 'Ana Souza',
    registration: 'P001',
    email: 'ana.souza@escola.com',
    department: 'Tecnologia',
    active: true,
    courses: ['JavaScript'],
  },
  'carlos lima': {
    name: 'Carlos Lima',
    registration: 'P002',
    email: 'carlos.lima@escola.com',
    department: 'Tecnologia',
    active: true,
    courses: ['Banco de Dados', 'Server Language'],
  },
};

// ------------------- LISTAS (usando reduce) -------------------- //

const toList = (obj) =>
  Object.keys(obj).reduce((list, key) => [...list, obj[key]], []);

const studentsList = toList(studentsData);
const coursesList = toList(coursesData);
const teachersList = toList(teachersData);

// ------------------------ VALIDAÇÃO ---------------------------- //

const normalize = (name) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

export const isStudent = (name) =>
  studentsList.reduce(
    (found, s) => found || normalize(s.name) === normalize(name),
    false
  );

export const isTeacher = (name) =>
  teachersList.reduce(
    (found, t) => found || normalize(t.name) === normalize(name),
    false
  );

export const getRoles = (name) =>
  [
    isStudent(name) ? 'student' : null,
    isTeacher(name) ? 'teacher' : null,
  ].reduce((roles, role) => (role ? [...roles, role] : roles), []);

// -------------------------- LAYOUT ----------------------------- //

function layout(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head><meta charset="UTF-8"><title>${title}</title></head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/students">Students</a>
          <a href="/courses">Courses</a>
          <a href="/contact">Contacts</a>
          <a href="/about">About High School</a>
          <a href="/teacher">Teachers of High School</a>
        </nav>
        ${content}
      </body>
    </html>
  `;
}

// -------------------------- PÁGINAS ---------------------------- //

export function homePage() {
  return layout('Home', '<h1>High School New York City</h1>');
}

export function students() {
  const rows = studentsList
    .map((s) =>
      `<tr>
        <td>${s.name}</td>
        <td>${s.ra}</td>
        <td>${s.email}</td>
        <td>${s.active ? 'Active' : 'Inactive'}</td>
        <td>${s.courses.join(', ')}</td>
      </tr>`)
    .join('');

  return layout('Students', `
    <h1>Students</h1>
    <table>
      <tr><th>Name</th><th>RA</th><th>Email</th><th>Status</th><th>Courses</th></tr>
      ${rows}
    </table>
  `);
}

export function courses() {
  const rows = coursesList
    .map((c) =>
      `<tr>
        <td>${c.name}</td>
        <td>${c.workload}h</td>
        <td>$ ${c.price}</td>
      </tr>`)
    .join('');

  return layout('Courses', `
    <h1>Courses</h1>
    <table>
      <tr><th>Course</th><th>Workload</th><th>Price</th></tr>
      ${rows}
    </table>
  `);
}

export function teachers() {
  const rows = teachersList
    .map((t) =>
      `<tr>
        <td>${t.name}</td>
        <td>${t.registration}</td>
        <td>${t.department}</td>
        <td>${t.courses.join(', ')}</td>
      </tr>`)
    .join('');

  return layout('Teachers', `
    <h1>Teachers</h1>
    <table>
      <tr><th>Name</th><th>Registration</th><th>Department</th><th>Courses</th></tr>
      ${rows}
    </table>
  `);
}

export function contact() {
  return layout('Contacts', '<h1>Contacts</h1>');
}

export function pageNotFound() {
  return layout('Page Not Found', '<h1>Page Not Found, my friend. You typed the wrong URL.</h1>');
}

export function about() {
  return layout('About', `
    <main>
      <h1>About Maple Ridge High School</h1>
      <p>
        Founded in 1962 in the fictional town of Maple Ridge, our school has spent
        over six decades helping students grow into curious, confident and
        responsible adults.
      </p>

      <h2>Our Mission</h2>
      <p>
        To provide a welcoming environment where every student can explore their
        talents, think critically and prepare for college, careers and life.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>Advanced Placement (AP) courses in science, math and humanities</li>
        <li>Robotics club, coding lab and a student-run radio station</li>
        <li>Varsity sports, including soccer, basketball and swimming</li>
        <li>Theater, band and visual arts programs</li>
      </ul>

      <h2>By the Numbers</h2>
      <p>
        1,200 students &bull; 85 teachers &bull; 95% graduation rate &bull;
        40+ clubs and extracurricular activities
      </p>

      <h2>Our Values</h2>
      <p>Respect, curiosity, teamwork and integrity guide everything we do.</p>
    </main>
  `);
}

// Impede que o termo digitado vire HTML (ex.: <script>)

const escapeHtml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function search(termo) {
  return layout('Search', `
    <h1>Search</h1>
    <p>You searched for: <strong>${escapeHtml(termo)}</strong></p>
  `);
}

export function searchError() {
  return layout('Bad Request', `
    <h1>400 - Bad Request</h1>
    <p>Missing the "termo" parameter. Try: /busca?termo=javascript</p>
  `);
}

export function accessDenied(message) {
  return layout('Access Denied', `
    <h1>Access Denied</h1>
    <p>${message}</p>
  `);
}