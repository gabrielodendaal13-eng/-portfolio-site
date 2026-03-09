/* ========================================
  JAVASCRIPT DEMO - Gabriel's Portfolio
  Demonstrating vanilla JS skills
  One-line: Handles interactive demos (calculator, shapes, SVG, data loader, love API, to-do list).
  ======================================== */

// ========================================
// CODE PRINCIPLES: Variables and Constants
// ========================================

const SHAPE_COLORS = ['#FF6B6B', '#4D96FF', '#FFD93D', '#51CF66', '#A78BFA'];
const SHAPE_SIZES = [20, 30, 40, 50];
let shapeCount = 0;
let todoCount = 0;
let rotationAngle = 0;

// ========================================
// CALCULATOR - Form Input & Math Operations
// ========================================

const calculatorForm = document.getElementById('calculatorForm');
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculatorOutput = document.getElementById('calculatorOutput');
const resultValue = document.getElementById('resultValue');

// Event Listener for Calculator
calculatorForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Programming construct: Prevent default form behavior

  // Code Principles: Reading form values
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const operation = operationSelect.value;

  // Code Principles: Use of conditionals (if statements)
  let result;
  if (operation === 'add') {
    result = num1 + num2;
  } else if (operation === 'subtract') {
    result = num1 - num2;
  } else if (operation === 'multiply') {
    result = num1 * num2;
  } else if (operation === 'divide') {
    // Validation
    if (num2 === 0) {
      result = 'Cannot divide by zero';
    } else {
      result = num1 / num2;
    }
  } else if (operation === 'power') {
    // Code Principles: Using Math object functions
    result = Math.pow(num1, num2);
  }

  // Code Principles: Output to HTML (DOM manipulation)
  resultValue.textContent = typeof result === 'number' ? result.toFixed(2) : result;
  calculatorOutput.classList.remove('hidden');
});

// ========================================
// RANDOM SHAPE GENERATOR - DOM Manipulation & Events
// ========================================

const generateShapeBtn = document.getElementById('generateShapeBtn');
const clearShapesBtn = document.getElementById('clearShapesBtn');
const drawingCanvas = document.getElementById('drawingCanvas');
const shapeCountDisplay = document.getElementById('shapeCount');
const shapeCountValue = document.getElementById('shapeCountValue');

// Event Listener for Shape Generation
generateShapeBtn.addEventListener('click', () => {
  // Code Principles: Using Math functions (random, ceil)
  const randomSize = SHAPE_SIZES[Math.floor(Math.random() * SHAPE_SIZES.length)];
  const randomColor = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];

  // Create shape element
  const shape = document.createElement('div');
  shape.className = 'drawing-item';
  shape.style.width = randomSize + 'px';
  shape.style.height = randomSize + 'px';
  shape.style.backgroundColor = randomColor;

  // Code Principles: Add animation/transition
  shape.style.animation = `fadeIn 0.3s ease-in`;

  // Add click event to remove shape
  shape.addEventListener('click', () => {
    shape.remove();
    shapeCount--;
    updateShapeCount();
  });

  // Code Principles: DOM output - append child
  drawingCanvas.appendChild(shape);
  shapeCount++;
  updateShapeCount();
});

// Clear all shapes
clearShapesBtn.addEventListener('click', () => {
  drawingCanvas.innerHTML = '';
  shapeCount = 0;
  updateShapeCount();
});

// Helper function to update shape count display
function updateShapeCount() {
  if (shapeCount > 0) {
    shapeCountValue.textContent = shapeCount;
    shapeCountDisplay.classList.remove('hidden');
  } else {
    shapeCountDisplay.classList.add('hidden');
  }
}

// ========================================
// SVG ANIMATION - Changing SVG Attributes
// ========================================

const rotateBtn = document.getElementById('rotateBtn');
const colorChangeBtn = document.getElementById('colorChangeBtn');
const animatedSvg = document.getElementById('animatedSvg');

// Rotate button event listener
rotateBtn.addEventListener('click', () => {
  // Code Principles: Math operations
  rotationAngle = (rotationAngle + 45) % 360;
  animatedSvg.style.transform = `rotate(${rotationAngle}deg)`;
});

// Color change button event listener
colorChangeBtn.addEventListener('click', () => {
  const shapes = animatedSvg.querySelectorAll('circle, rect, polygon');

  // Code Principles: Using for loop to iterate
  for (let i = 0; i < shapes.length; i++) {
    // Code Principles: Getting random color from array
    const newColor = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
    shapes[i].setAttribute('fill', newColor);
  }
});

// ========================================
// DATA LOADING - Internal JSON File
// ========================================

const loadDataBtn = document.getElementById('loadDataBtn');
const dataList = document.getElementById('dataList');

// Event listener for loading data
loadDataBtn.addEventListener('click', () => {
  // Code Principles: Fetch data from internal JSON file
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Code Principles: Clear previous data
      dataList.innerHTML = '';

      // Code Principles: Using forEach to iterate over array
      data.languages.forEach(language => {
        const listItem = document.createElement('li');
        listItem.className = 'data-item';

        // Code Principles: Creating content with template literals
        listItem.innerHTML = `
          <strong>${language.name}</strong> - 
          Proficiency: ${language.proficiency}% | 
          Experience: ${language.experience}
        `;

        dataList.appendChild(listItem);
      });

      dataList.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error loading data:', error);
      dataList.innerHTML = '<li class="data-item">Error loading data. Please try again.</li>';
      dataList.classList.remove('hidden');
    });
});

// ========================================
// EXTERNAL API - Love Calculator
// ========================================

const firstNameInput = document.getElementById('firstName');
const secondNameInput = document.getElementById('secondName');
const loveCalcBtn = document.getElementById('loveCalcBtn');
const loveOutput = document.getElementById('loveOutput');
const loveResult = document.getElementById('loveResult');
const loveDescription = document.getElementById('loveDescription');

// Event listener for love calculator
loveCalcBtn.addEventListener('click', async () => {
  // Code Principles: Reading form values
  const firstName = firstNameInput.value.trim();
  const secondName = secondNameInput.value.trim();

  // Code Principles: Input validation (if statement)
  if (!firstName || !secondName) {
    loveResult.textContent = 'Please enter both names!';
    loveDescription.textContent = '';
    loveOutput.classList.remove('hidden');
    return;
  }

  try {
    // Code Principles: Async/await for external API call
    const response = await fetch(
      `https://api.lovecalculator.com/getPercentage?fname=${firstName}&sname=${secondName}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch love calculation');
    }

    const data = await response.json();

    // Code Principles: Processing API response
    loveResult.textContent = `${firstName} & ${secondName}: ${data.percentage}% Compatible!`;
    loveDescription.textContent = data.result;
    loveOutput.classList.remove('hidden');
  } catch (error) {
    console.error('Error:', error);
    loveResult.textContent = 'Unable to calculate love compatibility';
    loveDescription.textContent = 'Please check your connection and try again.';
    loveOutput.classList.remove('hidden');
  }
});

// ========================================
// TO-DO LIST - Form Processing & Local Storage
// ========================================

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCountDisplay = document.getElementById('todoCount');
const todoCountValue = document.getElementById('todoCountValue');

// Code Principles: Load todos from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    const todos = JSON.parse(savedTodos);
    todos.forEach(todo => {
      addTodoToDOM(todo);
    });
  }
});

// Event listener for todo form submission
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Code Principles: Reading form value
  const todoText = todoInput.value.trim();

  // Code Principles: Input validation
  if (!todoText) {
    return;
  }

  addTodoToDOM(todoText);

  // Code Principles: Save to local storage
  saveTodos();

  // Clear input
  todoInput.value = '';
  todoInput.focus();
});

// Helper function to add todo to DOM
function addTodoToDOM(todoText) {
  const todoItem = document.createElement('li');
  todoItem.className = 'data-item';
  todoItem.textContent = '✓ ' + todoText;

  // Code Principles: Event listener on dynamically created element
  todoItem.addEventListener('click', () => {
    todoItem.remove();
    todoCount--;
    updateTodoCount();
    saveTodos();
  });

  todoList.appendChild(todoItem);
  todoCount++;
  updateTodoCount();
}

// Helper function to update todo count
function updateTodoCount() {
  if (todoCount > 0) {
    todoCountValue.textContent = todoCount;
    todoCountDisplay.classList.remove('hidden');
  } else {
    todoCountDisplay.classList.add('hidden');
  }
}

// Helper function to save todos to local storage
function saveTodos() {
  const todos = [];

  // Code Principles: Using forEach to iterate DOM elements
  todoList.querySelectorAll('li').forEach(item => {
    // Remove the checkmark and trim
    todos.push(item.textContent.replace('✓ ', '').trim());
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// ========================================
// KEYBOARD SHORTCUT - Additional feature
// ========================================

// Code Principles: Event listener for keyboard
document.addEventListener('keypress', (event) => {
  // Alt + C for calculator
  if (event.altKey && event.key === 'c') {
    num1Input.focus();
  }
});

// ========================================
// Animation keyframe (added via JavaScript)
// ========================================

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

console.log('JavaScript Demo loaded successfully - All features are functional!');
