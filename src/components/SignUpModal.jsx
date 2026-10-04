import { useState } from "react";
import { signupUser } from "../services/api";
import {
    Eye,
    EyeOff,
    X,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

const SignUpModal = ({ onClose, onSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Name validation
        if (!formData.name.trim()) {
            setError("Full name is required.");
            return;
        }

        // Email validation
        if (!formData.email.trim()) {
            setError("Email address is required.");
            return;
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim()
            )
        ) {
            setError("Please enter a valid email address.");
            return;
        }

        // Password validation
        if (!formData.password) {
            setError("Password is required.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            setError("Please confirm your password.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match. Please check both fields.");
            return;
        }

        try {
            setLoading(true);

            const data = await signupUser(
                formData.name.trim(),
                formData.email.trim(),
                formData.password
            );

            console.log("Signup successful:", data);

            setSuccess("Account created successfully!");

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            // Open Sign In modal after success
            setTimeout(() => {
                onSignIn();
            }, 1200);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

            <div className="relative flex w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]">

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:text-gray-800"
                >
                    <X size={18} />
                </button>

                {/* ================================================= */}
                {/* LEFT — SIGN UP */}
                {/* ================================================= */}

                <div className="w-full px-8 py-10 sm:px-10 lg:w-[57%] lg:px-12 lg:py-12">

                    {/* Header */}
                    <div className="mb-8">

                        <div className="mb-5 flex items-center gap-2">
                            <div className="h-1.5 w-8 rounded-full bg-[#64748b]" />

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748b]">
                                I.V Studio
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Create your account.
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                            Join the portfolio community and explore projects,
                            experiences, and ideas.
                        </p>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            <AlertCircle
                                size={18}
                                className="mt-0.5 shrink-0"
                            />

                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                            <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0"
                            />

                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Name + Email */}
                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#64748b]"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#64748b]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mt-7">

                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 pr-10 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#64748b]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#64748b]"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mt-7">

                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Confirm Password
                            </label>

                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat your password"
                                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 pr-10 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#64748b]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#64748b]"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-9 flex w-full items-center justify-center rounded-xl bg-[#111827] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>
                    </form>

                    {/* Sign In */}
                    <div className="mt-7 flex items-center justify-center gap-1.5 text-sm text-gray-500">
                        <span>Already have an account?</span>

                        <button
                            type="button"
                            onClick={onSignIn}
                            className="font-semibold text-[#64748b] transition hover:text-[#374151]"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                {/* ================================================= */}
                {/* RIGHT — VISUAL */}
                {/* ================================================= */}

                <div className="relative hidden w-[43%] overflow-hidden lg:block">

                    <img
                        src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85"
                        alt="Creative workspace"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Neutral Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/95 via-[#374151]/70 to-black/30" />

                    {/* Decorative element */}
                    <div className="absolute right-8 top-8 h-20 w-20 rounded-full border border-white/20" />

                    <div className="absolute bottom-0 left-0 right-0 p-10 text-white">

                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">
                            Developer Portfolio
                        </p>

                        <h3 className="max-w-sm text-3xl font-bold leading-tight">
                            Ideas become
                            <span className="block text-gray-300">
                                digital experiences.
                            </span>
                        </h3>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
                            Explore projects, technologies, and the work behind
                            the interface.
                        </p>

                        <div className="mt-7 flex items-center gap-3">
                            <div className="h-px w-10 bg-white/50" />

                            <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                                I.V Studio
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;