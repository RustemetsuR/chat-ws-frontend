import { Route, Switch } from 'react-router-dom';
import './App.css';
import Container from './components/Container/Container';
import Layout from './components/Layout/Layout';
import RedirectToHome from './components/Layout/RedirectToHome/RedirectToHome';
import Chat from './containers/Chat/Chat';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Container>
          <Layout>
            <Route exact path='/' component={RedirectToHome} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/chat' component={Chat} />
          </Layout>
        </Container>
      </Switch>
    </div>
  );
}

export default App;
