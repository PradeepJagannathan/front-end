import { NewsReader } from './NewsReader';
import './App.css';

function App() {

  return (
    <div>
      <div className="main-layout">
        <header>
          <h1 className="app-title">News Reader App</h1>
        </header>
        <NewsReader />
      </div>
    </div >
  );
}

export default App;
