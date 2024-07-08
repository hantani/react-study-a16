import { RecoilRoot } from "recoil";
import WantCountry from "./components/WantCountry";
import BeenCountry from "./components/BeenCountry";
import LikeCountry from "./components/LikeCountry";

function App() {
  return (
    <RecoilRoot>
      <div>
        <WantCountry />
        <BeenCountry />
        <LikeCountry />
      </div>
    </RecoilRoot>
  );
}

export default App;
