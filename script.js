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
    // проверяем на пустоту строку ввода
    if (!addMessage.value) return;

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
    addMessage.value = '';
});

/* forEach — принимает колбэк функцию в которой
1 аргумент сам элемент,
2 аргумент это индекс + item итак по очереди
*/ 
function displayMessages() {
    let displayMessages = '';
    // очищаем поле если дел не стало
    if (todoList.length === 0) {
        todo.innerHTML = '';
    }
    todoList.forEach((item, idx) => {
        // Создаем в верстку уникальный индекс + добавляем класс important
        displayMessages += `
        <li>
            <input type='checkbox' id='item_${idx}' ${item.checked ? 'checked' : ''}>
            <label for='item_${idx}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessages;
        
    });
}

todo.addEventListener('change', function(event){
    // let idInput = event.target.getAttribute('id');
    // let forLabel = todo.querySelector('[for='+ idInput +']');
    // let valueLabel = forLabel.innerHTML;
    // console.log('valueLabel: ', valueLabel);

    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;
    console.log('valueLabel: ', valueLabel);

    todoList.forEach((item) => {
        // Если item.todo равен valueLabel то инвертируем item.cheked
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            // записываем эти данные с помощью setItem в локал
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    todoList.forEach(function(item, idx){
        // кликаем по лейблу, поэтому берем таргет иннерхтмл и проверяем
        if (item.todo === e.target.innerHTML){
            // делаем проверку если зажат контрол то правой кнопкой удаляем дело
            if (e.ctrlKey || e.metaKey) {
                todoList.splice(idx, 1);
            } else {
            item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});