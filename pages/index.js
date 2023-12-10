// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [item, setItem] = useState({ name: '', price: 0 });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async () => {
    try {
      const response = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={fetchData}>Fetch Data</button>

      <h2>Create Item</h2>
      <label>Name:</label>
      <input
        type="text"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />
      <label>Price:</label>
      <input
        type="number"
        value={item.price}
        onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) })}
      />
      <button onClick={postData}>Create Item</button>
    </div>
  );
}
