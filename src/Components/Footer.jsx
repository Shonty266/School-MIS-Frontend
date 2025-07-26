import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} School MIS. All rights reserved.
        </p>
        <div className="text-sm text-muted-foreground">
          Made with ❤️ by Aryan
        </div>
      </div>
    </footer>
  )
}

export default Footer
