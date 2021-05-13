import './Login.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('example@boopro.tech');
  const [password, setPassword] = useState('123123');
  const validUser = [{ email: 'example@boopro.tech', password: '123123' }];
  const authContext = useContext(AuthContext);

  // zakomentarisan je login post deo jer ako sam vas dobro skapirao isteko je domen samim tim ne mogu da se loginujem na zeljeni nacin
  // const submitLogin = () => {
  //   axios.post('http://dev.api.kabox.io/api/auth/login', { email, password });
  // };

  const loginSimulation = (userData) => {
    const validUsers = [{ email: 'example@boopro.tech', password: '123123' }];

    const validUser = validUsers.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    const validEmail = validUsers.find(
      (user) =>
        user.email === userData.email && user.password !== userData.password
    );
    console.log(validUser);
    if (validUser) {
      return { statusCode: 200, user: validUser, jwtToken: 'validToken' };
    } else if (validEmail) {
      return { statusCode: 401, user: null, jwtToken: '' };
    } else {
      return { statusCode: 422, user: null, jwtToken: '' };
    }
  };

  const submitLogin = () => {
    const response = loginSimulation({ email, password });
    console.log(response);
    if (response.statusCode === 200) {
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('isLoggedIn', true);
      authContext.setIsLoggedIn(true);
      authContext.setEmail(response.user.email);
    } else if (response.statusCode === 401) {
      setErrorMessage('Wrong Password');
    } else if (response.statusCode === 422) {
      setErrorMessage('Wrong Email');
    } else {
      setErrorMessage('Something Went Wrong');
    }
  };

  return (
    <div className="login_view">
      <div className="login_part">
        <label className="user_label">Email:</label>
        <input
          className="login_input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className="user_label">Password:</label>
        <input
          className="login_input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="error_message">{errorMessage}</div>
        <button onClick={() => submitLogin()}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
