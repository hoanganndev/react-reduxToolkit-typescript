import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import TableUsers from "./components/Users/TableUsers";
import { ToastContainer } from "react-toastify";

import "./App.scss";
import AppRoute from "./routes/AppRoute";
function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
