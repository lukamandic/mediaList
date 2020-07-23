import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import AlbumsList from './AlbumsList';
import Artist from './Artist'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:2000/graphql'
})

const client = new ApolloClient({
  cache,
  link,
})

ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={AlbumsList} />
          <Route path="/artist/:id" component={Artist} />
        </Switch>
      </Router>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
