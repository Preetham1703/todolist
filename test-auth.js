const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAuth() {
  try {
    // First, let's try to login to get a token
    console.log('Attempting to login...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'sai@gmail.com',
        password: 'S@i170305'
      })
    });

    console.log('Login response status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (loginResponse.ok && loginData.token) {
      // Now test the todos endpoint with the token
      console.log('Testing todos endpoint with token...');
      const todosResponse = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({
          text: 'Test task from script',
          time: '2024-12-31T10:00:00.000Z'
        })
      });

      console.log('Todos response status:', todosResponse.status);
      const todosData = await todosResponse.json();
      console.log('Todos response:', todosData);

      // Also test getting todos
      console.log('Testing GET todos...');
      const getTodosResponse = await fetch('http://localhost:5000/api/todos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });

      console.log('GET todos response status:', getTodosResponse.status);
      const todos = await getTodosResponse.json();
      console.log('Todos in database:', todos);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth();
