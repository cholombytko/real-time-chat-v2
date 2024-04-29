import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button/Button';
import './Login.css'

const LOGIN_ENDPOINT = 'http://localhost:4000/api/auth/login';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [isFailed, setIsFailed] = useState(false);
  const navigate = useNavigate();

	const handleLogin = async (e) => {
    e.preventDefault();

		if (!username.trim()) {
			alert("Username cannot be empty.");
			return;
		}

    try {
      const response = await axios.post(LOGIN_ENDPOINT, {
        username,
      });
      localStorage.setItem('token', response.data.token);
			localStorage.setItem('username', username);
      navigate('/chats');
    } catch (error) {
			setIsFailed(true);
      console.error(error);
    }
  };

	return ( 
		<div className='login'>
			<h2>Join to us!</h2>
      <form onSubmit={handleLogin} className='form'>
        <input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
        <Button type='submit'>Login</Button>
      </form>
			<h3>{isFailed ? 'Login Failed. Try again!' : ''}</h3>
		</div>
	);
}
 
export default LoginForm;