import { createSignal } from "solid-js";

export type AppProps = {
  name: string;
};

const App = (props: AppProps = { name: "Joe" }) => {
  return (
    <>
      <h1>Hello, {props.name}</h1>
      <Counter />
    </>
  );
};

const Counter = () => {
  const [count, setCount] = createSignal(0);
  return (
    <button onClick={() => setCount(count() + 1)}>
      You clicked me {count()} times
    </button>
  );
};

export default App;
