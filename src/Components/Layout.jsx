// Layout.jsx
import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const Layout = ({ title, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 bg-muted/50 min-h-screen">
        {/* Header */}
        <Header title={title} onMenuToggle={toggleMobileMenu} />

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Layout