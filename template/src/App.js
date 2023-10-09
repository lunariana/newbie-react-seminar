import React, {useState, useEffect} from 'react';
import './App.css';
// import TodoForm from './TodoForm';

const App = () => {

  const [todoCount, setTodoCount] = useState(0);  // keep track of number of todo items
  const [todos, setTodos] = useState([]);
  const [priority, setPriority] = useState("medium");
  const [activeFilters, setActiveFilters] = useState(new Set());

  // triggered when selected radio button for priority is changed; store the new priority value
  const onFormOptionChange = (e) => {
    // setPriority(Number(e.target.value));
    setPriority(e.target.value);
  };

  // add new todo item to the list
  const handleItemSubmit = (e) => {
    e.preventDefault();  // prevent the page from reloading?
    
    const title = e.target.title.value;
    const description = e.target.description.value;
    const deadline = e.target.deadline.value;
    setTodos([
      ...todos,
      {
        id: todoCount,
        priority: priority,
        title: title,
        description,
        deadline,
      }
    ]);

    setTodoCount(todoCount + 1);  // keep track of item number
  };

  // log todo list as each item is added
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // update active filters when filters are changed
  const onFilterOptionChange = (e) => {
    const filter = e.target.value;
    const isActive = e.target.checked;
    console.log(filter);
    console.log(isActive);

    let activeFiltersCopy = new Set(activeFilters);
    if (isActive) {
      activeFiltersCopy.add(filter);
    } else {
      activeFiltersCopy.delete(filter);
    }
    setActiveFilters(activeFiltersCopy);
    console.log(activeFilters);
    console.log(activeFilters.has(filter));
    console.log(activeFilters.has('high'));
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className="form">
        <form onSubmit={handleItemSubmit}>
          <h2>Add an Item</h2>
          <label>Priority: </label><br></br>
          <input type="radio" name="priority" id="high" value="high" required onChange={onFormOptionChange}/>
          <label htmlFor="high">High</label><br></br>
          <input type="radio" name="priority" id="medium" value="medium" checked onChange={onFormOptionChange}/>
          <label htmlFor="mid">Medium</label><br></br>
          <input type="radio" name="priority" id="low" value="low" onChange={onFormOptionChange}/>
          <label htmlFor="low">Low</label><br></br>

          <label htmlFor="title">Title: </label>
          <input type="text" id="title" defaultValue="read" required/><br></br>

          <label htmlFor="description">Description: </label><br></br>
          <textarea id="description" cols="40" rows="4" defaultValue="fav book"></textarea><br></br>

          <label htmlFor="deadline">Deadline: </label>
          <input type="date" id="deadline" defaultValue="2023-10-31" required/><br></br>
          <br></br>

          <input type="submit" value="Add item"/>
        </form>
      </div>
      <div className="items">
        <h2>My Todos</h2>
        <div className="filters">
          <span>Filter by Priority: </span>
          <form>
            <input type="checkbox" name="filter" id="fhigh" value="high" onChange={onFilterOptionChange}/>
            <label htmlFor="fhigh">High</label>
            <input type="checkbox" name="filter" id="fmedium" value="medium" onChange={onFilterOptionChange}/>
            <label htmlFor="fmedium">Medium</label>
            <input type="checkbox" name="filter" id="flow" value="low" onChange={onFilterOptionChange}/>
            <label htmlFor="flow">Low</label>
          </form>
        </div>
        {todos
          .filter((todo) => (activeFilters.has(todo.priority)))
          .map((todo) => (
            <>
              <p className="item" key="{todo.id}">
                Priority: {todo.priority}<br></br>
                Title: {todo.title}<br></br>
                Description: {todo.description}<br></br>
                Deadline: {todo.deadline}<br></br>
              </p>
            </>
        ))}
      </div>
    </div>
  );
};

export default App;
