const app = document.querySelector("#app");

// General api getter function
// Util layer
// ------- API LAYER ---------------
function apiGet(url) {
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    });
}

function apiPost(url, data) {
  return fetch(url, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(function(res){
    return res.json();
  })
  .then(function(data) {
    return data;
  });
}

function apiDelete(url) {
  return fetch(url, {
    method: 'DELETE'
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    });
}

function apiPatch(url, data) {
  return fetch(url, {
    method: 'PATCH',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(function(res){
    return res.json();
  })
  .then(function(data) {
    return data;
  });
}



// ------ SERVICE LAYER ------ (MODEL)

// Specialized
function getTodos() {
  const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
  return apiGet(TODOS_URL);
}

function setTodoComplete(id) {
  const url = "https://jsonplaceholder.typicode.com/todos/" + id;
  return apiPatch(url, {
    completed: true
  });
}

function setTodoInComplete(id) {
  const url = "https://jsonplaceholder.typicode.com/todos/" + id;
  return apiPatch(url, {
    completed: false
  });
}

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

  check.addEventListener('change', function(event){
    const id = todo.id;
    const checked = event.target.checked;
    handleTodoCheckboxClick(id, checked);
  });

  todoEl.append(span, check);
  return todoEl;
}


// ------ CONTROLLER ---------------
function handleTodoCheckboxClick(id, checked) {
  if (checked === true) {
    setTodoComplete(id);
  } else {
    setTodoInComplete(id);
  }
}

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
