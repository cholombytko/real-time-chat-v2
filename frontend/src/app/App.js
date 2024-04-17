import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from '../components/login-form/Login';
import './App.css';
import ChatList from '../components/chat-list/ChatList';
import Chat from '../components/chat/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Real time-chat</h1>
        </header>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/chats" element={<ChatList/>}/>
            <Route path="/chat/:chatId" element={<Chat/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
