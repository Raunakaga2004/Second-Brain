import { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignIn = () => {
  const mailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  interface SignInResponse {
    token: string;
    user : string
  }

  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    const email = mailRef.current?.value || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmailError(null);
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;
    setIsLoading(true);

    try {
      const res = await axios.post<SignInResponse>(`${BACKEND_URL}/auth/signin`, {
        mail: mailRef.current?.value,
        password: passwordRef.current?.value,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user)
      toast.success("Signed in successfully!");
      navigate("/");
    } catch {
      toast.error("Invalid email or password!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f6f8fb] text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-[360px] bg-white/95 border border-gray-200 rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] px-8 py-10 backdrop-blur-sm"
      >
        {/* Title Section */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your{" "}
            <span className="text-[#4b6bfb] font-medium">Second Brain</span>
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-3">
          {/* Email */}
          <div>
            <Input
              placeholder="Email"
              type="email"
              reference={mailRef}
              className={`bg-[#f9fafc] border rounded-lg text-gray-700 placeholder-gray-400 focus:ring-1 ${
                emailError
                  ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                  : "border-gray-200 focus:border-[#4b6bfb] focus:ring-[#4b6bfb]/40"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              placeholder="Password"
              type="password"
              reference={passwordRef}
              className="bg-[#f9fafc] border border-gray-200 focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb]/40 rounded-lg text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-[#4b6bfb] hover:underline cursor-pointer font-medium"
            >
              Forgot Password?
            </span>
          </div>
        </div>

        {/* Sign In Button */}
        <Button
          variant="primary"
          size="md"
          text={isLoading ? "Signing In..." : "Sign In"}
          className="w-full mt-2 bg-[#4b6bfb] hover:bg-[#3b5de7] text-white rounded-lg py-2.5 font-medium tracking-wide transition-all duration-200"
        />

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-1">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#4b6bfb] hover:underline cursor-pointer font-medium"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};
