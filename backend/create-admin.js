const http = require('http');

// Create admin
const createAdmin = () => {
  const data = JSON.stringify({
    email: 'admin@metabyte.com',
    password: 'admin123',
    name: 'Admin User'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/create-admin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    
    res.on('data', (chunk) => {
      body += chunk;
    });
    
    res.on('end', () => {
      console.log('Status Code:', res.statusCode);
      console.log('Response:', body);
      process.exit(0);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });

  req.write(data);
  req.end();
};

// Wait 2 seconds then create admin
console.log('Waiting for server to start...');
setTimeout(createAdmin, 2000);
