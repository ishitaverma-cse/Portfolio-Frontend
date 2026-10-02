import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBlogBySlug } from "../services/api";

function BlogDetails() {
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogBySlug(slug);
                setBlog(data);
            } catch (error) {
                console.error("Blog Details API Error:", error);
                setError("Unable to load this article.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    const formatDate = (date) => {
        if (!date) return "Recently";

        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />

            {loading ? (
                <main className="flex min-h-screen items-center justify-center px-6">
                    <p className="text-gray-500">
                        Loading article...
                    </p>
                </main>
            ) : error || !blog ? (
                <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        404
                    </p>

                    <h1 className="mt-4 text-4xl font-semibold">
                        Article not found.
                    </h1>

                    <Link
                        to="/blog"
                        className="mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                        ← Back to Blog
                    </Link>
                </main>
            ) : (
                <>
                    {/* Article Header */}
                    <section className="border-b border-gray-200 px-6 pb-16 pt-36 lg:px-8">
                        <div className="mx-auto max-w-4xl">

                            <Link
                                to="/blog"
                                className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
                            >
                                ← Back to Blog
                            </Link>

                            <div className="mt-10">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                    Article
                                </p>

                                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                                    {blog.title}
                                </h1>

                                <p className="mt-6 text-sm text-gray-400">
                                    {formatDate(
                                        blog.publishedAt ||
                                        blog.createdAt
                                    )}
                                </p>
                            </div>

                        </div>
                    </section>

                    {/* Cover Image */}
                    {blog.coverImage && (
                        <section className="px-6 py-12 lg:px-8">
                            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl">
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full object-cover"
                                />
                            </div>
                        </section>
                    )}

                    {/* Article Content */}
                    <article className="px-6 pb-24 pt-8 lg:px-8">
                        <div className="mx-auto max-w-3xl">

                            {blog.excerpt && (
                                <p className="mb-10 text-xl leading-9 text-gray-500">
                                    {blog.excerpt}
                                </p>
                            )}

                            <div className="whitespace-pre-line text-lg leading-9 text-gray-700">
                                {blog.content}
                            </div>

                        </div>
                    </article>
                </>
            )}

            <Footer />
        </div>
    );
}

export default BlogDetails;