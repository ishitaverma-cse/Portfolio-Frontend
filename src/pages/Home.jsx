import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      

      {/* Hero Section */}
      <section className="flex min-h-screen items-center px-6 pt-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* Hero Content */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Full Stack Developer
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Building digital experiences that
              <span className="text-indigo-600"> make an impact.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              I'm a passionate developer focused on building modern,
              scalable and user-friendly web applications using the
              MERN stack and AI-powered technologies.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-indigo-600"
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-6 text-sm font-medium text-gray-500">
              <a href="#" className="transition hover:text-indigo-600">
                GitHub
              </a>

              <a href="#" className="transition hover:text-indigo-600">
                LinkedIn
              </a>

              <a href="#" className="transition hover:text-indigo-600">
                Email
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative flex h-80 w-80 items-center justify-center rounded-3xl bg-gray-100 sm:h-96 sm:w-96">

              <div className="absolute inset-6 rounded-2xl border border-gray-200 bg-white shadow-xl" />

              <div className="relative text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                  Developer
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  Ishita
                </p>

                <p className="mt-1 text-indigo-600">
                  Code • Create • Learn
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home