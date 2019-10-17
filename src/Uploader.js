import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const FILE_UPLOAD = gql`
  # these all the properties as of 10/16/2019
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

export default function Uploader() {
  const [data, setData] = React.useState({});
  const [uploadFiles, { error }] = useMutation(FILE_UPLOAD, {
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
                  {file.contentType.includes("image") && (
                    <div
                      className="file-grid-item"
                      style={{
                        backgroundImage: `url(${file.url})`
                      }}
                    />
                  )}
                  {file.contentType.includes("text") && (
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
