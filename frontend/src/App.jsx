import { Navigate, Route, Routes } from "react-router-dom"
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LikesPage from "./pages/LikesPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import { useAuthContext } from "../context/Authcontext";

function App() {
  const { authUser,loading}=useAuthContext();

  if(loading) return null;
 
  return (  
    <>
      <div className=" flex text-white ">
        <Sidebar/>
        <div className=" max-w-5xl my-5 mx-auto transition-all duration-100 flex-1">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
             <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
              <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}/>
               <Route path="/explore" element={authUser ? <ExplorePage/> : <Navigate to={"/login"}/>}/>
                <Route path="/likes" element={authUser ? <LikesPage/> : <Navigate to={"/login"}/>}/>
          </Routes>
          <Toaster/>
        </div>

      </div>
    </>
  )
}

export default App
