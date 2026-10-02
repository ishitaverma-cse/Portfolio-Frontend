import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBlogs } from "../services/api";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();

                // Only show published blogs
                const publishedBlogs = data.filter(
                    (blog) => blog.published !== false
                );

                setBlogs(publishedBlogs);
            } catch (error) {
                console.error("Blog API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (date) => {
        if (!date) return "Recently";

        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
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
                        Blog
                    </p>

                    <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
                        Thoughts, lessons &amp; ideas.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                        Notes from my journey through development, technology,
                        projects and everything I&apos;m learning along the way.
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="px-6 py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    {loading ? (
                        <div className="py-20 text-center text-gray-500">
                            Loading articles...
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                            <p className="text-gray-500">
                                No published articles yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2">

                            {blogs.map((blog) => (
                                <article
                                    key={blog._id}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                                >
                                    {/* Cover */}
                                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                        {blog.coverImage ? (
                                            <img
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-gray-100">
                                                <span className="text-sm font-medium text-gray-400">
                                                    I.V Studio
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-7">

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
                                                {formatDate(
                                                    blog.publishedAt ||
                                                    blog.createdAt
                                                )}
                                            </span>
                                        </div>

                                        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900">
                                            {blog.title}
                                        </h2>

                                        <p className="mt-4 leading-7 text-gray-500">
                                            {blog.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${blog.slug}`}
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-indigo-600"
                                        >
                                            Read article
                                            <span>↗</span>
                                        </Link>

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

export default Blog;