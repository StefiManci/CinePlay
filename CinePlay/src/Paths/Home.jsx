import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

export default function Home() {
    const { logout, loginWithRedirect, isAuthenticated, user } = useAuth0();

    return (
        <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-white flex flex-col lg:flex-row px-6 py-8">
            <motion.div
                initial="hidden"
                animate="visible"
                className="w-full h-full flex flex-col justify-center items-center text-center space-y-4"
            >
                <motion.p
                    className="text-6xl sm:text-7xl font-bold text-blue-800"
                    variants={fadeIn}
                    custom={1}
                >
                    WELCOME!
                </motion.p>

                {isAuthenticated ? (
                    <>
                        <motion.p
                            className="text-5xl sm:text-6xl text-gray-800"
                            variants={fadeIn}
                            custom={2}
                        >
                            Back
                        </motion.p>
                        <motion.p
                            className="text-4xl sm:text-5xl text-blue-600 font-medium uppercase"
                            variants={fadeIn}
                            custom={3}
                        >
                            {user.nickname}
                        </motion.p>
                        <motion.p
                            className="text-6xl sm:text-7xl font-bold text-blue-400 mt-6"
                            variants={fadeIn}
                            custom={4}
                        >
                            We Missed You!
                        </motion.p>
                        <motion.button
                            onClick={() =>
                                logout({ logoutParams: { returnTo: window.location.origin } })
                            }
                            className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variants={fadeIn}
                            custom={5}
                        >
                            Log Out
                        </motion.button>
                    </>
                ) : (
                    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full gap-12 mt-8">
                        {/* Left Side Welcome Message */}
                        <motion.div
                            className="flex flex-col items-center text-center space-y-4"
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.p
                                className="text-5xl sm:text-6xl text-gray-800"
                                variants={fadeIn}
                                custom={1}
                            >
                                To The Movie World
                            </motion.p>
                            <motion.p
                                className="text-3xl sm:text-4xl text-gray-600"
                                variants={fadeIn}
                                custom={2}
                            >
                                Watch, Enjoy
                            </motion.p>
                            <motion.p
                                className="text-2xl sm:text-3xl text-gray-600 italic"
                                variants={fadeIn}
                                custom={3}
                            >
                                But most importantly...
                            </motion.p>
                            <motion.p
                                className="text-6xl sm:text-8xl font-extrabold text-blue-900 mt-4"
                                variants={fadeIn}
                                custom={4}
                            >
                                Have Fun!
                            </motion.p>
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            className="flex flex-col justify-center items-center text-center space-y-6"
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="animate-bounce text-blue-600"
                                variants={fadeIn}
                                custom={1}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-12 h-12"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                    />
                                </svg>
                            </motion.div>
                            <motion.p
                                className="text-4xl sm:text-5xl font-bold text-blue-700"
                                variants={fadeIn}
                                custom={2}
                            >
                                Want a better experience?
                            </motion.p>
                            <motion.button
                                onClick={() => loginWithRedirect()}
                                className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg uppercase transition"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={fadeIn}
                                custom={3}
                            >
                                Log In / Sign Up
                            </motion.button>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
