import { BrowserRouter, Route, Routes } from "react-router-dom";
import UseCallback from "./pages/UseCallback";
import UseMemo from "./pages/UseMemo";
import MemoApiExample from "./pages/MemoApiExample";
import ServerEvent from "./pages/ServerEvent";
import Chat from "./pages/Chat";

const Parent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UseCallback />} />
        <Route path="/memo" element={<UseMemo />} />
        <Route path="/api-example" element={<MemoApiExample />} />
        <Route path="/server-event" element={<ServerEvent />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Parent;
