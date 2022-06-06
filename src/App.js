import './App.css';
import { AppProvider } from './context/context';
import Header from './Header';
import CreateForm from './form/CreateForm';


function App() {
  return (
    <div className="App">
      <AppProvider>
        <Header />
        <CreateForm />
      </AppProvider>
    </div>
  );
}

export default App;
