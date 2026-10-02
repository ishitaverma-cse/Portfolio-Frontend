import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProjects } from "../services/api";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Projects API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />

            {/* Page Header */}
            <section className="border-b border-gray-200 px-6 pb-16 pt-36 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Projects
                    </p>

                    <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
                        Things I&apos;ve built.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                        A collection of applications and experiments built
                        across frontend, backend, databases and AI.
                    </p>
                </div>
            </section>

            {/* Projects */}
            <section className="px-6 py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    {loading ? (
                        <div className="py-20 text-center text-gray-500">
                            Loading projects...
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                            <p className="text-gray-500">
                                No projects available yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2">

                            {projects.map((project) => (
                                <article
                                    key={project._id}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                                >
                                    {/* Image */}
                                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-gray-100">
                                                <span className="text-sm font-medium text-gray-400">
                                                    Project Preview
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-7">

                                        <div className="flex items-start justify-between gap-5">
                                            <div>
                                                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                                                    {project.title}
                                                </h2>

                                                {project.featured && (
                                                    <span className="mt-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <p className="mt-5 leading-7 text-gray-500">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        {project.technologies?.length > 0 && (
                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {project.technologies.map(
                                                    (technology, index) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                                        >
                                                            {technology}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {/* Links */}
                                        <div className="mt-7 flex flex-wrap gap-3">

                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                                                >
                                                    GitHub ↗
                                                </a>
                                            )}

                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    Live Demo ↗
                                                </a>
                                            )}

                                        </div>
                                    </div>
                                </article>
                            ))}

                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Projects;