function Footer({ about }) {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-[#111827] text-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                <div className="grid gap-12 md:grid-cols-3">

                    {/* Brand / Intro */}
                    <div className="max-w-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <img
                                src="https://res.cloudinary.com/dyxeuwxwd/image/upload/v1790669029/I.V_logo.jpg"
                                alt="I.V Studio"
                                className="h-11 w-11 rounded-lg object-cover"
                            />

                            <span className="text-xl font-semibold tracking-tight">
                                I.V Studio
                            </span>
                        </div>

                        <p className="text-sm leading-7 text-gray-400">
                            Building thoughtful digital experiences through
                            clean design, modern development, and technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                            Explore
                        </h3>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                            <button
                                type="button"
                                onClick={() => scrollToSection("about")}
                                className="text-left text-gray-400 transition-colors duration-300 hover:text-white"
                            >
                                About
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection("skills")}
                                className="text-left text-gray-400 transition-colors duration-300 hover:text-white"
                            >
                                Skills
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection("projects")}
                                className="text-left text-gray-400 transition-colors duration-300 hover:text-white"
                            >
                                Projects
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection("experience")}
                                className="text-left text-gray-400 transition-colors duration-300 hover:text-white"
                            >
                                Experience
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection("blog")}
                                className="text-left text-gray-400 transition-colors duration-300 hover:text-white"
                            >
                                Blogs
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection("contact")}
                                className="text-left text-gray-400 transition-colors duration-300 hover:text-white"
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                            Connect
                        </h3>

                        <div className="flex flex-col items-start gap-3 text-sm">

                            {about?.githubUrl && (
                                <a
                                    href={about.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors duration-300 hover:text-white"
                                >
                                    GitHub
                                </a>
                            )}

                            {about?.linkedinUrl && (
                                <a
                                    href={about.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors duration-300 hover:text-white"
                                >
                                    LinkedIn
                                </a>
                            )}

                            {about?.email && (
                                <a
                                    href={`mailto:${about.email}`}
                                    className="text-gray-400 transition-colors duration-300 hover:text-white"
                                >
                                    {about.email}
                                </a>
                            )}

                        </div>
                    </div>

                </div>

                {/* Bottom Divider */}
                <div className="my-10 border-t border-white/10" />

                {/* Bottom Row */}
                <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">

                    <p>
                        © {currentYear} Ishita. All rights reserved.
                    </p>

                    <p>
                        Designed & built with care.
                    </p>

                </div>

            </div>
        </footer>
    );
}

export default Footer;