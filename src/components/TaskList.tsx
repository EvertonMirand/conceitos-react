import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { useMemo } from 'react';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const ids = useMemo<{ [K in keyof Number | string]: number }>(() =>
    tasks.reduce((prev, current, index) => ({ ...prev, [current.id]: index + 1 })
      , {}), [tasks])

  console.log(ids)

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle) {
      let equalKey = true
      do {
        const id = Math.floor(Math.random() * 10 + 1)
        if (!ids[id]) {
          equalKey = false
          const task: Task = {
            title: newTaskTitle,
            isComplete: false,
            id,
          }
          setTasks(value => [...value, task])
        }
      } while (equalKey);
    }

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const index = ids[id] - 1

    setTasks(value => {
      value[index].isComplete = !value[index].isComplete
      return [...value]
    })
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const index = ids[id] - 1
    setTasks(value => {
      value.splice(index, 1)
      return [...value]
    })
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
            <FiCheckSquare size={16} color="#fff" />
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
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}