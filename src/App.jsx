import Todo from './components/Todo';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center p-4 transition-colors duration-300">
        <Todo />
      </div>
    </ThemeProvider>
  );
}

export default App;
