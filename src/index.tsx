
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ApolloProvider } from "react-apollo";
//import { fromPromise, ApolloLink } from "apollo-link";
import { onError } from "@apollo/client/link/error";
// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import  {createUploadLink}  from "apollo-upload-client";
//import { createHttpLink } from "apollo-link-http";
import { setContext } from "@apollo/client/link/context";
import { UserContextProvider } from "./UserContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  from,
  HttpLink,
  createHttpLink
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'


const httpLink = createUploadLink({
  // uri: "https://api.g5.stagement.ir/graphql",
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      if (message === "Unauthorized") {
        // every 401/unauthorized error will be caught here and update the global local state
        localStorage.removeItem("accessToken");
        localStorage.setItem("loginState", "loggedOut");
        console.log("khataye barname");
      }
    });
    return;
  }
});

const client = new ApolloClient({
  // link: authLink.concat(httpLink).concat(errorLink),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

