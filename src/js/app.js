import '../scss/main.scss';

const todos = document.getElementById('todo-list');

const todoForm = document.getElementById('todo-form');

const todoInput = document.getElementById('todo-input');

if (todoForm) {
    todoForm.addEventListener('submit', e => {
        e.preventDefault();

        if (todoInput.value !== '') {
            // * Create a fetch post request 
            fetch('http://localhost:8081/api/todo/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ content: todoInput.value }),
            })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    console.log(res);
                    createTodoItem(todoInput.value);
                });
        }
    });
}


function createTodoItem(content) {
    let todoItem = document.createElement('li');
    todoItem.setAttribute('class', 'collection-item');
    todoItem.textContent = content;

    let link = document.createElement('a');
    link.setAttribute('class', 'secondary-content');

    let icon = document.createElement('i');
    icon.setAttribute('class', 'material-icons');
    icon.textContent = 'send';

    link.appendChild(icon);

    todoItem.appendChild(link);

    todos.appendChild(todoItem);

    // todoInput.value = "";
}