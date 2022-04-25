import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = {name, email};

    // check user already exist
    users.forEach(user => {
      if (email === user.email) {
        alert('User already exist')
        return;
      }
    })

    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data];
      setUsers(newUsers);
      console.log('succeed to post', data)
    })
  }
  return (
    <div className="App">
      <h2>Our users</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="name" placeholder='Your name' required />
        <input type="email" name="email" id="email" placeholder='Your email' required />
        <input type="submit" value="Add user" />
      </form>
      {
        users.map(user => <p key={user.id}>
          <span><strong>Id:</strong> {user.id} </span>
          <span><strong>Name:</strong> {user.name} </span>
          <span><strong>Email:</strong> {user.email}</span>
        </p>)
      }
    </div>
  );
}

export default App;
