import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSkills } from "../services/api";

function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getSkills();
                setSkills(data);
            } catch (error) {
                console.error("Skills API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900">

            <Navbar />

            {/* Hero */}
            <section className="overflow-hidden border-b border-indigo-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 pb-24 pt-36 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    <div className="max-w-4xl">

                        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                            Skills
                        </p>

                        <h1 className="text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                            The tools behind
                            <span className="block text-gray-400">
                                the work.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-500">
                            Technologies, frameworks and tools I use to build
                            modern web applications, backend systems and
                            AI-powered experiences.
                        </p>

                    </div>

                    {/* Small visual metadata */}
                    <div className="mt-14 flex flex-wrap gap-3">
                        <span className="rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600">
                            Frontend
                        </span>

                        <span className="rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600">
                            Backend
                        </span>

                        <span className="rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600">
                            Databases
                        </span>

                        <span className="rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600">
                            AI / ML
                        </span>
                    </div>

                </div>
            </section>

            {/* Skills */}
            <section className="px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Toolkit
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                                What I work with.
                            </h2>
                        </div>

                        {!loading && (
                            <p className="text-sm text-gray-400">
                                {skills.length} technologies
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <p className="text-sm text-gray-400">
                                Loading toolkit...
                            </p>
                        </div>
                    ) : skills.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-20 text-center">
                            <p className="text-gray-500">
                                No skills available yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid border-l border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-3">

                            {skills.map((skill, index) => (
                                <div
                                    key={skill._id || index}
                                    className="group relative min-h-[190px] border-b border-r border-gray-200 bg-white p-7 transition-all duration-300 hover:bg-[#f7f9ff]"
                                >

                                    {/* Number */}
                                    <span className="text-xs font-semibold tracking-[0.15em] text-gray-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Skill */}
                                    <div className="mt-8 flex items-center justify-between gap-4">

                                        <h3 className="text-2xl font-semibold tracking-tight text-gray-900 transition group-hover:text-indigo-600">
                                            {skill.name}
                                        </h3>

                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-400 transition-all duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white">
                                            ↗
                                        </span>

                                    </div>

                                    {/* Category */}
                                    {skill.category && (
                                        <p className="mt-3 text-sm font-medium text-gray-400">
                                            {skill.category}
                                        </p>
                                    )}

                                    {/* Description */}
                                    {skill.description && (
                                        <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
                                            {skill.description}
                                        </p>
                                    )}

                                    {/* Hover line */}
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full" />

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </section>

            {/* Bottom statement */}
            <section className="border-t border-indigo-100 bg-gradient-to-br from-[#f5f8ff] to-white px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    <p className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl">
                        Good tools matter.
                        <span className="text-gray-400">
                            {" "}Knowing when and how to use them matters more.
                        </span>
                    </p>

                </div>
            </section>

            <Footer />

        </div>
    );
}

export default Skills;