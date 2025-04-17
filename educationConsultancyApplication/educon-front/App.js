import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from  "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import CourseAddition from "./Components/CourseComponent/CourseAddition";
import AdminCourseList from "./Components/CourseComponent/AdminCourseList";
import CourseUpdate from "./Components/CourseComponent/CourseUpdate";
import StudentCourseList from "./Components/CourseComponent/StudentCourseList";
import StudentAddition from "./Components/StudentComponent/StudentAddition";
import StudentList from "./Components/StudentComponent/StudentList";
import StudentUpdate from "./Components/StudentComponent/StudentUpdate";
import StudentDetail from "./Components/StudentComponent/StudentDetail";
import StudentCurrent from "./Components/StudentComponent/StudentCurrent";
import SubscriptionList from "./Components/SubscriptionComponent/SubscriptionList";
import SubscriptionAddition from "./Components/SubscriptionComponent/SubscriptionAddition";
import StudentSubscriptionList from './Components/SubscriptionComponent/StudentSubscriptionList';
import PaymentList from "./Components/PaymentComponent/PaymentList";
import PaymentAddition from "./Components/PaymentComponent/PaymentAddition";
import StudentPaymentList from "./Components/PaymentComponent/StudentPaymentList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterUser/>}/>
        <Route path='/AdminMenu' element={<AdminMenu/>}/>
        <Route path='/StudentMenu' element={<StudentMenu/>}/>
        <Route path='/course-add' element={<CourseAddition/>}/>
        <Route path='/admin-course-list' element={<AdminCourseList/>}/>
        <Route path='/update-course/:courseId' element={<CourseUpdate/>}/>
        <Route path='/student-course-list' element={<StudentCourseList/>}/>
        <Route path='/student-add' element={<StudentAddition/>}/>
        <Route path='/student-current-list' element={<StudentCurrent/>}/>
        <Route path='/student-list' element={<StudentList/>}/>
        <Route path='/update-student/:regno' element={<StudentUpdate/>}/>
        <Route path='/student-detail' element={<StudentDetail/>}/>
        <Route path='/subscription-list' element={<SubscriptionList/>}/>
        <Route path='/subscription-add' element={<SubscriptionAddition/>}/>
        <Route path='/studsubscription-list' element={<StudentSubscriptionList/>}/>
        <Route path='/payment-list' element={<PaymentList/>}/>
        <Route path='/payment-add' element={<PaymentAddition/>}/>
        <Route path='/stud-payment-list' element={<StudentPaymentList/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;