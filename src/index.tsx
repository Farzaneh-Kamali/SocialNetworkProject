
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { UserContextProvider } from "./UserContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  from
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'


const httpLink = createUploadLink({ uri:"/graphql" });
const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem("accessToken");
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }));

  return forward(operation);
})

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
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
      query: {
          fetchPolicy: 'no-cache'
      }
  }
})

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

