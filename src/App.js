import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from './Form/loginForm';
import RegisterForm from './Form/registerForm';

function App() {
  return (
    <div className="App">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
