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

            {/* =====================================================
                LOADING
            ====================================================== */}

            {loading ? (
                <main className="flex min-h-screen items-center justify-center px-6">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

                        <p className="text-sm font-medium text-gray-500">
                            Loading article...
                        </p>
                    </div>
                </main>
            ) : error || !blog ? (
                /* =================================================
                    ERROR
                ================================================== */

                <main className="flex min-h-screen items-center justify-center px-6">
                    <div className="max-w-lg text-center">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
                            404
                        </p>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                            Article not found
                        </h1>

                        <p className="mt-5 text-base leading-7 text-gray-500">
                            The article you&apos;re looking for doesn&apos;t
                            exist or may have been removed.
                        </p>

                        <Link
                            to="/"
                            className="mt-8 inline-flex items-center rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800"
                        >
                            ← Back to Home
                        </Link>

                    </div>
                </main>
            ) : (
                <>
                    {/* =================================================
                        PAGE HEADER
                    ================================================== */}

                    <section className="border-b border-gray-100 bg-[#f8f8f7] px-6 pb-14 pt-32 sm:px-10 lg:px-16 lg:pb-16 lg:pt-40">

                        <div className="mx-auto max-w-7xl">

                            {/* Breadcrumb */}

                            <div className="mb-10 flex items-center gap-2 text-sm">
                                <Link
                                    to="/"
                                    className="font-medium text-gray-500 transition-colors duration-300 hover:text-gray-900"
                                >
                                    Home
                                </Link>

                                <span className="text-gray-300">
                                    /
                                </span>

                                <span className="text-gray-400">
                                    Blog Details
                                </span>
                            </div>

                            {/* Header */}

                            <div className="max-w-4xl">

                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#64748b]">
                                    Blog
                                </p>

                                <h1 className="text-4xl font-bold leading-tight tracking-[-0.035em] text-gray-950 sm:text-5xl lg:text-6xl">
                                    {blog.title}
                                </h1>

                                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">

                                    <span>
                                        {formatDate(
                                            blog.publishedAt ||
                                            blog.createdAt
                                        )}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-gray-300" />

                                    <span>
                                        I.V Studio
                                    </span>

                                    {blog.published && (
                                        <>
                                            <span className="h-1 w-1 rounded-full bg-gray-300" />

                                            <span className="font-medium text-gray-700">
                                                Published
                                            </span>
                                        </>
                                    )}

                                </div>

                            </div>

                        </div>
                    </section>


                    {/* =================================================
    PORTFOLIO DETAIL
================================================== */}

                    <main className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                        <div className="mx-auto max-w-7xl">

                            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

                                {/* =================================================
                LEFT — COVER IMAGE
            ================================================== */}

                                <div className="lg:sticky lg:top-28">

                                    {blog.coverImage ? (
                                        <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                                            <img
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                className="h-auto max-h-[700px] w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-[#111827]">
                                            <div className="text-center">
                                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                                                    I.V Studio
                                                </p>

                                                <p className="mt-3 text-lg font-medium text-gray-300">
                                                    Blog
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                </div>


                                {/* =================================================
                RIGHT — CONTENT
            ================================================== */}

                                <article>

                                    {/* Category */}

                                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#64748b]">
                                        Blog
                                    </p>


                                    {/* Title */}

                                    <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-gray-950 sm:text-5xl">
                                        {blog.title}
                                    </h2>


                                    {/* Meta */}

                                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">

                                        <span>
                                            {formatDate(
                                                blog.publishedAt ||
                                                blog.createdAt
                                            )}
                                        </span>

                                        <span className="h-1 w-1 rounded-full bg-gray-300" />

                                        <span>
                                            I.V Studio
                                        </span>

                                        {blog.published && (
                                            <>
                                                <span className="h-1 w-1 rounded-full bg-gray-300" />

                                                <span className="font-medium text-gray-700">
                                                    Published
                                                </span>
                                            </>
                                        )}

                                    </div>


                                    {/* Divider */}

                                    <div className="my-8 h-px bg-gray-200" />


                                    {/* Excerpt */}

                                    {blog.excerpt && (
                                        <p className="text-xl font-medium leading-8 text-gray-700 sm:text-2xl sm:leading-9">
                                            {blog.excerpt}
                                        </p>
                                    )}


                                    {/* Article Content */}

                                    <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
                                        {blog.content}
                                    </div>


                                    {/* Article Details */}

                                    <div className="mt-12 grid grid-cols-2 gap-6 border-t border-gray-200 pt-7">

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                                                Published
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                                {formatDate(
                                                    blog.publishedAt ||
                                                    blog.createdAt
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                                                Author
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                                I.V Studio
                                            </p>
                                        </div>

                                    </div>

                                </article>

                            </div>

                        </div>
                    </main>
                </>
            )}

            <Footer />
        </div>
    );
}

export default BlogDetails;