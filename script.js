let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

// Создаем массив в который кладем все наши дела
let todoList = [];

// Получаем данные через getItem что бы из локала подтянуть
if(localStorage.getItem('todo')) {
    // возвращаем данные через JSON.parse и образуем в массив
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

// Создаем слушатель событий на нажатие кнопки
addButton.addEventListener('click', () => {

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }
    // Пушим дела в массив
    todoList.push(newTodo);
    displayMessages();
    // Локал сторадж принимает только строку, setItem - создает новое значение
    localStorage.setItem('todo', JSON.stringify(todoList));
});

/* forEach — принимает колбэк функцию в которой
1 аргумент сам элемент,
2 аргумент это индекс + item итак по очереди
*/ 
function displayMessages() {
    let displayMessages = '';

    todoList.forEach((item, idx) => {
        // Создаем в верстку уникальный индекс
        displayMessages += `
        <li>
            <input type='checkbox' id='item_${idx}' ${item.checked ? 'checked' : ''}>
            <label for='item_${idx}'>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessages;
        
    });
}

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;
    console.log('valueLabel: ', valueLabel);
})