let todoList = [];
let isEditing = false;
let todoEdit = null;

const saveData = () => {
  localStorage.setItem('todoslist', JSON.stringify(todoList));
};

const getStorageData = () => {
  const localFormData = JSON.parse(localStorage.getItem('todoslist'));
  todoList = localFormData || [];
};

const editTodoList = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.querySelector('.inputTask');
  desc.value = todo.description;
  desc.focus();
};

const removeTodoList = (indexID) => {
  todoList = todoList.filter((ind) => ind.index !== indexID);
  todoList = todoList.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
  displayToDo();
};

const toggleToDoStatus = (todo) => {
  todoList = todoList.map((todoItem) => {
    if (todoItem.index === todo.index) {
      return { ...todo, completed: !todo.completed };
    }
    return todoItem;
  });
  saveData();
};

const clearCheckBox = () => {
  todoList.forEach((todoItem) => {
    if (todoItem.completed) {
      todoItem.completed = false;
    }
  });
  saveData();
};

const clearCompletedList = () => {
  todoList = todoList.filter((todo) => !todo.completed);
  todoList = todoList.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
  saveData();
  displayToDo();
};

const displayToDo = () => {
  const todoListElement = document.querySelector('.todo-container');
  todoListElement.innerHTML = '';

  todoList.forEach((todo, i) => {
    const todoLiElement = document.createElement('li');
    todoLiElement.classList.add('todo-item');

    const todoContentElement = document.createElement('div');
    todoContentElement.classList.add('todo-content');

    const todoCheckboxElement = document.createElement('input');
    todoCheckboxElement.type = 'checkbox';
    todoCheckboxElement.name = 'checkbox';
    todoCheckboxElement.value = todo.index;
    todoCheckboxElement.checked = todo.completed;

    const todoDescriptionElement = document.createElement('p');
    todoDescriptionElement.innerText = todo.description;

    todoCheckboxElement.addEventListener('change', () => {
      if (todoCheckboxElement.checked) {
        todoDescriptionElement.classList.add('strike');
      } else {
        todoDescriptionElement.classList.remove('strike');
      }
      toggleToDoStatus(todo);
    });

    const actionBtns = document.createElement('div');
    actionBtns.classList.add('action-btn');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.classList.add('hide');
    editBtn.type = 'button';
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';

    editBtn.addEventListener('click', () => {
      editTodoList(todo);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.classList.add('hide');
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '<i class="fa fa-trash">';

    deleteBtn.addEventListener('click', () => {
      removeTodoList(todo.index);
    });

    const moreEllipsisBtn = document.createElement('button');
    moreEllipsisBtn.classList.add('more-btn');
    moreEllipsisBtn.type = 'button';
    moreEllipsisBtn.innerHTML = '<i class="fa fa-ellipsis-v"></i>';

    moreEllipsisBtn.addEventListener('click', () => {
      editBtn.classList.toggle('hide');
      deleteBtn.classList.toggle('hide');
    });

    todoContentElement.appendChild(todoCheckboxElement);
    todoContentElement.appendChild(todoDescriptionElement);

    actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);
    actionBtns.appendChild(moreEllipsisBtn);

    todoLiElement.appendChild(todoContentElement);
    todoLiElement.appendChild(actionBtns);
    todoListElement.appendChild(todoLiElement);
  });

  saveData();
};

const addTodo = () => {
  const desc = document.querySelector('.inputTask');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = todoList.length + 1;
    todoList.push({ completed, description, index });
    displayToDo();
    saveData();
    desc.value = '';
  }
  todoList = todoList.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
};

const saveEdit = () => {
  const desc = document.querySelector('.inputTask');
  if (desc.value) {
    todoList = todoList.map((todo) => {
      if (todo.index === todoEdit.index) {
        return { ...todo, description: desc.value };
      }
      return todo;
    });
    displayToDo();
    saveData();
    desc.value = '';
    isEditing = false;
    todoEdit = null;
  }
};

const getIsEditing = () => isEditing;

export {
  getStorageData,
  clearCompletedList,
  clearCheckBox,
  addTodo,
  saveEdit,
  displayToDo,
  getIsEditing,
};
