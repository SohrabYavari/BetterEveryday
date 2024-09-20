import { useState } from "react";
import { data as challenges, default as Challenges } from "./data";
import { motion } from "framer-motion";

// Function to calculate the current day of the year (1-365)
const getDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const App: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenges | null>(
    null
  );
  const [startAnimation, setStartAnimation] = useState(false);

  // Function to set the challenge based on the current day of the year
  const setChallengeForToday = () => {
    const dayOfYear = getDayOfYear();
    const challengeOfTheDay = challenges[dayOfYear % challenges.length];
    setCurrentChallenge(challengeOfTheDay);
    setStartAnimation(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <motion.div
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={startAnimation ? { opacity: 0, y: -100 } : {}}
      transition={{
        delay: 0,
      }}
      className="m-5 flex justify-center items-center flex-col text-center"
      >
        <h1 className="font-bold text-7xl opacity-80 ">Better Everyday</h1>
        <p className="py-2">
          Make yourself more <span className="font-bold">confident</span> and your day more <span className="italic">exciting!</span>
        </p>
        <button
          onClick={setChallengeForToday}
          className="bg-[#ADF1D2] text-[#333] font-bold p-2 px-5 rounded-md shadow-xl"
        >
          Show Today's Challenge
        </button>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={startAnimation ? { opacity: 1, y: -150 } : {}}
        transition={{
          delay: 0.25,
        }}
        className="m-5"
      >
        {currentChallenge && (
          <div className="p-5 px-10 md:w-full text-center bg-[#755B69] rounded-md shadow-lg text-2xl font-bold">
            <p>{currentChallenge.challenge}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
