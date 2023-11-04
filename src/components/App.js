import DualNavbar from "./DualNavbar";
import FetchApi from "./FetchApi";
import HeroBanner from "./HeroBanner";
import Slider from "./Slider";
import Main from "./Main";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from "../utilities/store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <DualNavbar />
        <Outlet />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
