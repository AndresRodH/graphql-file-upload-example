import React from "react";
import { UserProfileProvider } from "./hooks/useProfile";
import AppRouter from "./AppRouter";
import "./App.css";

function App() {
  return (
    <UserProfileProvider>
      <AppRouter />
    </UserProfileProvider>
  );
}

export default App;

// const [something, setSomething] = [state, updater]
// hook = useSomething
// function Counter() {
//   const { count, increment, decrement } = useCounter(100);

//   React.useEffect(() => {
//     console.log("counter was clicked:", count);
//   }, [count]);

//   return (
//     <>
//       <button
//         style={{
//           padding: "8px 16px",
//           borderRadius: 6,
//           backgroundColor: "palevioletred",
//           border: "none",
//           textTransform: "uppercase"
//         }}
//         onClick={increment}
//       >
//         increment
//       </button>
//       {count}
//       <button
//         style={{
//           padding: "8px 16px",
//           borderRadius: 6,
//           backgroundColor: "palevioletred",
//           border: "none",
//           textTransform: "uppercase"
//         }}
//         onClick={decrement}
//       >
//         decrement
//       </button>
//     </>
//   );
// }

// function useCounter(initialCount = 0) {
//   const [count, setCount] = React.useState(initialCount);
//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);

//   return {
//     count,
//     increment,
//     decrement
//   };
// }

// function ChuckNorrisJoke() {
//   const [loading, setLoading] = React.useState(true);
//   const [joke, setJoke] = React.useState("");

//   function fetchRandomJoke() {
//     setLoading(true);
//     fetch("https://api.chucknorris.io/jokes/random", {
//       mode: "cors"
//     })
//       .then(response => response.json())
//       .then(data => {
//         setJoke(data.value);
//         setLoading(false);
//       });
//   }

//   React.useEffect(() => {
//     fetchRandomJoke();
//   }, []);

//   return (
//     <div style={{ padding: 8, backgroundColor: "white", color: "black" }}>
//       {loading ? (
//         "Loading..."
//       ) : (
//         <>
//           <h1>{joke}</h1>
//           <button
//             style={{
//               padding: "8px 16px",
//               borderRadius: 6,
//               backgroundColor: "red",
//               border: "none",
//               textTransform: "uppercase"
//             }}
//             onClick={fetchRandomJoke}
//           >
//             Fetch another one
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
