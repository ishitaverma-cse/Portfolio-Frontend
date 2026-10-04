import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { loginUser } from "../services/api";

const SignInModal = ({ onClose, onSignUp, onLogin }) => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const data = await loginUser(
                formData.email,
                formData.password
            );

            console.log("Login successful:", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Admin → CMS Admin Panel
            if (data.user.role === "admin") {
                const adminData = encodeURIComponent(
                    JSON.stringify(data.user)
                );

                // Make sure admin credentials are not stored
                // as a normal Portfolio user session.
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href =
                    `http://localhost:5174/auth-handoff?token=${encodeURIComponent(
                        data.token
                    )}&admin=${adminData}`;

                return;
            }

            // Normal user → Portfolio
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            onLogin(data.user);
            onClose();

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

            {/* Modal */}
            <div className="relative flex w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]">

                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:text-gray-800"
                >
                    <X size={17} />
                </button>

                {/* LEFT — VISUAL */}
                <div className="relative hidden w-[42%] overflow-hidden lg:block">

                    <img
                        src="https://media2.dev.to/dynamic/image/width%3D1600%2Cheight%3D900%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2F2sm66t4a02ovopro856b.jpeg"
                        alt="Developer workspace"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Dark neutral overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/95 via-[#374151]/70 to-black/30" />

                    {/* Decorative circle */}
                    <div className="absolute left-7 top-8 h-16 w-16 rounded-full border border-white/20" />

                    {/* Visual content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-300">
                            I.V Studio
                        </p>

                        <h3 className="text-2xl font-bold leading-tight">
                            Welcome
                            <span className="block text-gray-300">
                                back.
                            </span>
                        </h3>

                        <p className="mt-3 max-w-xs text-xs leading-5 text-white/70">
                            Continue exploring projects, experiences,
                            and ideas.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-white/50" />

                            <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                                Developer Portfolio
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT — SIGN IN */}
                <div className="w-full px-7 py-9 sm:px-9 sm:py-10 lg:w-[58%]">

                    {/* Heading */}
                    <div className="mb-7">

                        <div className="mb-4 flex items-center gap-2">
                            <div className="h-1.5 w-7 rounded-full bg-[#64748b]" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#64748b]">
                                I.V Studio
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Welcome back.
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Sign in to continue to your account.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#64748b]"
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-6">
                            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
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
                                    placeholder="Enter your password"
                                    required
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
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-8 flex w-full items-center justify-center rounded-xl bg-[#111827] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading
                                ? "Signing In..."
                                : "Sign In"}
                        </button>

                    </form>

                    {/* Switch to Sign Up */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <span>Don&apos;t have an account?</span>{" "}

                        <button
                            type="button"
                            onClick={onSignUp}
                            className="font-semibold text-[#64748b] transition hover:text-[#374151]"
                        >
                            Sign Up
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignInModal;