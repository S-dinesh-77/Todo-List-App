// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Functions
function addToDo(event) {
    // Prevents form from submitting / Prevents form from reloading
    event.preventDefault();

    // toDo DIV
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo');

    // Create Li
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
        alert("You must write something!");
    } else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Check btn
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn');
        toDoDiv.appendChild(checked);

        // Delete btn
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn');
        toDoDiv.appendChild(deleted);

        // Append to list
        toDoList.appendChild(toDoDiv);

        // Clearing the input
        toDoInput.value = '';
    }
}

function deleteCheck(event) {
    const item = event.target;

    // Delete
    if (item.classList[0] === 'delete-btn') {
        item.parentElement.classList.add("fall");
        item.parentElement.addEventListener('transitionend', function() {
            item.parentElement.remove();
        });
    }

    // Check
    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}

// Change theme function
function changeTheme(color) {
    document.body.className = color;

    // Change blinking cursor for darker theme
    if (color === 'darker') {
        document.getElementById('title').classList.add('darker-title');
    } else {
        document.getElementById('title').classList.remove('darker-title');
    }

    document.querySelector('input').className = `${color}-input`;

    // Change todo color without changing their status (completed or not)
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? 
            todo.className = `todo ${color}-todo completed` :
            todo.className = `todo ${color}-todo`;
    });

    // Change buttons color according to their type (todo, check, or delete)
    document.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('check-btn')) {
            button.className = `check-btn ${color}-button`;  
        } else if (button.classList.contains('delete-btn')) {
            button.className = `delete-btn ${color}-button`; 
        }
    });
}
