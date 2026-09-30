function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-gray-500 sm:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} Ishita. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a href="#" className="transition hover:text-gray-900">
            GitHub
          </a>

          <a href="#" className="transition hover:text-gray-900">
            LinkedIn
          </a>

          <a href="mailto:your-email@example.com" className="transition hover:text-gray-900">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer