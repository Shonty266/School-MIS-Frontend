import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Teachers from "./pages/Teachers"
import ClassManagement from "./pages/ClassManagement"
import AllSectionsPage from "./pages/AllSections"
import Subjects from "./pages/Subjects"
import AcademicCalendar from "./pages/AcademicCalender"
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
