import { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = () => {
    const email = emailRef.current?.value || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/auth/forgot-password`, {
        mail: emailRef.current?.value,
      });

      toast.success("Reset link sent to your email!");
      navigate("/signin");
    } catch (err: any) {
      if (err.response?.status === 404) {
        toast.error("No account found with this email.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f6f8fb] text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-[380px] bg-white/95 border border-gray-200 rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] px-8 py-10 backdrop-blur-sm"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive a reset link.
          </p>
        </div>

        <div>
          <Input
            placeholder="Email"
            type="email"
            reference={emailRef}
            className={`bg-[#f9fafc] border rounded-lg text-gray-700 placeholder-gray-400 focus:ring-1 ${
              emailError
                ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:border-[#4b6bfb] focus:ring-[#4b6bfb]/40"
            }`}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>

        <Button
          variant="primary"
          size="md"
          text={isLoading ? "Sending..." : "Send Reset Link"}
          className="w-full mt-2 bg-[#4b6bfb] hover:bg-[#3b5de7] text-white rounded-lg py-2.5 font-medium tracking-wide transition-all duration-200"
        />

        <p className="text-center text-sm text-gray-500 mt-1">
          Remember your password?{" "}
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
