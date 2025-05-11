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
}

export default App;