function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <a href="#" className="text-2xl font-bold tracking-tight text-gray-900">
          Portfolio<span className="text-indigo-600">.</span>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm font-medium text-gray-600 transition hover:text-indigo-600">
            About
          </a>

          <a href="#skills" className="text-sm font-medium text-gray-600 transition hover:text-indigo-600">
            Skills
          </a>

          <a href="#projects" className="text-sm font-medium text-gray-600 transition hover:text-indigo-600">
            Projects
          </a>

          <a href="#experience" className="text-sm font-medium text-gray-600 transition hover:text-indigo-600">
            Experience
          </a>

          <a href="#contact" className="text-sm font-medium text-gray-600 transition hover:text-indigo-600">
            Contact
          </a>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          Let's Talk
        </a>

      </div>
    </nav>
  )
}

export default Navbar