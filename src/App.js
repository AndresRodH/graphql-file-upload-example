import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";
import { createClient } from "./client";
import useLocalStorage from "./useLocalStorage";
import Info from "./Info";
import Uploader from "./Uploader";

const LOCALSTORAGE_KEY = "ronin-upload";

function App() {
  const [info, setInfo] = useLocalStorage(LOCALSTORAGE_KEY, {
    info: "",
    endpoint: ""
  });
  const [client, setClient] = React.useState();

  React.useEffect(() => {
    setClient(createClient(info));
  }, [info]);

  return (
    <div className="App">
      <h1>GraphQL File Uploads</h1>
      <div className="main-layout">
        <section className="info">
          <Info info={info} onSubmit={setInfo} />
        </section>
        {info.token && info.endpoint && client && (
          <section className="uploader">
            <ApolloProvider client={client}>
              <Uploader />
            </ApolloProvider>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
