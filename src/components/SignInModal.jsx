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
                localStorage.setItem("cmsToken", data.token);
                localStorage.setItem("cmsAdmin", JSON.stringify(data.user));

                window.location.href = "http://localhost:5174/dashboard";
                return;
            }

            // Normal user → Portfolio
            onLogin(data.user);
            onClose();

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 text-gray-400 transition hover:text-gray-700"
                >
                    <X size={22} />
                </button>

                {/* Heading */}
                <div className="mb-7 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to continue to your account
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOff size={19} />
                                ) : (
                                    <Eye size={19} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                {/* Switch to Sign Up */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <button
                        onClick={onSignUp}
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Sign Up
                    </button>
                </p>

            </div>
        </div>
    );
};

export default SignInModal;