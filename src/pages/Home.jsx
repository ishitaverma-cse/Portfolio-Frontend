import { Link } from "react-router-dom";
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
    submitContact,
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

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [contactStatus, setContactStatus] = useState({
        type: "",
        message: "",
    });

    const [contactLoading, setContactLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    aboutData,
                    skillsData,
                    projectsData,
                    experienceData,
                    blogsData,
                    testimonialsData,
                ] = await Promise.all([
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

    const handleContactChange = (e) => {
        const { name, value } = e.target;

        setContactForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setContactStatus({
            type: "",
            message: "",
        });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        setContactStatus({
            type: "",
            message: "",
        });

        if (
            !contactForm.name.trim() ||
            !contactForm.email.trim() ||
            !contactForm.subject.trim() ||
            !contactForm.message.trim()
        ) {
            setContactStatus({
                type: "error",
                message: "Please fill in all fields.",
            });

            return;
        }

        try {
            setContactLoading(true);

            const data = await submitContact({
                name: contactForm.name.trim(),
                email: contactForm.email.trim(),
                subject: contactForm.subject.trim(),
                message: contactForm.message.trim(),
            });

            console.log("Contact submitted:", data);

            setContactStatus({
                type: "success",
                message: "Your message has been sent successfully!",
            });

            setContactForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Contact submission error:", error);

            setContactStatus({
                type: "error",
                message:
                    error.message ||
                    "Something went wrong. Please try again.",
            });
        } finally {
            setContactLoading(false);
        }
    };

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

            {/* =========================================================
                HERO
            ========================================================= */}
            <section
                id="home"
                className="relative overflow-hidden bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 pb-20 pt-32 sm:px-10 sm:pb-24 lg:px-16 lg:pt-36"
            >
                {/* Subtle blue atmosphere */}
                <div className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#eaf0f8] blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="grid min-h-[calc(100vh-9rem)] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">

                        {/* Left Content */}
                        <div className="relative z-10">
                            {/* Eyebrow */}
                            <div className="mb-7 flex items-center gap-3">
                                <span className="h-px w-10 bg-[#315bce]" />

                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#315bce]">
                                    {loading
                                        ? "Loading..."
                                        : about?.title || "Full Stack Developer"}
                                </p>
                            </div>

                            {/* Main Heading */}
                            <h1 className="max-w-4xl text-[3.5rem] font-semibold leading-[0.95] tracking-[-0.055em] text-gray-950 sm:text-6xl md:text-7xl lg:text-[5.8rem]">
                                Hi👋, I&apos;m{" "}
                                <span className="text-[#64748b]">
                                    {loading
                                        ? "..."
                                        : about?.name || "Your Name"}
                                </span>
                                .
                            </h1>

                            <p className="mt-8 max-w-2xl p-2 text-2xl font-medium leading-tight tracking-tight text-gray-800 sm:text-3xl lg:text-[2.6rem] lg:leading-[1.08]">
                                I turn curiosity into code,
                                <span className="font-serif italic text-gray-400">
                                    {" "}and ideas into
                                </span>
                                <span className="ml-2 text-[#64748b]">products.</span>
                            </p>

                            {/* Actions */}
                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <a
                                    href="#projects"
                                    className="group inline-flex items-center gap-3 rounded-full bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#315bce]"
                                >
                                    View My Work

                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>

                                {about?.resumeUrl && (
                                    <a
                                        href={about.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:text-[#315bce]"
                                    >
                                        View Resume
                                    </a>
                                )}
                            </div>

                            {/* Social Links */}
                            {(about?.githubUrl ||
                                about?.linkedinUrl ||
                                about?.email) && (
                                    <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3">
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                                            Find me
                                        </span>

                                        {about?.githubUrl && (
                                            <a
                                                href={about.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-gray-700 transition hover:text-[#315bce]"
                                            >
                                                GitHub
                                            </a>
                                        )}

                                        {about?.linkedinUrl && (
                                            <a
                                                href={about.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-gray-700 transition hover:text-[#315bce]"
                                            >
                                                LinkedIn
                                            </a>
                                        )}

                                        {about?.email && (
                                            <a
                                                href={`mailto:${about.email}`}
                                                className="text-sm font-medium text-gray-700 transition hover:text-[#315bce]"
                                            >
                                                Email
                                            </a>
                                        )}
                                    </div>
                                )}
                        </div>

                        {/* Right Visual */}
                        <div className="relative flex items-center justify-center lg:justify-end">
                            {/* Decorative rings */}
                            <div className="absolute right-4 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full border border-[#dbe3f0] sm:h-[30rem] sm:w-[30rem]" />

                            <div className="absolute right-12 top-1/2 h-[19rem] w-[19rem] -translate-y-1/2 rounded-full border border-gray-100 sm:h-[24rem] sm:w-[24rem]" />

                            {/* Image */}
                            <div className="relative z-10">
                                <div className="relative h-[22rem] w-[18rem] overflow-hidden rounded-[1.75rem] bg-gray-100 sm:h-[30rem] sm:w-[24rem]">
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
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    "none";

                                                e.currentTarget.parentElement
                                                    .querySelector(
                                                        ".profile-fallback"
                                                    )
                                                    ?.classList.remove("hidden");
                                            }}
                                        />
                                    ) : (
                                        <div className="profile-fallback flex h-full flex-col items-center justify-center bg-[#eef2f7] px-6 text-center">
                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#315bce]">
                                                Developer
                                            </p>

                                            <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                                {about?.name || "Your Name"}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Code • Create • Learn
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Floating Label */}
                                <div className="absolute -bottom-5 -left-5 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-xl sm:-left-8">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                        Currently
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-900">
                                        Building & Learning
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                ABOUT
            ========================================================= */}
            <section
                id="about"
                className="border-t border-gray-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 pb-20 pt-32 sm:px-10 sm:pb-24 lg:px-16"
            >
                <div className="mx-auto max-w-7xl">

                    {/* Section Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-[#315bce]" />

                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#315bce]">
                                About Me
                            </p>
                        </div>

                        <span className="hidden text-sm font-medium text-gray-300 sm:block">
                            01
                        </span>
                    </div>

                    {/* Main Layout */}
                    <div className="mt-12 grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-20">

                        {/* Image */}
                        <div className="relative mx-auto w-full max-w-[20rem] lg:mx-0">
                            <div className="absolute -bottom-4 -right-4 h-full w-full border border-[#d8e0ec]" />

                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
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
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";

                                            e.currentTarget.parentElement
                                                .querySelector(
                                                    ".about-profile-fallback"
                                                )
                                                ?.classList.remove("hidden");
                                        }}
                                    />
                                ) : (
                                    <div className="about-profile-fallback flex h-full flex-col items-center justify-center bg-[#e9eef5] px-6 text-center">
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#315bce]">
                                            Profile
                                        </p>

                                        <p className="mt-3 text-2xl font-semibold text-gray-900">
                                            {about?.title ||
                                                "Full Stack Developer"}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Image Label */}
                            <div className="absolute -bottom-6 left-5 bg-gray-950 px-4 py-3 text-white">
                                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                    I.V Studio
                                </p>

                                <p className="mt-1 text-xs font-medium">
                                    Building & Learning
                                </p>
                            </div>
                        </div>

                        {/* Description + Stats */}
                        <div>
                            <div className="max-w-4xl">
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {loading
                                        ? "Loading About information..."
                                        : about?.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="mt-12 grid gap-4 sm:grid-cols-3">

                                {/* Skills */}
                                <div className="group relative overflow-hidden bg-gray-950 p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <span className="absolute right-4 top-4 text-[10px] font-semibold text-gray-600">
                                        01
                                    </span>

                                    <p className="text-4xl font-semibold tracking-[-0.05em]">
                                        {loading ? "—" : skills.length}
                                    </p>

                                    <div className="mt-10">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8da8df]">
                                            Skills
                                        </p>

                                        <p className="mt-2 text-xs leading-5 text-gray-400">
                                            Technologies & tools.
                                        </p>
                                    </div>
                                </div>

                                {/* Projects */}
                                <div className="group relative overflow-hidden border border-[#dbe3ef] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <span className="absolute right-4 top-4 text-[10px] font-semibold text-gray-300">
                                        02
                                    </span>

                                    <p className="text-4xl font-semibold tracking-[-0.05em] text-gray-950">
                                        {loading ? "—" : projects.length}
                                    </p>

                                    <div className="mt-10">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#315bce]">
                                            Projects
                                        </p>

                                        <p className="mt-2 text-xs leading-5 text-gray-600">
                                            Products I&apos;ve built.
                                        </p>
                                    </div>
                                </div>

                                {/* Testimonials */}
                                <div className="group relative overflow-hidden bg-[#315bce] p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <span className="absolute right-4 top-4 text-[10px] font-semibold text-white/30">
                                        03
                                    </span>

                                    <p className="text-4xl font-semibold tracking-[-0.05em]">
                                        {loading ? "—" : testimonials.length}
                                    </p>

                                    <div className="mt-10">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                                            Testimonials
                                        </p>

                                        <p className="mt-2 text-xs leading-5 text-white/70">
                                            People I&apos;ve worked with.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="mt-8 flex flex-col gap-5 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <p className="max-w-md text-sm leading-6 text-gray-500">
                                    Turning ideas into useful, polished digital
                                    experiences through code and creativity.
                                </p>

                                {about?.resumeUrl && (
                                    <a
                                        href={about.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex w-fit items-center gap-3 rounded-full bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#315bce]"
                                    >
                                        Download CV

                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            ↗
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                SKILLS
            ========================================================= */}
            <section
                id="skills"
                className="border-t border-gray-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
            >
                <div className="mx-auto max-w-7xl">

                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#315bce]">
                                Skills
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Tools I use to build.
                            </h2>

                            <p className="mt-3 text-base leading-7 text-gray-600">
                                Technologies and tools I work with while building modern web
                                applications.
                            </p>
                        </div>

                        <div className="hidden lg:block">
                            <p className="text-sm font-medium text-gray-400">
                                Always learning. Always building.
                            </p>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {loading ? (
                            <p className="text-gray-500">Loading skills...</p>
                        ) : skills.length === 0 ? (
                            <p className="text-gray-500">
                                No skills available yet.
                            </p>
                        ) : (
                            skills.map((skill, index) => (
                                <article
                                    key={skill._id}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-400 hover:bg-gray-100 hover:shadow-xl"
                                >
                                    <span className="absolute right-4 top-3 text-4xl font-bold tracking-tighter text-gray-100 transition-colors duration-300 group-hover:text-[#e8edf5]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="relative">
                                        {/* Icon */}
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-70 text-sm font-bold text-gray-700 shadow-sm ring-1 ring-gray-300 transition-transform duration-300 group-hover:scale-105">
                                            {skill.icon ? (
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="h-6 w-6 object-contain"
                                                />
                                            ) : (
                                                skill.name?.charAt(0).toUpperCase()
                                            )}
                                        </div>

                                        {/* Skill Info */}
                                        <div className="mt-5">
                                            <h3 className="text-lg font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-gray-700">
                                                {skill.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                                                {skill.category}
                                            </p>

                                            <span className="mt-3 inline-flex rounded-full border border-[#dbe3ef] bg-[#f5f7fa] px-2.5 py-1 text-[10px] font-semibold text-[#64748b] transition-all duration-300 group-hover:border-gray-400 group-hover:bg-white group-hover:text-gray-800">
                                                {skill.level}
                                            </span>
                                        </div>

                                        {/* Bottom Accent */}
                                        <div className="mt-6 flex items-center gap-1.5">
                                            <div className="h-1 w-8 rounded-full bg-gray-950 transition-all duration-300 group-hover:w-14" />
                                            <div className="h-1 w-2 rounded-full bg-[#8da8df]" />
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* =========================================================
                PROJECTS
            ========================================================= */}
            <section
                id="projects"
                className="relative overflow-hidden border-t border-gray-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-20 sm:px-10 lg:px-16 lg:py-24"
            >
                <div className="relative mx-auto max-w-6xl">

                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <div className="max-w-xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#315bce]">
                                Recent Work
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Things I&apos;ve been building.
                            </h2>

                            <p className="mt-3 max-w-lg text-base leading-7 text-gray-600">
                                A selection of projects where I&apos;ve turned ideas into
                                working digital experiences.
                            </p>
                        </div>

                        <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-gray-400 lg:block">
                            Selected Work / {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Projects Grid */}
                    <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
                        {loading ? (
                            <p className="text-gray-500">Loading projects...</p>
                        ) : projects.length === 0 ? (
                            <p className="text-gray-500">
                                No projects available yet.
                            </p>
                        ) : (
                            projects.slice(0, 3).map((project, index) => (
                                <article
                                    key={project._id}
                                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#c8d3e4] hover:shadow-xl ${index === 2
                                        ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]"
                                        : ""
                                        }`}
                                >
                                    {/* Project Visual */}
                                    <div className="relative h-48 overflow-hidden bg-gray-950 sm:h-52">
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

                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-gray-950" />

                                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />

                                                <div className="absolute right-5 top-16 h-20 w-20 rounded-full border border-white/10" />

                                                <div className="absolute left-6 top-6 text-6xl font-black tracking-tighter text-white/10">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>

                                                <div className="absolute bottom-6 left-6">
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8da8df]">
                                                        I.V Studio
                                                    </p>

                                                    <p className="mt-1 text-2xl font-bold text-white">
                                                        {project.title}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* Project Number */}
                                        <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[10px] font-bold text-white backdrop-blur-md">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        {/* Featured */}
                                        {project.featured && (
                                            <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-gray-900 shadow-sm backdrop-blur">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                                        <h3 className="text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#315bce]">
                                            {project.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {project.technologies?.map(
                                                (technology, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-600"
                                                    >
                                                        {technology}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        {/* Project Links */}
                                        <div className="mt-auto flex flex-wrap gap-3 pt-6">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.2 7.69 10.69.56.1.77-.24.77-.54v-1.92c-3.13.68-3.79-1.5-3.79-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.75 2.12 3.7 1.5 0.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.75 10.75 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.69C23.25 5.48 18.27.5 12 .5Z" />
                                                    </svg>

                                                    GitHub
                                                </a>
                                            )}

                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#315bce] hover:shadow-md"
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        className="h-4 w-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M13.5 6H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4.5"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M10 4h10v10"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m20 4-9 9"
                                                        />
                                                    </svg>

                                                    Live Project
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#315bce] opacity-60" />
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* =========================================================
                EXPERIENCE
            ========================================================= */}
            <section
                id="experience"
                className="relative overflow-hidden border-t border-gray-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                <div className="relative mx-auto max-w-7xl">

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#315bce]">
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
                                        className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-[#f8fafc] p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#c8d3e4] hover:shadow-xl sm:p-9"
                                    >
                                        {/* Top Row */}
                                        <div className="relative flex items-start justify-between gap-6">

                                            {/* Company Identity */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-lg font-bold text-white shadow-lg">
                                                    {item.company
                                                        ?.split(" ")
                                                        .map((word) => word[0])
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#315bce]">
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
                                        <div className="relative my-8 h-px bg-gray-200">
                                            <div className="absolute left-0 top-0 h-px w-16 bg-[#315bce] transition-all duration-500 group-hover:w-28" />
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
                                                                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-all duration-300 group-hover:border-[#d5deea] group-hover:text-[#315bce]"
                                                            >
                                                                {technology}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Bottom Accent */}
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#315bce] opacity-50" />
                                    </article>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            {/* =========================================================
                BLOG
            ========================================================= */}
            <section
                id="blog"
                className="border-t border-gray-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#315bce]">
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
                        ) : blogs.filter((blog) => blog.published).length ===
                            0 ? (
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
                                            className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#c8d3e4] hover:shadow-xl"
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
                                                    <div className="relative flex h-full items-end overflow-hidden bg-gray-950 p-8">
                                                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10" />

                                                        <div className="absolute -right-4 top-4 h-24 w-24 rounded-full border border-white/10" />

                                                        <div className="absolute left-8 top-8 text-7xl font-black tracking-tighter text-white/10">
                                                            IV
                                                        </div>

                                                        <div className="relative">
                                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8da8df]">
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
                                                    <span className="h-2 w-2 rounded-full bg-[#315bce]" />

                                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                                                        Development
                                                    </span>
                                                </div>

                                                <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#315bce] sm:text-3xl">
                                                    {blog.title}
                                                </h3>

                                                <p className="mt-4 leading-7 text-gray-600">
                                                    {blog.excerpt}
                                                </p>

                                                {/* Read More */}
                                                <Link
                                                    to={`/blog/${blog.slug}`}
                                                    className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5"
                                                >
                                                    <span className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#315bce]">
                                                        Read article
                                                    </span>

                                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm text-white transition-all duration-300 group-hover:bg-[#315bce] group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })
                        )}
                    </div>
                </div>
            </section>

            {/* =========================================================
                TESTIMONIALS
            ========================================================= */}
            <section
                id="testimonials"
                className="border-t border-gray-100 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">

                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#315bce]">
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
                                    className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-[#f8fafc] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#c8d3e4] hover:shadow-xl sm:p-10"
                                >
                                    {/* Quote Mark */}
                                    <div className="absolute right-8 top-5 text-8xl font-serif leading-none text-[#e3e9f2] transition-colors duration-500 group-hover:text-[#d5deea]">
                                        “
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <p className="max-w-2xl text-xl font-medium leading-9 tracking-tight text-gray-800 sm:text-2xl">
                                            “{testimonial.message}”
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-8 h-px bg-gray-200" />

                                    {/* Person */}
                                    <div className="flex items-center gap-4">
                                        {testimonial.image ? (
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="h-14 w-14 rounded-2xl object-cover ring-4 ring-gray-100"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-lg font-bold text-white ring-4 ring-gray-100">
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
                                    <div className="absolute bottom-0 left-0 h-1 w-full bg-[#315bce] opacity-50" />
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* =========================================================
                CONTACT
            ========================================================= */}
            <section
                id="contact"
                className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-br from-[#eef4ff] via-[#f5f8ff] to-white px-6 py-24 sm:px-10 lg:px-16 lg:py-28"
            >
                {/* Decorative elements */}
                <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#eef4ff] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#f3f6ff] blur-3xl" />

                <div className="relative mx-auto max-w-7xl">

                    {/* Contact Layout */}
                    <div className="grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">

                        {/* LEFT — Main Contact Content */}
                        <div className="pt-2">

                            {/* Eyebrow */}
                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-px w-10 bg-gray-900" />

                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                                    Get In Touch
                                </p>
                            </div>

                            {/* Heading */}
                            <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-gray-950 sm:text-5xl lg:text-[4rem]">
                                Let&apos;s build something
                                <span className="text-gray-400"> meaningful.</span>
                            </h2>

                            {/* Description */}
                            <p className="mt-7 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
                                Have a project, opportunity, or just want to say hello?
                                I&apos;d love to hear from you.
                            </p>

                            {/* Contact Email */}
                            {about?.email && (
                                <div className="mt-10 border-t border-gray-200 pt-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                                        Email
                                    </p>

                                    <a
                                        href={`mailto:${about.email}`}
                                        className="mt-2 inline-block text-base font-semibold text-gray-900 transition-colors duration-300 hover:text-gray-500"
                                    >
                                        {about.email}
                                    </a>
                                </div>
                            )}

                            {/* Social Links */}
                            {(about?.githubUrl || about?.linkedinUrl) && (
                                <div className="mt-8 flex items-center gap-6">
                                    {about?.githubUrl && (
                                        <a
                                            href={about.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-gray-950"
                                        >
                                            GitHub ↗
                                        </a>
                                    )}

                                    {about?.linkedinUrl && (
                                        <a
                                            href={about.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-gray-950"
                                        >
                                            LinkedIn ↗
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* RIGHT — Contact Form */}
                        <form
                            onSubmit={handleContactSubmit}
                            className="rounded-[2rem] border border-gray-200 bg-gray-50/70 p-7 shadow-sm sm:p-9"
                        >
                            {contactStatus.message && (
                                <div
                                    className={`mb-6 rounded-xl border px-4 py-3 text-sm ${contactStatus.type === "success"
                                        ? "border-green-200 bg-green-50 text-green-700"
                                        : "border-red-200 bg-red-50 text-red-600"
                                        }`}
                                >
                                    {contactStatus.message}
                                </div>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactChange}
                                        placeholder="Your name"
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleContactChange}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="mt-5">
                                <label
                                    htmlFor="contact-subject"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Subject
                                </label>

                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={contactForm.subject}
                                    onChange={handleContactChange}
                                    placeholder="What would you like to discuss?"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                                />
                            </div>

                            {/* Message */}
                            <div className="mt-5">
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                    placeholder="Tell me a little about your project or opportunity..."
                                    rows="6"
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={contactLoading}
                                className="mt-6 w-full rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {contactLoading
                                    ? "Sending Message..."
                                    : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer about={about} />
        </div>
    );
}

export default Home;