export const highSchool = [
   {  
    std: false,
    students: [
        { name: 'João', ra: 123},
        { name: 'Pedro', ra: 543},
        { name: 'Yuri', ra: 895}
    ],
  },
  {
    courses: [
        { course: 'Computer Science', price: 400 },
        { course: 'Medicine', price: 80 },
        { course: 'Letters', price: 120 },
    ],
  },
  {
    tdr: false,
    teatchers: [
      {name: 'Jonas', discipline: 'English'},
      {name: 'Marcos', discipline: 'Biology'},
      {name: 'Elaine', discipline: 'Assembly'}
    ]
  }
]

function layout(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head><meta charset="UTF-8"><title>${title}</title></head>
      <body>
        <nav>
          <a href="/students">Students</a>
          <a href="/courses">Courses</a>
          <a href="/contact">Contacts</a>
          <a href="/about">About High School</a>
          <a href="/teacher">Teachers of High School</a>
        </nav>
        ${content}
        // criar 2 botões deixar true
      </body>
    </html>
  `;
}

// --------------------------------------------------------------------------------//

export function homePage() {
  return layout('Begin', '<h1>High School New York City</h1>');
}

// --------------------------------------------------------------------------------//

export function students() {

  const rows = highSchool[0]
    .students.map((p) => 
      `<tr><td>${p.name}</td><td>RA: ${p.ra}</td></tr>`)
      .join('')

  return layout('students', `
    <h1>Students</h1>
    <table>
      <tr><th>Student</th><th>RA</th></tr>
      ${rows}
    </table>
  `);
}

// --------------------------------------------------------------------------------//

export function courses() {
    const rows = highSchool[1]
      .courses.map((c) =>
        `<tr><td>${c.course}</td><td>$ ${c.price}</td></tr>`)
        .join('')

    return layout('courses', `
      <h1>cursos</h1>
      <table>
      <tr><th>Courses</th><th>Price</th></tr>
        ${rows}
      </table>
      `);
}

// --------------------------------------------------------------------------------//

export function teachers() {
    const rows = highSchool[2]
      .teatchers.map((n) => 
        `<tr><td>${n.name}</td><td>${n.discipline}</td></tr>`)
        .join('')

    return layout('teacher', `
      <h1>Teachers</h1>
      <table>
      <tr><th>Name</th><th>Discipline</th></tr>
        ${rows}
      </table>
      `);
}

// --------------------------------------------------------------------------------//

export function contact() {
  return layout('contact', '<h1>Meus contatos</h1>');
}

// --------------------------------------------------------------------------------//

export function pageNotFound() {
    return layout('Page Not Found', '<h1>Page Not Found my friend, you type the wrong url<h1>')
}

// --------------------------------------------------------------------------------//

export function about() {
  return layout("About", `
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

//criar view admin com acesso restrito, busca