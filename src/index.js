import './style.css';
import {
  getStorageData, clearCompletedList, clearCheckBox, addTodo, saveEdit, displayToDo, getIsEditing,
} from './module/addRemove.js';
//Onload
window.onload = () => {
  getStorageData();
  displayToDo();
};

const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', () => {
  clearCheckBox();
  window.location.reload();
});

const descriptions = document.querySelector('.inputTask');
descriptions.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getIsEditing()) {
      addTodo();
    } else saveEdit();
  }
});

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
  clearCompletedList();
});
