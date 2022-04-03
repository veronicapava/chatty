import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import { AuthProvider } from './context/authContext'
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Route>

        {/* <Route exact path="/" element={<PublicRoute />}> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* </Route> */}

      </Routes>
    </AuthProvider>
  )
}



export default App;