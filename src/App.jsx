import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard.jsx"
import Students from "./pages/Students.jsx"
import Teachers from "./pages/Teachers.jsx"
import ClassManagement from "./pages/ClassManagement.jsx"
import AllSectionsPage from "./pages/AllSections.jsx"
import Subjects from "./pages/Subjects.jsx"
import AcademicCalendar from "./pages/AcademicCalender.jsx"
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
