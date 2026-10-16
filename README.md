# Fundamentação Linguagem Servidor

Cliente e servidor: Cliente faz uma requisição no site em que deseja acessar, onde é hospedado tem seu endereço de IP, uma tradução feita para o roteador de internet entender, os dados vão percorrer pelos cabos de fibra optica até o dominio onde a requisição foi solicitada, os dados são processados e devolvidos como resposta para o endereço IP que fez a requisição

Anatomia da requisição: como a requisição foi estruturada, usado método `GET` para acessar a página `/students` (title carregado na função `layout`)

```jsx
if (req.method === 'GET' && req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(students());
    return;
  }
```

Cabeçalho do layout: uma função que carrega um corpo HTML com title (título do documento HTML) e content (conteúdo da página) de parâmetro

```jsx
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
        </nav>
        ${content}
      </body>
    </html>
  `;
}
```

Corpo criado usando a função layout: no return eu chamo a função `layout` com nome students e o corpo HTML de paramentro

```jsx
export function students() {
  const rows = highSchool.students.map((p) => `<tr><td>${p.name}</td><td>RA: ${p.ra}</td></tr>`).join('')
  return layout('students', `
    <h1>Produtos</h1>
    <table>
      <tr><th>Produto</th><th>Preço</th></tr>
      ${rows}
    </table>
  `);
}
```

Métodos

GET: faz a requisição ou seja solicita algo, e obrigatoriamente tem um retorno sobre o que foi solicitado

POST: envia dados para o servidor onde está sendo feito a requisição

PUT: atualiza os dados do server onde está sendo feito a requisição

PATCH: **Modificação parcial**: Você envia apenas os campos ou dados que precisam ser alterados
”pesquisa feita no google”

DELETE: deleta os dados do ser onde está sendo feito a requisição

Codigo de Status:

Familia 1xx relata informações sobre o andamento da comunicação

Familia 2xx Indica sucesso o servidor entendeu sua solicitação e entregou o que pediu

- status 200: a requisição foi bem sucedida e depende do método HTTP que vai usar, GET, POST, UPDATE, DELETE
- status 201: requisição bem sucedida e resultou na criação de um novo recurso no servidor, verá isso após fazer requisições POST ou PUT

Familia 3xx o conteúdo que deseja ser acessado foi movido para outro lugar, e o servidor vai te redirecionar para o novo local

- status 301: recurso foi movido permanentemente para um novo URL, e todas as solicitações futuras devem ser feitas usando o novo endereço. A reposta inclui o link para o novo URL
- status 302: o recurso da página vive temporariamente em um identificador (URI) diferente. Continua usando o endereço original para solicitações futuras, a menos que seja dito o contrário
- status 304: O recurso não mudou

Família 4xx significa que sua solicitação é invalida, a URL digitada não existe

- status 400: o servidor não pode processar sua solicitação. Erro do lado do cliente
- status 401: O servidor rejeitou sua solicitação, por não ser usuário autenticado, ou autenticação inválida
- status 403: O servidor entendeu sua solicitação, mas negou o acesso. Devido a permissões insuficientes
- status 404: o servidor não encontra o recurso solicitado
- status 405: o servidor reconhece o método de requisição, mas o recurso não suporta o método utilizado

Família 5xx problemas técnicos com o servidor que está sendo solicitado, que a hospedagem daquela URL caiu

- status 500: erro genérico. O servidor atingiu um problema inesperado que o impediu de completar a solicitação

diferença entre 401 e 403: 401 é para usuários tentando logar normalmente, 403 é para diferentes cargos, por exemplo um usuário comum tentando logar no acesso de administrador

diferença entre 301 e 302: 301 é permanente já o 302 é temporário

fonte: https://contabo.com/blog/http-response-codes-server-statuses/?utm_source=google&utm_medium=cpc&utm_campaign=brand-pmax-global&utm_term=&utm_content=&gad_source=1&gad_campaignid=22692290604&gclid=CjwKCAjwlY3WBhANEiwApsNrLWylDVo61FMHtVLCqZLlNjLaYf1I3Zx0V-D8h9tPJFFcHhalOhT2FBoC9KYQAvD_BwE

### Cabeçalhos

`Content-Length` — indica o tamanho do corpo da entidade, em bytes.

`Content-Type` — é utilizado para indicar o tipo do arquivo.

`Allow` — lista um conjunto de métodos suportados pelo recurso.

`Cache-Control` — é usado para especificar diretivas para mecanismos de cache tanto em requisições quanto em respostas.

`Location` — indica o URL para qual a página deve ser redirecionada.

`Accept` — anuncia quais tipos de conteúdo, expressos como MIME types, o cliente é capaz de entender

`User-Agent` — é uma cadeia de caracteres característica que permite servidores e pares de rede identificar a aplicação, sistema operacional, fornecedor, e/ou versão do agente de usuário requisitante.

### **HTTP é stateless:** o que isso significa e por que o servidor não lembra de uma requisição para a outra.

o servidor só recebe os dados que vem adiante, isso faz dele um stateless(sem estado), não mantendo nenhum dado entre duas requisições. O que permite o usuário voltar uma página por conta do navegador.

fonte: https://developer.mozilla.org/pt-BR/

### HTTP e HTTPS: a diferença entre eles

http transmite todos os dados e https tem uma criptografia de segurança

!image.png

Aba professores logado como professora Ana, com o metodo GET e o Status code 200 por ser professora nos dados Mock. O Cabeçalho usado, data em que é feita a requisição, tempo levado

!image.png

/antigo usando metodo GET e retornando Status 301 por ser uma url antiga e redireciona para about, mostra o cabeçalho Location, data e status de conexão

!image.png

requisição feita como aluno onde só professores tem acesso usando metodo GET e retornando Status 401, cabeçalho, data e status de conexão

!image.png

requisição feita sem termo de busca retornando 400. Já usando o termo de busca retorna 200, padrão, cabeçalho, data e status de conexão

```jsx
curl -i http://localhost:3000/antigo
```

!Captura de tela 2026-10-15 221852.png

```jsx
curl -i http://localhost:3000/busca
```

!Captura de tela 2026-10-15 221922.png

```jsx
curl -i -X POST http://localhost:3000/contato
```

!image.png

## **4. Conclusão**

Repositório com um único commit contendo tudo perde a pontuação deste critério. o7