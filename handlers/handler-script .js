  //debugger;
  var todoList = {
      todos: [],
      displayTodos: function() {

          if (this.todos.length === 0) {
              console.log('Your to do list is empty');

          } else {
              console.log('My todos:');
              for (var i = 0; i < this.todos.length; i++) {
                  if (this.todos[i].completed === true) {
                      console.log('(x)', this.todos[i].todoText);
                  } else {
                      console.log('( )', this.todos[i].todoText);
                  }
              }
          }
      },
      addTodo: function(todoText) {
          this.todos.push({
              todoText: todoText,
              completed: false
          });
          this.displayTodos();
      },
      changeTodo: function(position, todoText) {
          this.todos[position].todoText = todoText;
          this.displayTodos();
      },
      deleteTodo: function(position) {
          this.todos.splice(position, 1);
          this.displayTodos();
      },
      toggleCompleted: function(position) {
          var todo = this.todos[position];
          todo.completed = !todo.completed;
          this.displayTodos();
      },
      toggleAll: function() {
          var totalTodos = this.todos.length;
          var completedTodos = 0;

          //get number of completed todos
          for (var i = 0; i < totalTodos; i++) {
              if (this.todos[i].completed === true) {
                  completedTodos++;
              }
          }

          //case1: if everything is true make everything false
          if (completedTodos === totalTodos) {
              for (var i = 0; i < totalTodos; i++) {
                  this.todos[i].completed = false;
              }
          }
          //case 2: make everything true
          else {
              for (var i = 0; i < totalTodos; i++) {
                  this.todos[i].completed = true;
              }
          }
      }

  };
  //1. want to get access to todolist button
  /* var displayTodosButton = document.getElementById('displaytodos');
  var toggleAllButton = document.getElementById('toggleAllbutton');

  //2. we want to display todo list when clicked the buttoon
  displayTodosButton.addEventListener('click', function() {
      todoList.displayTodos();
  });
  //3. want to toggle all when clicked toogle button
  toggleAllButton.addEventListener('click', function() {
      todoList.toggleAll();
  });*/

  //option 2
  var handlers = {
      displayTodo: function() {
          todoList.displayTodos();
          view.displayTodos();
      },
      toggleAll: function() {
          todoList.toggleAll();
          view.displayTodos();
      },
      addTodo: function() {
          var text = document.getElementById('input');
          todoList.addTodo(text.value);
          text.value = '';
          view.displayTodos();
      },
      changeTodo: function() {
          var toChange = document.getElementById('update-input');
          var position = document.getElementById('position');
          todoList.changeTodo(position.valueAsNumber, toChange.value)
          toChange.value = '';
          position.value = '';
          view.displayTodos();
      },
      deleteTodo: function() {
          //debugger;
          var pos = document.getElementById('delete');
          todoList.deleteTodo(pos.valueAsNumber);
          pos.value = '';
          view.displayTodos();
      },
      toggleAll: function() {
          todoList.toggleAll();
          view.displayTodos();
      },
      toggleCompleted: function() {
          var togcomp = document.getElementById('complete');
          todoList.toggleCompleted(togcomp.valueAsNumber);
          togcomp.value = '';
          view.displayTodos();
      }
  }

  var view = {
      displayTodos: function() {
          var todosUl = document.querySelector('ul');
          todosUl.innerHTML = '';
          for (var i = 0; i < todoList.todos.length; i++) {
              var todoli = document.createElement('li');
              var todo = todoList.todos[i];
              var todoTextWithC = '';
              if (todo.completed === true) {
                  todoTextWithC = '(x)' + " " + todo.todoText;
              } else {
                  todoTextWithC = '( )' + " " + todo.todoText;
              }

              todoli.textContent = todoTextWithC;
              todosUl.appendChild(todoli);
          }
      }
  }