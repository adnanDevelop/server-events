import { useMemo, useState } from "react";

const UseMemo = () => {
  const [myNum, setMyNum] = useState(0);
  const [show, setShow] = useState(false);

  const getValue = () => setMyNum(myNum + 1);

  const countNumber = (num: number) => {
    for (let i = 0; i <= 1000000000; i++) {
      /* empty */
    }

    console.log(num);
    return num;
  };

  const returnData = useMemo(() => {
    return countNumber(myNum);
  }, [myNum]);

  return (
    <div>
      <button onClick={getValue}>Counter</button>
      <p>New number: {returnData}</p>
      <button onClick={() => setShow(!show)}>
        {show ? "You clicked me" : "Click me "}
      </button>
    </div>
  );
};

export default UseMemo;
