const app = document.querySelector("#app");

// General api getter function
// Util layer
// Api layer
function apiGet(url) {
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    });
}

// ------ SERVICE LAYER ------ (MODEL)

// Specialized
function getTodos() {
  const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
  return apiGet(TODOS_URL);
}

// Specialized
function getKittens() {
  const CAT_URL = 'https://api.thecatapi.com/v1/images/search'
  return apiGet(CAT_URL);
}


// -------- VIEW LAYER --------------
function renderTodos(todos) {
  const todoElements = todos.map(createTodoElement);
  app.append(...todoElements);
}

function createTodoElement(todo) {
  const todoEl = document.createElement('div');
  
  const span = document.createElement('span');
  span.innerText = todo.title;

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = todo.completed;

  todoEl.append(span, check);
  return todoEl;
}


// ------ CONTROLLER ---------------
function main() {
  const todosPromise = getTodos();
  const catsPromise = getKittens();

  todosPromise.then(function(todos) {
    // call the view layer
    renderTodos(todos);
  });

  catsPromise.then(function(cats) {
    console.log(cats);
  });
}

main();
