import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { motion } from "framer-motion";
import illustration from "../../assets/icons/illustration.png";
import sharedBrain from "../../assets/icons/shared_brain.png";
import shareLink from "../../assets/icons/share_link.png";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fb] text-gray-800 font-inter overflow-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-5 sm:px-8 md:px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-[#1d1d1f] select-none">
          <LogoIcon size="lg" />
          <span className="text-[#4b6bfb] font-semibold tracking-tight hover:text-[#3b5de7] transition-all">
            Second Brain
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
          <button
            onClick={() => navigate("/signin")}
            className="px-3 sm:px-4 py-2 rounded-lg text-[#4b6bfb] hover:bg-[#e9ecff] transition-all duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-3 sm:px-4 py-2 rounded-lg bg-[#4b6bfb] text-white hover:bg-[#3b5de7] transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-24 py-14 sm:py-20 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col max-w-lg text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] leading-tight">
            Organize your thoughts. <br className="hidden sm:block" />
            Amplify your productivity.
          </h1>
          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
            Your digital memory for a smarter you — store content, track insights,
            and stay in flow with{" "}
            <span className="text-[#4b6bfb] font-medium">Second Brain</span>.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 rounded-lg bg-[#4b6bfb] text-white font-medium hover:bg-[#3b5de7] hover:shadow-[0_4px_14px_rgba(75,107,251,0.3)] transition-all duration-200"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 rounded-lg border border-[#4b6bfb] text-[#4b6bfb] font-medium hover:bg-[#eff3ff] transition-all duration-200"
            >
              Sign In
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full md:w-[45%] flex justify-center"
        >
          <img
            src={illustration}
            alt="Second Brain illustration"
            className="w-3/4 sm:w-2/3 md:w-full drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* Shared Brain Section */}
      <section className="px-6 sm:px-10 md:px-24 py-16 bg-white flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold mb-4 text-[#1d1d1f]">
            Share Your Second Brain
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
            Let others explore your stored insights, ideas, and collections with a single link.
            Perfect for teams, students, and creators who love collaboration.
          </p>
          <button
            onClick={() => navigate("/share")}
            className="px-6 py-3 bg-[#4b6bfb] text-white rounded-lg font-medium hover:bg-[#3b5de7] transition-all duration-200"
          >
            See Shared Brains
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={sharedBrain}
            alt="Shared Brain"
            className="w-3/4 sm:w-2/3 md:w-full rounded-xl drop-shadow-md"
          />
        </motion.div>
      </section>

      {/* Share Link Section */}
      <section className="px-6 sm:px-10 md:px-24 py-16 bg-[#f9fafc] flex flex-col-reverse md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={shareLink}
            alt="Share Link"
            className="w-3/4 sm:w-2/3 md:w-full rounded-xl drop-shadow-md"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold mb-4 text-[#1d1d1f]">
            Share Instantly with a Link
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
            Create secure shareable links to specific collections or notes. 
            Control what you share and keep your private thoughts safe.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#4b6bfb] text-white rounded-lg font-medium hover:bg-[#3b5de7] transition-all duration-200"
          >
            Learn More
          </button>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 sm:px-10 md:px-24 py-16 sm:py-20 bg-[#4b6bfb] text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold mb-4"
        >
          Ready to build your Second Brain?
        </motion.h2>
        <p className="text-base sm:text-lg mb-8 opacity-90">
          Join thousands of thinkers and creators organizing their digital lives better.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-white text-[#4b6bfb] rounded-lg font-medium hover:bg-[#f6f8fb] transition-all duration-200"
        >
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#4b6bfb] font-medium">Second Brain</span> — Built to help you think better.
        </p>
      </footer>
    </div>
  );
};
