  //debugger;
  var todoList = {
      todos: [],
      /*displayTodos: function() {

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
      },*/
      addTodo: function(todoText) {
          debugger;
          this.todos.push({
              todoText: todoText,
              completed: false
          });
          //this.displayTodos();
      },
      changeTodo: function(position, todoText) {
          this.todos[position].todoText = todoText;
          //this.displayTodos();
      },
      deleteTodo: function(position) {
          this.todos.splice(position, 1);
          //this.displayTodos();
      },
      toggleCompleted: function(position) {
          var todo = this.todos[position];
          todo.completed = !todo.completed;
          //this.displayTodos();
      },
      toggleAll: function() {
          var totalTodos = this.todos.length;
          var completedTodos = 0;
          // Get number of completed todos
          this.todos.forEach(function(todo) {
              if (todo.completed === true) {
                  completedTodos++;
              }
          });

          this.todos.forEach(function(todo) {
              //case 1: if everything is true make everything false
              if (completedTodos === totalTodos) {
                  todo.completed = false;
              }
              //case2: else make everything true
              else {
                  todo.completed = true;
              }
          });
      }
  };

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
          var text = document.getElementById('input-add');
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
      deleteTodo: function(position) {
          //debugger;
          todoList.deleteTodo(position);
          view.displayTodos();
      },
      toggleAll: function() {
          todoList.toggleAll();
          view.displayTodos();
      },
      toggleCompleted: function(position) {
          //var togcomp = document.getElementById('complete');
          todoList.toggleCompleted(position);
          //togcomp.value = '';
          view.displayTodos();
      }
  };

  var view = {
      displayTodos: function() {

          var todosUl = document.querySelector('ul');
          todosUl.innerHTML = '';
          /*for (var i = 0; i < todoList.todos.length; i++) {
              var todoli = document.createElement('li');
              var todo = todoList.todos[i];
              var todoTextWithC = '';
              if (todo.completed === true) {
                  todoTextWithC = '(x)' + " " + todo.todoText;
              } else {
                  todoTextWithC = '( )' + " " + todo.todoText;
              }
              todoli.id = i;
              todoli.textContent = todoTextWithC;
              todoli.appendChild(this.createDeletebutton());
              todosUl.appendChild(todoli);
          }*/

          // using for each
          todoList.todos.forEach(function(todo, position) {
              var todoli = document.createElement('li');
              var todoTextWithC = '';
              if (todo.completed === true) {
                  todoTextWithC = '(x)' + " " + todo.todoText;
              } else {
                  todoTextWithC = '( )' + " " + todo.todoText;
              }
              todoli.id = position;
              todoli.textContent = todoTextWithC;
              todoli.appendChild(this.createDeletebutton());
              todoli.appendChild(this.createTogglebutton());
              todosUl.appendChild(todoli);
          }, this);
      },
      createDeletebutton: function() {
          var deleteButton = document.createElement('button');
          deleteButton.textContent = "Delete";
          deleteButton.className = 'deleteButton';
          return deleteButton;
      },
      createTogglebutton: function() {
          var toggleButton = document.createElement('button');
          toggleButton.textContent = "Check";
          toggleButton.className = 'toggleButton';
          return toggleButton;
      },

      setUpEventListners: function() {
          var todosUl = document.querySelector('ul');
          todosUl.addEventListener('click', function(event) {

              //get element that was clicked on
              var elementClicked = event.target;
              //check if the element is deletebutton
              if (elementClicked.className === 'deleteButton') {
                  //run handlers deletTodo (position)
                  handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
              } else if (elementClicked.className === 'toggleButton') {
                  //run handlers toggle (position)
                  handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
              }
          });
      }

  };
  view.setUpEventListners();