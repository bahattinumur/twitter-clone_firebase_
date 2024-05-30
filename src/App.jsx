import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        {/* Kullanıcın erişimi için hesabına giriş yapmasının zorunlu olmasını istediğimiz route'ları kapsayıcı bir router içerisne al */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<FeedPage />} />
          <Route path="/profile" element={<h1>Profil</h1>} />
          <Route path="/setting" element={<h1>Setting</h1>} />
          <Route path="/message" element={<h1>Messages</h1>} />
          <Route path="/mail" element={<h1>Mail</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
