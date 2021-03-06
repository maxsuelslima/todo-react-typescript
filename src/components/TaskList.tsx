import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'
//testando commit
//asasas
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { numberLiteralTypeAnnotation } from '@babel/types';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle!=""){
    setTasks([...tasks,{id:Math.random()*99999,title:newTaskTitle,isComplete:false}]);
  }
  }

  function handleToggleTaskCompletion(id: number) {
    const taski=tasks.findIndex((tasks)=>{
        return tasks.id==id
    })
    const x=[...tasks];
    x[taski].isComplete = ! x[taski].isComplete;
    setTasks(x)
  }

  function handleRemoveTask(id: number) {
    const taski=tasks.findIndex((tasks)=>{
      return tasks.id==id
  })
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }
  

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}