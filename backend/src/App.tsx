import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('データ取得失敗:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>✅ Todo 一覧</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            {todo.completed ? ' ✅' : ' ⬜️'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;