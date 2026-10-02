import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";
import {
    getAbout,
    getSkills,
    getProjects,
    getExperience,
    getBlogs,
    getTestimonials,
} from "../services/api";

function Home() {
    const [about, setAbout] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const [authModal, setAuthModal] = useState(null);
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aboutData, skillsData, projectsData, experienceData, blogsData, testimonialsData] =
                    await Promise.all([
                        getAbout(),
                        getSkills(),
                        getProjects(),
                        getExperience(),
                        getBlogs(),
                        getTestimonials(),
                    ]);

                setAbout(aboutData);
                setSkills(skillsData);
                setProjects(projectsData);
                setExperience(experienceData);
                setBlogs(blogsData);
                setTestimonials(testimonialsData);

                console.log("Blogs:", blogsData);
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar
                currentUser={currentUser}
                onSignUp={() => setAuthModal("signup")}
                onSignIn={() => setAuthModal("signin")}
                onLogout={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setCurrentUser(null);
                }}
            />

            {authModal === "signin" && (
                <SignInModal
                    onClose={() => setAuthModal(null)}
                    onSignUp={() => setAuthModal("signup")}
                    onLogin={(user) => setCurrentUser(user)}
                />
            )}

            {authModal === "signup" && (
                <SignUpModal
                    onClose={() => setAuthModal(null)}
                    onSignIn={() => setAuthModal("signin")}
                />
            )}

            {/* Hero Section */}
            <section className="flex min-h-screen items-center bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 pt-28 lg:px-8" id="about">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

                    {/* Hero Content */}
                    <div>
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                            {loading ? "Loading..." : about?.title}
                        </p>

                        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                            Hi, I'm{" "}
                            <span className="text-indigo-600">
                                {loading ? "..." : about?.name || "Your Name"}
                            </span>
                            .
                        </h1>

                        <p className="mt-4 max-w-2xl text-2xl font-medium text-gray-700">
                            Building digital experiences that make an impact.
                        </p>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                            {loading
                                ? "Loading About information..."
                                : about?.description}
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="rounded-full bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-indigo-600"
                            >
                                View My Work
                            </a>

                            {about?.resumeUrl && (
                                <a
                                    href={about.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
                                >
                                    View Resume
                                </a>
                            )}
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
                        <div className="relative">

                            {/* Soft background glow */}
                            <div className="absolute -inset-4 rounded-[2rem] bg-indigo-100/60 blur-xl" />

                            {/* Main Card */}
                            <div className="relative h-80 w-80 overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl sm:h-96 sm:w-96">

                                {loading ? (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-sm text-gray-400">
                                            Loading...
                                        </p>
                                    </div>
                                ) : about?.profileImage ? (
                                    <img
                                        src={about.profileImage}
                                        alt={about?.name || "Profile"}
                                        className="h-full w-full object-contain bg-gray-50"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                            e.currentTarget.parentElement.querySelector(
                                                ".profile-fallback"
                                            )?.classList.remove("hidden");
                                        }}
                                    />
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-white text-center">
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-500">
                                            Developer
                                        </p>

                                        <p className="mt-3 text-3xl font-bold text-gray-900">
                                            {about?.name || "Your Name"}
                                        </p>

                                        <p className="mt-2 text-sm text-indigo-600">
                                            Code • Create • Learn
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Skills Section */}
            <section
                id="skills"
                className="border-t border-gray-200 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">
                    {/* Section Heading */}
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                                Skills
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Tools I use to build.
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                Technologies and tools I work with while building modern web
                                applications.
                            </p>
                        </div>

                        <div className="hidden rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 lg:block">
                            <p className="text-sm font-medium text-indigo-700">
                                Always learning. Always building.
                            </p>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {loading ? (
                            <p className="text-gray-500">Loading skills...</p>
                        ) : skills.length === 0 ? (
                            <p className="text-gray-500">No skills available yet.</p>
                        ) : (
                            skills.map((skill, index) => (
                                <article
                                    key={skill._id}
                                    className="group relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl"
                                >
                                    {/* Background Glow */}
                                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl transition-all duration-500 group-hover:bg-blue-200/70" />

                                    {/* Decorative Number */}
                                    <span className="absolute right-6 top-5 text-6xl font-black tracking-tighter text-indigo-50 transition-all duration-500 group-hover:scale-110 group-hover:text-indigo-100">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="relative">
                                        {/* Icon */}
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-lg font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110">
                                            {skill.icon ? (
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="h-8 w-8 object-contain"
                                                />
                                            ) : (
                                                skill.name?.charAt(0).toUpperCase()
                                            )}
                                        </div>

                                        {/* Skill Info */}
                                        <div className="mt-7">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                                                        {skill.name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {skill.category}
                                                    </p>
                                                </div>

                                                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                                    {skill.level}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Bottom Accent */}
                                        <div className="mt-8 flex items-center gap-2">
                                            <div className="h-1.5 w-10 rounded-full bg-indigo-600 transition-all duration-500 group-hover:w-20" />
                                            <div className="h-1.5 w-2 rounded-full bg-blue-400 transition-all duration-500 group-hover:w-4" />
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section
                id="projects"
                className="relative overflow-hidden border-t border-indigo-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                {/* Background Decoration */}
                <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -right-32 bottom-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">

                    {/* Heading */}
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                                Projects
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Things I’ve built.
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                A selection of projects where I’ve turned ideas into
                                working applications.
                            </p>
                        </div>

                        <span className="hidden text-sm font-medium text-gray-400 lg:block">
                            SELECTED WORK / {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Projects Grid */}
                    <div className="mt-14 grid gap-8 lg:grid-cols-2">
                        {loading ? (
                            <p className="text-gray-500">Loading projects...</p>
                        ) : projects.length === 0 ? (
                            <p className="text-gray-500">
                                No projects available yet.
                            </p>
                        ) : (
                            projects.map((project, index) => (
                                <article
                                    key={project._id}
                                    className="group relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl"
                                >
                                    {/* Project Visual */}
                                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-300">
                                        {project.image ? (
                                            <>
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display =
                                                            "none";
                                                    }}
                                                />

                                                {/* Image Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-300" />

                                                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/20" />
                                                <div className="absolute -right-2 top-12 h-28 w-28 rounded-full border border-white/20" />

                                                <div className="absolute left-8 top-8 text-7xl font-black tracking-tighter text-white/10">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>

                                                <div className="absolute bottom-7 left-8 right-8">
                                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                                                        I.V Studio
                                                    </p>

                                                    <p className="mt-2 text-3xl font-bold leading-tight text-white">
                                                        {project.title}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* Project Number */}
                                        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-xs font-bold text-white backdrop-blur-md">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        {/* Featured Badge */}
                                        {project.featured && (
                                            <span className="absolute right-5 top-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-7 sm:p-8">
                                        <div>
                                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                                                {project.title}
                                            </h3>

                                            <p className="mt-3 leading-7 text-gray-600">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Technologies */}
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.technologies?.map(
                                                (technology, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50"
                                                    >
                                                        {technology}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        {/* Links */}
                                        <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5">
                                            <div className="flex gap-5">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm font-semibold text-gray-900 transition-colors hover:text-indigo-600"
                                                    >
                                                        GitHub →
                                                    </a>
                                                )}

                                                {project.live && (
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
                                                    >
                                                        Live Demo →
                                                    </a>
                                                )}
                                            </div>

                                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-600">
                                                ↗
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-transparent opacity-70" />
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section
                id="experience"
                className="relative overflow-hidden border-t border-indigo-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"            >
                {/* Background Decoration */}
                <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="pointer-events-none absolute -left-40 bottom-10 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">

                    {/* Section Heading */}
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                                Experience
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Where I’ve been building.
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                A collection of roles, projects, and experiences
                                that shaped the way I build today.
                            </p>
                        </div>

                        <div className="hidden lg:block">
                            <p className="text-sm font-medium text-gray-400">
                                EXPERIENCE / 01
                            </p>
                        </div>
                    </div>

                    {/* Experience Cards */}
                    <div className="mt-14 grid gap-6 lg:grid-cols-2">
                        {loading ? (
                            <p className="text-gray-500">
                                Loading experience...
                            </p>
                        ) : experience.length === 0 ? (
                            <p className="text-gray-500">
                                No experience available yet.
                            </p>
                        ) : (
                            experience.map((item, index) => {
                                const startDate = new Date(
                                    item.startDate
                                ).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                });

                                const endDate = item.current
                                    ? "Present"
                                    : new Date(
                                        item.endDate
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    });

                                return (
                                    <article
                                        key={item._id}
                                        className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl sm:p-9"
                                    >
                                        {/* Hover Glow */}
                                        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-100/60 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                                        {/* Top Row */}
                                        <div className="relative flex items-start justify-between gap-6">

                                            {/* Company Identity */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-600 ring-1 ring-indigo-100">
                                                    {item.company
                                                        ?.split(" ")
                                                        .map((word) => word[0])
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                                        {item.company}
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-400">
                                                        Professional Experience
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Index */}
                                            <span className="text-sm font-semibold text-gray-300">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Role */}
                                        <div className="relative mt-9">
                                            <h3 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                                                {item.role}
                                            </h3>

                                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                                <span className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white">
                                                    {startDate} — {endDate}
                                                </span>

                                                {item.current && (
                                                    <span className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        Currently here
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="relative my-8 h-px bg-gray-100">
                                            <div className="absolute left-0 top-0 h-px w-16 bg-indigo-600 transition-all duration-500 group-hover:w-28" />
                                        </div>

                                        {/* Description */}
                                        <p className="relative max-w-2xl text-[15px] leading-7 text-gray-600">
                                            {item.description}
                                        </p>

                                        {/* Technologies */}
                                        {item.technologies?.length > 0 && (
                                            <div className="relative mt-8">
                                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                                                    Built with
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {item.technologies.map(
                                                        (technology, techIndex) => (
                                                            <span
                                                                key={techIndex}
                                                                className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition-all duration-300 group-hover:border-indigo-100 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                                                            >
                                                                {technology}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Bottom Accent */}
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-400 to-transparent opacity-60" />
                                    </article>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section
                id="blog"
                className="border-t border-indigo-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">

                    {/* Section Heading */}
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                                Blog / Notes
                            </p>

                            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Thoughts, lessons & things I&apos;m building.
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                A space where I document what I&apos;m learning,
                                building, and discovering along the way.
                            </p>
                        </div>

                        <span className="text-sm font-medium text-gray-400">
                            LATEST WRITINGS
                        </span>
                    </div>

                    {/* Blog Posts */}
                    <div className="mt-14 grid gap-8 lg:grid-cols-2">
                        {loading ? (
                            <p className="text-gray-500">
                                Loading blog posts...
                            </p>
                        ) : blogs.filter((blog) => blog.published).length === 0 ? (
                            <p className="text-gray-500">
                                No blog posts available yet.
                            </p>
                        ) : (
                            blogs
                                .filter((blog) => blog.published)
                                .map((blog) => {
                                    const date = new Date(
                                        blog.publishedAt || blog.createdAt
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    });

                                    return (
                                        <article
                                            key={blog._id}
                                            className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl"
                                        >
                                            {/* Cover */}
                                            <div className="relative h-64 overflow-hidden">
                                                {blog.coverImage ? (
                                                    <img
                                                        src={blog.coverImage}
                                                        alt={blog.title}
                                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="relative flex h-full items-end overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-300 p-8">
                                                        {/* Decorative shapes */}
                                                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/20" />
                                                        <div className="absolute -right-4 top-4 h-24 w-24 rounded-full border border-white/20" />

                                                        <div className="absolute left-8 top-8 text-7xl font-black tracking-tighter text-white/10">
                                                            IV
                                                        </div>

                                                        <div className="relative">
                                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                                                                I.V Studio
                                                            </p>

                                                            <p className="mt-2 max-w-sm text-2xl font-bold leading-tight text-white">
                                                                {blog.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Date */}
                                                <div className="absolute right-5 top-5 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
                                                    {date}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-7 sm:p-8">
                                                <div className="flex items-center gap-3">
                                                    <span className="h-2 w-2 rounded-full bg-indigo-500" />

                                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                                                        Development
                                                    </span>
                                                </div>

                                                <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-indigo-600 sm:text-3xl">
                                                    {blog.title}
                                                </h3>

                                                <p className="mt-4 leading-7 text-gray-600">
                                                    {blog.excerpt}
                                                </p>

                                                {/* Read More */}
                                                <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5">
                                                    <span className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
                                                        Read article
                                                    </span>

                                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm text-white transition-all duration-300 group-hover:bg-indigo-600 group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="border-t border-indigo-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">

                    {/* Section Heading */}
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                            Testimonials
                        </p>

                        <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Kind words from people.
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            A few words from people I’ve worked with and learned from.
                        </p>
                    </div>

                    {/* Testimonials */}
                    <div className="mt-14 grid gap-6 lg:grid-cols-2">
                        {loading ? (
                            <p className="text-gray-500">
                                Loading testimonials...
                            </p>
                        ) : testimonials.length === 0 ? (
                            <p className="text-gray-500">
                                No testimonials available yet.
                            </p>
                        ) : (
                            testimonials.map((testimonial) => (
                                <article
                                    key={testimonial._id}
                                    className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white via-white to-indigo-50/40 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl sm:p-10"
                                >
                                    {/* Quote Mark */}
                                    <div className="absolute right-8 top-5 text-8xl font-serif leading-none text-indigo-100 transition-colors duration-500 group-hover:text-indigo-200">
                                        “
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <p className="max-w-2xl text-xl font-medium leading-9 tracking-tight text-gray-800 sm:text-2xl">
                                            “{testimonial.message}”
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-8 h-px bg-gradient-to-r from-indigo-200 via-gray-100 to-transparent" />

                                    {/* Person */}
                                    <div className="flex items-center gap-4">
                                        {testimonial.image ? (
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="h-14 w-14 rounded-2xl object-cover ring-4 ring-indigo-50"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-600 ring-4 ring-indigo-50">
                                                {testimonial.name
                                                    ?.split(" ")
                                                    .map((word) => word[0])
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-base font-bold text-gray-900">
                                                {testimonial.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {testimonial.role}
                                                {testimonial.company && (
                                                    <>
                                                        <span className="mx-2 text-gray-300">
                                                            •
                                                        </span>
                                                        {testimonial.company}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-400 to-transparent opacity-70" />
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;

