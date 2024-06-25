import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import UserDashboard from "./pages/UserDashboard";
import CatchMind from "./pages/CatchMind";
import GraphVisualizer from "./pages/GraphVisualizer";
import Omok from "./pages/Omok";
import TicTacToe from "./pages/Tictactoe";
import { UserProvider } from "./contexts/UserContext";

//TODO: 왜인지 모르겠는데 Tictactoe.css가 전역 css로 적용되고 index.css의 내용은 전혀 반영이 안됨
// admin page
// memory page
// matrix page
// fuzzy page
//  PurgeCSS 적용
function App() {
  const isAuthenticated = () => {
    // 인증 상태 확인
    return !!localStorage.getItem("isAuthenticated");
  };

  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user-dashboard" element={isAuthenticated() ? <UserDashboard /> : <Navigate to="/sign-in" />} />

          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/catchmind" element={<CatchMind />} />
          <Route path="/omok" element={<Omok />} />

          <Route path="/graph-visualizer" element={<GraphVisualizer />} />
          <Route path="/memory-simulator" element={<GraphVisualizer />} />
          <Route path="/matrix-simulator" element={<GraphVisualizer />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
