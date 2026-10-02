import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getTestimonials } from "../services/api";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await getTestimonials();
                setTestimonials(data);
            } catch (error) {
                console.error("Testimonials API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />

            {/* Page Header */}
            <section className="border-b border-gray-200 px-6 pb-16 pt-36 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Testimonials
                    </p>

                    <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
                        Words from people.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                        A few thoughts and experiences shared by people I&apos;ve
                        worked with and learned from.
                    </p>
                </div>
            </section>

            {/* Testimonials */}
            <section className="px-6 py-20 lg:px-8">
                <div className="mx-auto max-w-6xl">

                    {loading ? (
                        <div className="py-20 text-center text-gray-500">
                            Loading testimonials...
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                            <p className="text-gray-500">
                                No testimonials available yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2">

                            {testimonials.map((testimonial) => (
                                <article
                                    key={testimonial._id}
                                    className="rounded-2xl border border-gray-200 bg-white p-8"
                                >
                                    {/* Quote */}
                                    <div className="text-5xl leading-none text-indigo-200">
                                        “
                                    </div>

                                    <p className="mt-5 text-lg leading-8 text-gray-600">
                                        {testimonial.message}
                                    </p>

                                    <div className="my-8 border-t border-gray-100" />

                                    {/* Person */}
                                    <div className="flex items-center gap-4">

                                        {testimonial.image ? (
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500">
                                                {testimonial.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </div>
                                        )}

                                        <div>
                                            <h2 className="font-semibold text-gray-900">
                                                {testimonial.name}
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {testimonial.role}
                                                {testimonial.company &&
                                                    ` · ${testimonial.company}`}
                                            </p>
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

export default Testimonials;