import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAbout, getSkills, getProjects } from "../services/api";

function Home() {
    const [about, setAbout] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aboutData, skillsData, projectsData] = await Promise.all([
                    getAbout(),
                    getSkills(),
                    getProjects(),
                ]);

                setAbout(aboutData);
                setSkills(skillsData);
                setProjects(projectsData);

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
            <Navbar />

            {/* Hero Section */}
            <section className="flex min-h-screen items-center bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 pt-28 lg:px-8">
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
                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {loading ? (
                            <p className="text-gray-500">Loading skills...</p>
                        ) : skills.length === 0 ? (
                            <p className="text-gray-500">No skills available yet.</p>
                        ) : (
                            skills.map((skill, index) => (
                                <div
                                    key={skill._id}
                                    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg"
                                >
                                    {/* Decorative number */}
                                    <span className="absolute right-5 top-4 text-5xl font-black text-gray-100 transition-colors duration-300 group-hover:text-indigo-50">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="relative">
                                        {/* Icon / Initial */}
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-indigo-600 shadow-sm ring-1 ring-gray-200 transition duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-indigo-600">
                                            {skill.icon ? (
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="h-7 w-7 object-contain"
                                                />
                                            ) : (
                                                skill.name?.charAt(0).toUpperCase()
                                            )}
                                        </div>

                                        <div className="mt-6">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">
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

                                        {/* Bottom accent */}
                                        <div className="mt-7 h-1 w-10 rounded-full bg-indigo-600 transition-all duration-300 group-hover:w-20" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section
                id="projects"
                className="border-t border-indigo-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                            Projects
                        </p>

                        <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Things I’ve built.
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            A selection of projects where I’ve turned ideas into working
                            applications.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 lg:grid-cols-2">
                        {loading ? (
                            <p className="text-gray-500">Loading projects...</p>
                        ) : projects.length === 0 ? (
                            <p className="text-gray-500">No projects available yet.</p>
                        ) : (
                            projects.map((project) => (
                                <article
                                    key={project._id}
                                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="h-56 w-full overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-gray-100">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <div className="text-center">
                                                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
                                                        Project
                                                    </p>
                                                    <p className="mt-2 text-3xl font-bold text-gray-800">
                                                        {project.title}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-7">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">
                                                    {project.title}
                                                </h3>

                                                <p className="mt-3 leading-7 text-gray-600">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {project.featured && (
                                                <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                                    Featured
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.technologies?.map((technology, index) => (
                                                <span
                                                    key={index}
                                                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600"
                                                >
                                                    {technology}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-7 flex gap-4">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm font-semibold text-gray-900 transition hover:text-indigo-600"
                                                >
                                                    GitHub →
                                                </a>
                                            )}

                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                                                >
                                                    Live Demo →
                                                </a>
                                            )}
                                        </div>
                                    </div>
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

