function Navbar() {
    return (
        <nav className="fixed left-0 right-0 top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">

                    {/* Brand */}
                    <a
                        href="#"
                        className="flex items-center gap-3"
                    >
                        <img
                            src="https://res.cloudinary.com/dyxeuwxwd/image/upload/v1790669029/I.V_logo.jpg"
                            alt="I.V Studio"
                            className="h-10 w-10 rounded-lg object-cover"
                        />

                        <span className="text-xl font-semibold tracking-tight text-gray-900">
                            I.V Studio
                        </span>
                    </a>

                    {/* Navigation Links */}
                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#about"
                            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                        >
                            About
                        </a>

                        <a
                            href="#skills"
                            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                        >
                            Skills
                        </a>

                        <a
                            href="#projects"
                            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                        >
                            Projects
                        </a>

                        <a
                            href="#experience"
                            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                        >
                            Experience
                        </a>

                        <a
                            href="#contact"
                            className="text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                        >
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
            </div>
        </nav>
    );
}

export default Navbar;