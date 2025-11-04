import { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignUp = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ name?: string; mail?: string; password?: string }>({});

  const validateInputs = () => {
    const name = nameRef.current?.value?.trim() || "";
    const email = mailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const newErrors: { name?: string; mail?: string; password?: string } = {};

    // ✅ Name validation
    if (!name) {
      newErrors.name = "Please enter your full name.";
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.mail = "Please enter a valid email address.";
    }

    // ✅ Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.warning("Please fix the highlighted fields.", { autoClose: 2500 });
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/auth/signup`, {
        name: nameRef.current?.value,
        mail: mailRef.current?.value,
        password: passwordRef.current?.value,
      });

      toast.success("Account created successfully!");
      navigate("/signin");
    } catch (err: any) {
      if (err.response?.status === 403) {
        toast.error("Email already exists!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f6f8fb] text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-[380px] bg-white/95 border border-gray-200 rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] px-8 py-10 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join <span className="text-[#4b6bfb] font-medium">Second Brain</span> today
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-3">
          {/* Full Name */}
          <div>
            <Input
              placeholder="Full Name"
              reference={nameRef}
              className={`bg-[#f9fafc] border rounded-lg text-gray-700 placeholder-gray-400 focus:ring-1 ${
                errors.name
                  ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                  : "border-gray-200 focus:border-[#4b6bfb] focus:ring-[#4b6bfb]/40"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <Input
              placeholder="Email"
              type="email"
              reference={mailRef}
              className={`bg-[#f9fafc] border rounded-lg text-gray-700 placeholder-gray-400 focus:ring-1 ${
                errors.mail
                  ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                  : "border-gray-200 focus:border-[#4b6bfb] focus:ring-[#4b6bfb]/40"
              }`}
            />
            {errors.mail && <p className="text-red-500 text-xs mt-1">{errors.mail}</p>}
          </div>

          {/* Password */}
          <div>
            <Input
              placeholder="Password"
              type="password"
              reference={passwordRef}
              className={`bg-[#f9fafc] border rounded-lg text-gray-700 placeholder-gray-400 focus:ring-1 ${
                errors.password
                  ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                  : "border-gray-200 focus:border-[#4b6bfb] focus:ring-[#4b6bfb]/40"
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
        </div>

        {/* Button */}
        <Button
          variant="primary"
          size="md"
          text="Sign Up"
          className="w-full mt-2 bg-[#4b6bfb] hover:bg-[#3b5de7] text-white rounded-lg py-2.5 font-medium tracking-wide transition-all duration-200"
        />

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-1">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-[#4b6bfb] hover:underline cursor-pointer font-medium"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};
