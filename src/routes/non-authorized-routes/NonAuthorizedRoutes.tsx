import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../../assets/pages/LandingPage/LandingPage";
import { SignIn } from "../../assets/pages/SignIn/SignIn";
import { SignUp } from "../../assets/pages/SignUp/SignUp";
import { Step1 } from "../../assets/pages/SignUp/Step1";
import { Step2 } from "../../assets/pages/SignUp/Step2";
import { Step3 } from "../../assets/pages/SignUp/Step3";
import { Step4 } from "../../assets/pages/SignUp/Step4";
import { Step5 } from "../../assets/pages/SignUp/Step5";
import { Step6 } from "../../assets/pages/SignUp/Step6";
import { Step7 } from "../../assets/pages/SignUp/Step7";
import { Step8 } from "../../assets/pages/SignUp/Step8";
import { Step9 } from "../../assets/pages/SignUp/Step9";

export const NonAuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/Step1" element={<Step1 />}></Route>
      <Route path="/Step2" element={<Step2 />}></Route>
      <Route path="/Step3" element={<Step3 />}></Route>
      <Route path="/Step4" element={<Step4 />}></Route>
      <Route path="/Step5" element={<Step5 />}></Route>
      <Route path="/Step6" element={<Step6 />}></Route>
      <Route path="/Step7" element={<Step7 />}></Route>
      <Route path="/Step8" element={<Step8 />}></Route>
      <Route path="/Step9" element={<Step9 />}></Route>
      <Route path={"*"} element={<Navigate to="signIn" />}></Route>
    </Routes>
  );
};
