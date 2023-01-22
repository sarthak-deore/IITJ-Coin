import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NoWallet from "./components/no_wallet";

import { ChakraProvider } from "@chakra-ui/react";
import { BlockChainProvider } from "./context/blockChainContext";

import reportWebVitals from "./reportWebVitals";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    // if (this.state.errorInfo) {
    //   // Error path
    //   return <NoWallet />;
    // }
    // Normally, just render children
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
        <BlockChainProvider>
          <App />
        </BlockChainProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
