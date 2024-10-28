import express, {Request, Response} from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

const PORT = process.env.PORT || 3000;
const BUILD_PATH = process.env.BUILD_PATH || 'build';

const app = express();

app.use(express.static(path.resolve(__dirname, BUILD_PATH)));

const DeFiDashboard = () => (
  <div>
    <h1>DeFi Dashboard</h1>
  </div>
);

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={DeFiDashboard} />
    </Switch>
  </Router>
);

app.get('/api/crypto', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    res.json(response.data);
  } catch (error) {
    console.error('API call error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/*', (req, res) => {
  const context = {};
  const renderedApp = ReactDOMServer.renderToString(<App />);

  const html = `
    <!doctype html>
    <html>
      <head>
        <title>DeFi Dashboard</title>
      </head>
      <body>
        <div id="root">${renderedApp}</div>
      </body>
    </html>
  `;

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(html);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

```typescript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeFiDashboard = () => {
  const [cryptoData, setCryptoData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/crypto');
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>DeFi Dashboard</h1>
      <pre>{JSON.stringify(cryptoData, null, 2)}</pre>
    </div>
  );
};