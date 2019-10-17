import React from "react";
import decode from "jwt-decode";

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

export default function Info({ info, onSubmit }) {
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
