const fetch = require('node-fetch');

async function testAPI() {
  try {
    // Test without authentication first
    console.log('Testing API without auth...');
    const response = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: 'Test task',
        time: '2024-12-31T10:00:00.000Z'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response text:', await response.text());

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
