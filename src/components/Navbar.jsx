import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ currentUser, onSignUp, onSignIn, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeSection, setActiveSection] = useState("home");

    const navItems = [
        { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
        { label: "Projects", id: "projects" },
        { label: "Experience", id: "experience" },
        { label: "Blogs", id: "blog" },
        { label: "Testimonials", id: "testimonials" },
    ];

    useEffect(() => {
        if (location.pathname !== "/") {
            setActiveSection("");
            return;
        }

        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            {
                root: null,
                rootMargin: "-20% 0px -55% 0px",
                threshold: [0.1, 0.25, 0.5],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [location.pathname]);

    const scrollToSection = (sectionId) => {
        if (location.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 100);
        } else {
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="fixed left-0 right-0 top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827] px-5 py-3 shadow-lg shadow-black/10">

                    {/* Brand */}
                    <button
                        type="button"
                        onClick={() => scrollToSection("home")}
                        className="flex items-center gap-3"
                    >
                        <img
                            src="https://res.cloudinary.com/dyxeuwxwd/image/upload/v1790669029/I.V_logo.jpg"
                            alt="I.V Studio"
                            className="h-10 w-10 rounded-lg object-cover"
                        />

                        <span className="text-xl font-semibold tracking-tight text-white">
                            I.V Studio
                        </span>
                    </button>

                    {/* Navigation Links */}
                    <div className="hidden items-center gap-6 md:flex">
                        {navItems.map((item) => {
                            const isActive =
                                activeSection === item.id &&
                                location.pathname === "/";

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    className={`group relative py-2 text-sm font-medium transition-colors duration-300 ${isActive
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {item.label}

                                    {/* White Underline */}
                                    <span
                                        className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-white transition-all duration-300 ${isActive
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">

                        {currentUser ? (
                            <>
                                {/* User */}
                                <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:flex">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                                        {currentUser.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <span className="text-sm font-semibold text-gray-200">
                                        Hi, {currentUser.name}
                                    </span>
                                </div>

                                {/* Logout */}
                                <button
                                    type="button"
                                    onClick={onLogout}
                                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-white hover:text-gray-900"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            /* Sign In */
                            <button
                                type="button"
                                onClick={onSignIn}
                                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Let's Talk */}
                        <button
                            type="button"
                            onClick={() => scrollToSection("contact")}
                            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md"
                        >
                            Let&apos;s Talk
                        </button>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;