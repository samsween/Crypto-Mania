import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
function Counter({ from, to, setFrom, setIsHigher, ...props }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(
      from,
      to,
      {
        duration: 1.5,
        onUpdate(value) {
          node.textContent = parseFloat(value).toFixed(2);
        },
        onComplete() {
          console.log(from, to);
          setFrom(to);
          setIsHigher("");
        },
      },
      []
    );

    return () => controls.stop();
  }, [from, to]);

  return <span {...props} ref={nodeRef} />;
}

export const AnimatePrice = ({ price }) => {
  const [from, setFrom] = useState(0);
  const [isHigher, setIsHigher] = useState("");
  useEffect(() => {
    price < from
      ? setIsHigher("animate-change-red-animation")
      : setIsHigher("animate-change-green-animation");
  }, [price]);
  if (isNaN(price)) return null;
  return (
    <Counter
      from={from}
      to={price}
      setFrom={setFrom}
      className={isHigher}
      setIsHigher={setIsHigher}
    />
  );
};
