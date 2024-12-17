import { memo } from "react";

const Todo = ({ changeValue, childCount }) => {
  console.log("Child render");
  return (
    <div>
      <p>Child component: {childCount}</p>
      {/* <button onClick={changeValue}>Trigger</button> */}
      <button>Trigger</button>
    </div>
  );
};

// export default memo(Todo);
export default memo(Todo);
