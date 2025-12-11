// 1. Select DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 2. Initialize State (Load from LocalStorage or start empty)
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 3. Function to save to LocalStorage
function saveLocal() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 4. Function to Render (Show) the list on screen
function renderTodos() {
    todoList.innerHTML = ''; // Clear current list to avoid duplicates

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        
        // Add "completed" class if the task is done
        if (todo.completed) {
            li.classList.add('completed');
        }

        // Create HTML inside the list item
        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${todo.text}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editTodo(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

// 5. Add Function
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return alert('Please write a task!');

    const newTodo = {
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveLocal();     // Save to storage
    renderTodos();   // Update UI
    todoInput.value = ''; // Clear input
}

// 6. Delete Function
window.deleteTodo = function(index) {
    todos.splice(index, 1); // Remove 1 item at 'index'
    saveLocal();
    renderTodos();
}

// 7. Edit Function
window.editTodo = function(index) {
    const newText = prompt("Edit your task:", todos[index].text);
    
    if (newText !== null && newText.trim() !== "") {
        todos[index].text = newText.trim();
        saveLocal();
        renderTodos();
    }
}

// 8. Toggle Complete (Strikethrough)
window.toggleComplete = function(index) {
    todos[index].completed = !todos[index].completed;
    saveLocal();
    renderTodos();
}

// Event Listeners
addBtn.addEventListener('click', addTodo);

// Initial Render
renderTodos();

