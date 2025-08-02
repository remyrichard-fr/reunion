import Clouds from "./components/Clouds";
import CountDown from "./components/CountDown";
import Plane from "./components/Plane";

function App() {
  return (
    <>
      <div className="overlay"></div>
      <CountDown />
      <div className="airplaneAnimation">
        <Plane />
        <Clouds />
      </div>
    </>
  );
}

export default App;
