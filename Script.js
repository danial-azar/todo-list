const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.classList.add('completed');

    li.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    todos.push({text, completed: false});
    saveTodos();
    renderTodos();
    input.value = '';
  }
});

renderTodos();
