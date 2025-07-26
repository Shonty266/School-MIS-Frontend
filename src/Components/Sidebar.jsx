import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Home, 
  Users, 
  GraduationCap, 
  Settings, 
  Calendar,
  BookOpen,
  School,
  X
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { name: "Dashboard", path: "/", icon: <Home size={18} /> },
  { name: "Students", path: "/students", icon: <Users size={18} /> },
  { name: "Teachers", path: "/teachers", icon: <GraduationCap size={18} /> },
  { name: "Class Management", path: "/class-management", icon: <School size={18} /> },
  { name: "Subjects", path: "/subjects", icon: <BookOpen size={18} /> },
  { name: "Academic Calendar", path: "/academic-calendar", icon: <Calendar size={18} /> },
]

function Sidebar({ isMobileMenuOpen, onCloseMobileMenu }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          h-screen w-64 bg-white border-r shadow-sm fixed left-0 top-0 p-4 flex flex-col z-40 
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">School MIS</div>
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onCloseMobileMenu}
          >
            <X size={16} />
          </Button>
        </div>

        <Separator className="mb-4" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <Link to={item.path} key={item.name} onClick={onCloseMobileMenu}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full justify-start gap-3 h-10 px-3 cursor-pointer
                    ${isActive 
                      ? "bg-black text-white hover:bg-gray-800" 
                      : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="truncate text-sm font-medium">
                    {item.name}
                  </span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <div>School MIS v1.0</div>
            <div className="mt-1">Frontend Demo</div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar