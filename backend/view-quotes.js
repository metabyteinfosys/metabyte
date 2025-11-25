const http = require('http');

// Replace this with your actual token from login
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjA0YmIxYzljZDU3YmJjOGE0NjFmNCIsImVtYWlsIjoiYWRtaW5AbWV0YWJ5dGUuY29tIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3NjM3MjQyOTcsImV4cCI6MTc2NDMyOTA5N30.y3-_pZCv4aKjcwde00HUD9PBceDqcVTQaz7GVfWic-Q';

const getQuotes = () => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/quotes',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    
    res.on('data', (chunk) => {
      body += chunk;
    });
    
    res.on('end', () => {
      console.log('Status Code:', res.statusCode);
      const response = JSON.parse(body);
      const quotes = response.data || response;
      
      if (!Array.isArray(quotes)) {
        console.log('\nUnexpected response format');
        console.log(JSON.stringify(response, null, 2));
        process.exit(0);
      }
      
      console.log(`\n Total Quotes: ${quotes.length}`);
      
      if (quotes.length === 0) {
        console.log('\nNo quotes submitted yet. Submit a quote from the website first!');
        process.exit(0);
      }
      
      console.log('\n' + '='.repeat(80));
      quotes.forEach((quote, index) => {
        console.log(`\n${index + 1}. ${quote.name} (${quote.email})`);
        if (quote.company) console.log(`   Company: ${quote.company}`);
        console.log(`   Phone: ${quote.phone}`);
        console.log(`   Services: ${quote.services.join(', ')}`);
        console.log(`   Status: ${quote.status.toUpperCase()}`);
        if (quote.budget) console.log(`   Budget: ${quote.budget}`);
        if (quote.timeline) console.log(`   Timeline: ${quote.timeline}`);
        console.log(`   Description: ${quote.projectDescription}`);
        console.log(`   Submitted: ${new Date(quote.createdAt).toLocaleString()}`);
        console.log('   ' + '-'.repeat(76));
      });
      console.log('\n' + '='.repeat(80));
      process.exit(0);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });

  req.end();
};

console.log('Fetching quotes...\n');
getQuotes();
