import { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const validatePasswords = () => {
    const password = passwordRef.current?.value || "";
    const confirm = confirmRef.current?.value || "";

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) return;
    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/auth/reset-password/${token}`, {
        password: passwordRef.current?.value,
      });

      toast.success("Password reset successful!");
      navigate("/signin");
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error("Reset link expired or invalid!");
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
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your new password below.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="New Password"
            type="password"
            reference={passwordRef}
            className="bg-[#f9fafc] border border-gray-200 focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb]/40 rounded-lg text-gray-700 placeholder-gray-400"
          />

          <Input
            placeholder="Confirm Password"
            type="password"
            reference={confirmRef}
            className="bg-[#f9fafc] border border-gray-200 focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb]/40 rounded-lg text-gray-700 placeholder-gray-400"
          />

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <Button
          variant="primary"
          size="md"
          text={isLoading ? "Resetting..." : "Reset Password"}
          className="w-full mt-2 bg-[#4b6bfb] hover:bg-[#3b5de7] text-white rounded-lg py-2.5 font-medium tracking-wide transition-all duration-200"
        />
      </form>
    </div>
  );
};
