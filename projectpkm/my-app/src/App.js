import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './Component/Landing Page/About';
import Dashboard from './Component/Landing Page/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
