import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import Heading from "./components/Heading";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="mx-5">
      <Heading />
      <Body />
    </div>
    </>
  );
}

export default App;
