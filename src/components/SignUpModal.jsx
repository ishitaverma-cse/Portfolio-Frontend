import { useState } from "react";
import { signupUser } from "../services/api";
import { Eye, EyeOff, X, CheckCircle2, AlertCircle } from "lucide-react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 text-gray-400 transition hover:text-gray-700"
                >
                    <X size={22} />
                </button>

                {/* Header */}
                <div className="mb-7 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Create your account to get started
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        <AlertCircle
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <span>{error}</span>
                    </div>
                )}

                {/* Success Alert */}
                {success && (
                    <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                        <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <span>{success}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

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
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
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

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                placeholder="Confirm your password"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
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
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={onSignIn}
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Sign In
                    </button>
                </p>

            </div>
        </div>
    );
};

export default SignUpModal;
