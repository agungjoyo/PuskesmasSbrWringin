import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './Component/Landing Page/about';
import LandingPage from './Component/Landing Page/landingpage';
import DashboardKIA from './Component/dashboardKIA/dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/dashboardKIA" component={DashboardKIA} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
