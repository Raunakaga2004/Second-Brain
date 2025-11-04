import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { motion } from "framer-motion";
import illustration from "../../assets/icons/illustration.png";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fb] text-gray-800 font-inter overflow-hidden">
      {/* 🌐 Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center gap-2 text-xl font-semibold text-[#1d1d1f] select-none">
          <LogoIcon size="lg" />
          <span className="text-[#4b6bfb] font-semibold tracking-tight hover:text-[#3b5de7] transition-all">
            Second Brain
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <button
            onClick={() => navigate("/signin")}
            className="px-4 py-2 rounded-lg text-[#4b6bfb] hover:bg-[#e9ecff] transition-all duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-lg bg-[#4b6bfb] text-white hover:bg-[#3b5de7] transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 🌟 Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-24 py-20 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col max-w-lg"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] leading-tight">
            Organize your thoughts. <br />
            Amplify your productivity.
          </h1>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            Your digital memory for a smarter you — store content, track insights,
            and stay in flow with <span className="text-[#4b6bfb] font-medium">Second Brain</span>.
          </p>

          <motion.div
            className="flex gap-4 mt-6"
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
          className="w-full md:w-[45%]"
        >
          <img
            src={illustration}
            alt="Second Brain illustration"
            className="w-full drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* 🧩 Features Section */}
      <section className="px-10 md:px-24 py-16 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center text-[#1d1d1f] mb-12"
        >
          Your Productivity Hub
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🧾"
            title="Save Everything"
            desc="Store notes, tweets, and videos in one clean, organized space."
            delay={0.1}
          />
          <FeatureCard
            icon="⚡"
            title="Think Faster"
            desc="Search and filter ideas instantly — no clutter, just focus."
            delay={0.2}
          />
          <FeatureCard
            icon="🌐"
            title="Access Anywhere"
            desc="Sync your Second Brain across all your devices seamlessly."
            delay={0.3}
          />
        </div>
      </section>

      {/* 🧠 How It Works */}
      <section className="px-10 md:px-24 py-20 bg-[#f9fafc]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-12 text-[#1d1d1f]"
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <StepCard
            step="1"
            title="Capture"
            desc="Save any link, tweet, or video in a click — right from your browser."
            delay={0.1}
          />
          <StepCard
            step="2"
            title="Organize"
            desc="Tag, categorize, and connect ideas effortlessly with smart filters."
            delay={0.2}
          />
          <StepCard
            step="3"
            title="Reflect"
            desc="Review your stored content and rediscover insights anytime."
            delay={0.3}
          />
        </div>
      </section>

      {/* 🔗 Integrations Section */}
      <section className="px-10 md:px-24 py-20 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-12 text-[#1d1d1f]"
        >
          Works with your favorite tools
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8 opacity-90">
          {["Twitter", "YouTube", "LinkedIn", "Medium", "Reddit", "GitHub"].map((platform, i) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="px-6 py-3 rounded-full border border-[#4b6bfb]/30 text-[#4b6bfb] font-medium bg-[#e9ecff]/40 hover:bg-[#e9ecff] transition-all duration-200 cursor-pointer"
            >
              {platform}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="px-10 md:px-24 py-16 bg-[#f9fafc]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-12 text-[#1d1d1f]"
        >
          Loved by Productivity Enthusiasts
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Testimonial
            name="Test User 1"
            text="Second Brain changed how I capture ideas — it feels natural and lightning fast."
            delay={0.1}
          />
          <Testimonial
            name="Test User 2"
            text="I can save everything I want to revisit later — tweets, videos, and links. Perfect!"
            delay={0.2}
          />
          <Testimonial
            name="Test User 3"
            text="The minimalist design keeps me focused — exactly what a productivity tool should do."
            delay={0.3}
          />
        </div>
      </section>

      {/* 🚀 CTA Section */}
      <section className="px-10 md:px-24 py-20 bg-[#4b6bfb] text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold mb-4"
        >
          Ready to build your Second Brain?
        </motion.h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of thinkers and creators organizing their digital lives better.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-white text-[#4b6bfb] rounded-lg font-medium hover:bg-[#f6f8fb] transition-all duration-200"
        >
          Get Started Free
        </button>
      </section>

      {/* ⚓ Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#4b6bfb] font-medium">Second Brain</span> — Built to help you think better.
        </p>
      </footer>
    </div>
  );
};

// 🔹 Components

const FeatureCard = ({
  icon,
  title,
  desc,
  delay,
}: {
  icon: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-[#4b6bfb] text-white rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
  >
    <div className="text-3xl">{icon}</div>
    <h3 className="mt-3 font-semibold text-lg">{title}</h3>
    <p className="opacity-90 text-sm mt-2 leading-relaxed">{desc}</p>
  </motion.div>
);

const StepCard = ({
  step,
  title,
  desc,
  delay,
}: {
  step: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
  >
    <div className="w-10 h-10 flex items-center justify-center bg-[#4b6bfb] text-white rounded-full text-lg font-bold mx-auto mb-3">
      {step}
    </div>
    <h3 className="font-semibold text-lg text-[#1d1d1f]">{title}</h3>
    <p className="text-gray-600 text-sm mt-2 leading-relaxed">{desc}</p>
  </motion.div>
);

const Testimonial = ({
  name,
  text,
  delay,
}: {
  name: string;
  text: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
  >
    <p className="text-gray-600 italic leading-relaxed">“{text}”</p>
    <div className="mt-4 font-medium text-[#1d1d1f]">— {name}</div>
  </motion.div>
);
