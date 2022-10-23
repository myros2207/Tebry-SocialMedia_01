import {Route, BrowserRouter as Router, Routes, useNavigate,} from "react-router-dom";
import LoginFormComponent from "./Components/SignFormComponents/LoginFormComponent";
import AccountMainPageComponent from "./Components/Account/AccountMainPageComponent";
import PostCreatorComponent from "./Components/Post/PostCreatorComponent/PostCreatorComponent";
import axios from "axios";
import UserComponent from "./Components/User/UserComponent";
import RegisterFormComponent from "./Components/SignFormComponents/RegisterFormComponent";

import StartPage from "./Components/StartPage";
import CreateCommentComponent from "./Components/Comments/CreateCommentComponent";
import NewsCreatorComponent from "./Components/News/NewsCreatorComponent";
import NewsPageComponent from "./Components/News/NewsPageComponent";
import HomePageComponent from "./Components/HomePage/HomePageComponent";


function App() {

axios.defaults.headers.common['ApiKey'] = 'LS3ckH3qhLrp7nPYX2KspxrA'


  return (
    <div className="App">
      <Router>

        <Routes>
            <Route path="/" element={
                <StartPage></StartPage>
            }></Route>

            <Route path="/login" element={
                <LoginFormComponent></LoginFormComponent>
            }></Route>

            <Route path="/register" element={
                <RegisterFormComponent></RegisterFormComponent>
            }></Route>

            <Route path="/myAccount" element={
                <AccountMainPageComponent></AccountMainPageComponent>
            }></Route>

            <Route path="/home" element={
                <HomePageComponent></HomePageComponent>
            }></Route>

            <Route path="/news" element={
                <NewsPageComponent></NewsPageComponent>
            }></Route>

            <Route path="/postCreating" element={
                <PostCreatorComponent></PostCreatorComponent>
            }></Route>
            <Route path="/newsCreating" element={
                <NewsCreatorComponent></NewsCreatorComponent>
            }></Route>

            <Route path="/account/:userLogin" element={
                <UserComponent></UserComponent>
            }></Route>

            <Route path="/account/:postId/comment" element={
                <CreateCommentComponent></CreateCommentComponent>
            }></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
