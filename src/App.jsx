import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard.jsx"
import Students from "./Pages/Students.jsx"
import Teachers from "./Pages/Teachers.jsx"
import ClassManagement from "./Pages/ClassManagement.jsx"
import AllSectionsPage from "./Pages/AllSections.jsx"
import Subjects from "./Pages/Subjects.jsx"
import AcademicCalendar from "./Pages/AcademicCalender.jsx"
export default function App() {
  return (
    <Router>
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/class-management" element={<ClassManagement />} />
<Route path="/classes/:classId/sections" element={<AllSectionsPage />} />
<Route path="/subjects" element={<Subjects />} />
<Route path="/academic-calendar" element={<AcademicCalendar />} />

        </Routes>
      </main>
    </Router>
  )
}
