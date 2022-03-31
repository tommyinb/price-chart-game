import { Chart } from "./charts/Chart";

function App() {
  return (
    <Chart
      points={[
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 300, y: 100 },
      ]}
    />
  );
}

export default App;
