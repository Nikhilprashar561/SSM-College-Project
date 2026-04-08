import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/auth/login";
import { DeveloperRegister } from "@/pages/auth/developerRegister";
import { HodRegister } from "@/pages/auth/hodRegister";
import { TeacherRegister } from "@/pages/auth/teacherRegister";
import { PrincipalRegister } from "@/pages/auth/principalRegister";
import { StudentRegister } from "@/pages/auth/studentRegister";
import { StudentHelp } from "@/pages/core/StudentHelp";
import { StudentFeedback } from "@/pages/core/StudentFeedback";
import { StudentComplaint } from "@/pages/core/StudentComplaint";
import { StudentAcivement } from "@/pages/core/StudentAcivement";
import { StudentImage } from "@/pages/core/StudentImage";
import { SubjectUpload } from "@/pages/core/SubjectUpload";
import { Event } from "@/pages/utils/Event";
import { UserHelp } from "@/pages/utils/UserHelp";
import { TimeTable } from "@/pages/utils/TimeTable";
import { SentMoney } from "@/pages/utils/SentMoney";
import { Notification } from "@/pages/utils/Notification";
import { AssignTask } from "@/pages/utils/AssignTask";
import { PaperAssign } from "@/pages/utils/PaperAssign";
import { DateSheet } from "@/pages/utils/DateSheet";
import { StudentMark } from "@/pages/utils/StudentMark";
import { StudentOverall } from "@/pages/utils/StudentOverall";
import { StudentDetails } from "@/pages/utils/StudentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "devloper-register",
        element: <DeveloperRegister />,
      },
      {
        path: "hod-register",
        element: <HodRegister />,
      },
      {
        path: "teacher-register",
        element: <TeacherRegister />,
      },
      {
        path: "principal-register",
        element: <PrincipalRegister />,
      },
      {
        path: "student-register",
        element: <StudentRegister/>,
      },
      {
        path: "student-help",
        element: <StudentHelp />,
      },
      {
        path: "student-feedback",
        element: <StudentFeedback/>,
      },
      {
        path: "student-complaint",
        element: <StudentComplaint/>,
      },
      {
        path: "student-achivement",
        element: <StudentAcivement />,
      },
      {
        path: "student-image",
        element: <StudentImage/>,
      },
      {
        path: "subject-upload",
        element: <SubjectUpload/>,
      },
      {
        path: "event",
        element: <Event/>,
      },
      {
        path: "user-help",
        element: <UserHelp/>,
      },
      {
        path: "time-table",
        element: <TimeTable />,
      },
      {
        path: "sent-money-request",
        element: <SentMoney/>,
      },
      {
        path: "assign-task",
        element: <AssignTask/>,
      },
      {
        path: "paper-assign",
        element: <PaperAssign/>,
      },
      {
        path: "date-sheet",
        element: <DateSheet/>,
      },
      {
        path: "marksheet",
        element: <StudentMark/>,
      },
      {
        path: "markdetails",
        element: <StudentDetails/>,
      },
      {
        path: "notification",
        element: <Notification/>,
      },
      {
        path: "overall",
        element: <StudentOverall/>,
      },
    ],
  },
]);

export { router };
