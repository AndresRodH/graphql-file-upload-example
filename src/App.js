import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";
import { createClient } from "./client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import useLocalStorage from "./useLocalStorage";
import decode from "jwt-decode";

const FILE_UPLOAD = gql`
  mutation($files: [Upload!]!) {
    fileUpload(files: $files) {
      aliases
      chunkSize
      contentType
      filename
      id
      length
      md5
      metadata
      token
      uploadDate
      url
    }
  }
`;

function Uploader() {
  const [data, setData] = React.useState({});
  const [uploadFiles, { error }] = useMutation(FILE_UPLOAD, {
    errorPolicy: "all",
    onCompleted: data => setData(data)
  });
  const [showGrid, setShowGrid] = React.useState(false);

  return (
    <>
      <div className="uploader-header">
        <input
          type="file"
          required
          multiple
          onChange={event => {
            uploadFiles({
              variables: { files: event.target.files }
            });
          }}
        />
        <button onClick={() => setShowGrid(!showGrid)}>
          {showGrid ? "Raw" : "Grid"}
        </button>
      </div>
      {error && <code style={{ color: "red" }}>{error.message}</code>}
      {showGrid ? (
        <div className="file-grid">
          {data &&
            data.fileUpload &&
            data.fileUpload.map((file, idx) => (
              <React.Fragment key={idx}>
                <div onClick={() => window.open(file.url, "_blank")}>
                  {file.contentType === "image/png" ? (
                    <div
                      className="file-grid-item"
                      style={{
                        backgroundImage: `url(${file.url})`
                      }}
                    />
                  ) : (
                    <div className="file-grid-item">{file.filename}</div>
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>
      ) : (
        <div className="raw-view">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

const LOCALSTORAGE_KEY = "ronin-upload";

function validateToken(token) {
  try {
    const now = Date.now() / 1000;
    if (decode(token).exp < now) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function Info({ info, onSubmit }) {
  const [editing, setEditing] = React.useState(!(info.token && info.endpoint));
  const [token, setToken] = React.useState(info.token);
  const [isTokenValid, setIsTokenValid] = React.useState(
    validateToken(info.token)
  );
  const [endpoint, setEndpoint] = React.useState(info.endpoint);

  React.useEffect(() => {
    // check every minute for token validity
    setIsTokenValid(validateToken(info.token));
    const timer = setTimeout(() => {
      setIsTokenValid(validateToken(info.token));
    }, 6000);
    return () => clearTimeout(timer);
  }, [info.token]);

  return (
    <>
      <h3>Token:</h3>
      {editing ? (
        <textarea
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Auth token"
        />
      ) : (
        <code style={{ color: isTokenValid ? "palegreen" : "red" }}>
          {isTokenValid ? "Valid" : "Invalid/Expired"}
        </code>
      )}
      <h3>Endpoint:</h3>
      {editing ? (
        <input
          type="text"
          value={endpoint}
          onChange={e => setEndpoint(e.target.value)}
          placeholder="GraphQL endpoint (https://dev.roninservices.com/ronin/gql)"
        />
      ) : (
        <a
          className="App-link"
          href={endpoint}
          target="_blank"
          rel="noopener noreferrer"
        >
          {endpoint}
        </a>
      )}

      <button
        onClick={() => {
          if (editing) {
            onSubmit({ token, endpoint });
            setEditing(false);
          } else {
            setEditing(true);
          }
        }}
        style={{
          marginTop: 16
        }}
      >
        {editing ? "Save" : "Edit"}
      </button>
    </>
  );
}

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
