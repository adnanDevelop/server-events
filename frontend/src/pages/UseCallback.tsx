import { useCallback, useState } from "react";
import Todo from "./Todo";
import { Link } from "react-router-dom";

const UseCallback = () => {
  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const incrementCount = () => setCount((prev) => prev + 1);

  const changeValue = useCallback(() => {
    setChildCount((prev) => prev + 1);
  }, [childCount]);

  console.log("Parent render");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment Count</button>

      {/* Pass static props to child */}
      <Todo
        changeValue={changeValue}
        childCount={childCount}
        // setChildCount={setChildCount}
      />

      <div className="flex flex-col gap-y-3 text-blue-500 mt-[50px]">
        <Link to="/memo">Navigate to memo example</Link>
        <Link to="/api-example">Navigate to memo example with api</Link>
        <Link to="/server-event">Server Event Example</Link>
        <Link to="/chat">Live Chat</Link>
      </div>
    </div>
  );
};

export default UseCallback;
