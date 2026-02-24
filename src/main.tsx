import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import {ApolloProvider} from "@apollo/client/react";
import { client } from "./graphql/client"

createRoot(document.getElementById("root")!).render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
);
