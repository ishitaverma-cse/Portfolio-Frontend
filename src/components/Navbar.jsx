import { Link } from "react-router-dom";

function Navbar({ currentUser, onSignUp, onSignIn, onLogout }) {
    return (
        <nav className="fixed left-0 right-0 top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">

                    {/* Brand */}
                    <Link
                        to="/"
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
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden items-center gap-5 md:flex">

                        <Link
                            to="/#about"
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            About
                        </Link>

                        <Link
                            to="/skills"
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            Skills
                        </Link>

                        <Link
                            to="/projects"
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            Projects
                        </Link>

                        <Link
                            to="/experience"
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            Experience
                        </Link>

                        <Link
                            to="/testimonials"
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            Testimonials
                        </Link>

                        <Link
                            to="/blog"
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            Blogs
                        </Link>

                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">

                        {currentUser ? (
                            <>
                                <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 sm:flex">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                                        {currentUser.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="text-sm font-semibold text-gray-700">
                                        Hi, {currentUser.name}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={onLogout}
                                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-700 hover:shadow-md"                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={onSignIn}
                                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                >
                                    Sign In
                                </button>

                                <button
                                    type="button"
                                    onClick={onSignUp}
                                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-700 hover:shadow-md"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}

                        <Link
                            to="/#contact"
                            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
                        >
                            Let&apos;s Talk
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;