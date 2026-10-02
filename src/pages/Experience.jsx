import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getExperience } from "../services/api";

function Experience() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const data = await getExperience();
                setExperience(data);
            } catch (error) {
                console.error("Experience API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />

            {/* Page Header */}
            <section className="border-b border-gray-200 px-6 pb-16 pt-36 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Experience
                    </p>

                    <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
                        Where I&apos;ve worked.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                        A timeline of the roles, projects and experiences
                        that have shaped my development journey.
                    </p>
                </div>
            </section>

            {/* Experience */}
            <section className="px-6 py-20 lg:px-8">
                <div className="mx-auto max-w-5xl">

                    {loading ? (
                        <div className="py-20 text-center text-gray-500">
                            Loading experience...
                        </div>
                    ) : experience.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                            <p className="text-gray-500">
                                No experience available yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">

                            {experience.map((item) => (
                                <article
                                    key={item._id}
                                    className="rounded-2xl border border-gray-200 bg-white p-7"
                                >
                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                        <div>
                                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                                                {item.role}
                                            </h2>

                                            <p className="mt-2 font-medium text-indigo-600">
                                                {item.company}
                                            </p>
                                        </div>

                                        <div className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                                            {formatDate(item.startDate)}
                                            {" — "}
                                            {item.current
                                                ? "Present"
                                                : formatDate(item.endDate)}
                                        </div>

                                    </div>

                                    <div className="mt-6 border-t border-gray-100 pt-6">

                                        {item.description && (
                                            <p className="leading-7 text-gray-500">
                                                {item.description}
                                            </p>
                                        )}

                                        {item.technologies?.length > 0 && (
                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {item.technologies.map(
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

export default Experience;