const http = require('http');

// Login
const login = () => {
  const data = JSON.stringify({
    email: 'admin@metabyte.com',
    password: 'admin123'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
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
      console.log('Response:', JSON.stringify(JSON.parse(body), null, 2));
      const token = JSON.parse(body).token;
      console.log('\n===================');
      console.log('LOGIN SUCCESSFUL!');
      console.log('===================');
      console.log('\nSave this token:');
      console.log(token);
      console.log('\nUse it in headers as:');
      console.log(`Authorization: Bearer ${token}`);
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

console.log('Logging in...');
login();
