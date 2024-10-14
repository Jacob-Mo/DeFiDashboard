import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router, Route, Switch } from 'react-router-dom';

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

app.get('/*', (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(<App />);

  const html = `
    <!doctype html>
    <html>
      <head>
        <title>DeFi Dashboard</title>
      </head>
      <body>
        <div id="root">${app}</div>
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