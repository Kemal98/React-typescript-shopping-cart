import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ShopingCartProvider } from "./context/ShoppingContext";
import About from "./pages/About";
import Store from "./pages/Store";

function App() {
  return (
    <ShopingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShopingCartProvider>
  );
}

export default App;
