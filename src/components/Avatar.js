import React from "react";

const colors = ["navy", "black", "green", "brown"];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function Avatar({ firstName, lastName }) {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          borderRadius: "50%",
          backgroundColor: colors[getRandomInt(colors.length)],
          textTransform: "uppercase",
          color: "white"
        }}
      >
        {firstName[0]}
        {lastName[0]}
      </div>
    </div>
  );
}
