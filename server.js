const http = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const server = http.createServer(async (req, res) => {
  try {
    await handle(req, res);
  } catch (err) {
    console.error('Request error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(port, hostname, async () => {
  console.log(`Server socket bound to http://${hostname}:${port}, initializing Next.js...`);
  try {
    await app.prepare();
    console.log(`> CleanNest Platform ready on http://localhost:${port}`);
  } catch (err) {
    console.error('Error during app.prepare():', err);
  }
});
