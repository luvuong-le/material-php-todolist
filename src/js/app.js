import '../scss/main.scss';


/** 
 * * Initialize Materialize Modals 
 * 
*/
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.modal');
	var options = {
		opacity: 0.8,
	};
	var instances = M.Modal.init(elems, options);

	const todos = document.getElementById('todo-list');

	const todoForm = document.getElementById('todo-form');

	const todoInput = document.getElementById('todo-input');

	const exists = document.getElementById('exists');

	const editModal = document.getElementById('editModal');

	let oldEditModalInput = null;

	const editModalInput = document.getElementById('editModalInput');

	if (editModal) {
		editModal.addEventListener('submit', e => {
			e.preventDefault();

			if (editModalInput.value !== '') {
				// * Create a fetch post request
				fetch('http://localhost:8081/api/todo/edit', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json; charset=utf-8',
					},
					body: JSON.stringify({ newContent: editModalInput.value, oldContent: oldEditModalInput }),
				})
					.then(res => {
						return res.json();
					})
					.then(res => {
						console.log(res);
                        instances[0].close();
                        
                        const items = document.querySelectorAll('.collection-item');
                        
                        let item = Array.from(items).find(element => element.children[0].textContent === res.data.oldContent);

						item.children[0].textContent = res.data.newContent;
					});
			}
		});
	}

	if (todos) {
		fetch('http://localhost:8081/api/todos')
			.then(res => {
				return res.json();
			})
			.then(res => {
				for (let todo of res.data) {
					createTodoItem(todo.content);
				}

				const todoDeleteButtons = document.querySelectorAll('.delete');

				todoDeleteButtons.forEach(todo => {
					todo.addEventListener('click', e => {
						fetch('http://localhost:8081/api/todo/delete', {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json; charset=utf-8',
							},
							body: JSON.stringify({
								content: e.target.parentElement.parentElement.children[0].textContent,
							}),
						})
							.then(res => {
								return res.json();
							})
							.then(res => {
								console.log(res);

								/** Delete from HTML */
								// let index = Array.from(todoDeleteButtons).findIndex(element => element === e.target);
								todos.removeChild(e.target.parentElement.parentElement);
							});
					});
				});
			});
	}

	if (todoForm) {
		todoForm.addEventListener('submit', e => {
			e.preventDefault();

			if (todoInput.value !== '') {
				// * Create a fetch post request
				fetch('http://localhost:8081/api/todo/create', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json; charset=utf-8',
					},
					body: JSON.stringify({ content: todoInput.value }),
				})
					.then(res => {
						return res.json();
					})
					.then(res => {
						console.log(res);

						if (res.exists) {
							exists.classList.remove('hidden');
							exists.classList.add('shown');

							setTimeout(() => {
								exists.classList.remove('shown');
								exists.classList.add('hidden');
							}, 1500);

							todoInput.value = '';
						} else {
							createTodoItem(todoInput.value);
						}
					});
			}
		});
	}

	function createTodoItem(content) {
		let todoItem = document.createElement('li');
		todoItem.setAttribute('class', 'collection-item');

		let todoText = document.createElement('span');
		todoText.textContent = content;

		let link = document.createElement('a');
		link.setAttribute('class', 'secondary-content');

		let icon = document.createElement('i');
		icon.setAttribute('class', 'material-icons delete');
		icon.textContent = 'delete';

		let linkEdit = document.createElement('a');
		linkEdit.setAttribute('href', '#editModal');
		linkEdit.setAttribute('class', 'secondary-content modal-trigger');

		linkEdit.addEventListener('click', e => {
			oldEditModalInput = e.target.parentElement.parentElement.children[0].textContent;
			editModalInput.value = e.target.parentElement.parentElement.children[0].textContent;
		});

		let iconEdit = document.createElement('i');
		iconEdit.setAttribute('class', 'material-icons edit');
		iconEdit.textContent = 'edit';

		link.appendChild(icon);
		linkEdit.appendChild(iconEdit);

		todoItem.appendChild(todoText);

		todoItem.appendChild(link);
		todoItem.appendChild(linkEdit);

		todos.appendChild(todoItem);

		todoInput.value = '';
	}
});
