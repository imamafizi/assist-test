import { Provider } from "react-redux";
import store from "./redux/store";
import PegawaiForm from "./components/pegawaiForm";
import PegawaiTable from "./components/pegawaiTable";

function App() {
  return (
    <Provider store={store}>
      <PegawaiForm />
      <PegawaiTable />
    </Provider>
  );
}

export default App;
