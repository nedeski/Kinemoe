import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../../assets/pages/HomePage/HomePage";
import { MoviesPage } from "../../assets/pages/MoviesPage/MoviesPage";
import { SearchPage } from "../../assets/pages/SearchPage/SearchPage";
import { CommunityPage } from "../../assets/pages/CommunityPage/CommunityPage";
import { ProfilePage } from "../../assets/pages/ProfilePage/ProfilePage";
import { LogedInProvider } from "../../assets/context/LogedInContext/LogedInProvider";
import { CommentPage } from "../../assets/pages/CommentPage/CommentPage";
import { WatchPage } from "../../assets/pages/WatchPage/WatchPage";

export const AuthorizedRoutes = () => {
  return (
    <LogedInProvider>
      <Routes>
        <Route path="/Home" element={<HomePage />}></Route>
        <Route path="/Movies" element={<MoviesPage />}></Route>
        <Route path="/Search" element={<SearchPage />}></Route>
        <Route path="/Community" element={<CommunityPage />}></Route>
        <Route path="/Comment/:id" element={<CommentPage />}></Route>
        <Route path="/Profile/:id" element={<ProfilePage />}></Route>
        <Route path="/Watch/:id" element={<WatchPage />}></Route>
        <Route path={"*"} element={<Navigate to="/Home" />}></Route>
      </Routes>
    </LogedInProvider>
  );
};
