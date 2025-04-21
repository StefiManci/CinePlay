import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const loaderSpin = {
    animate: {
        rotate: 360,
        transition: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
        },
    },
};

export default function Search() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search.trim()) {
            setLoading(true);
            axios
                .get(`http://www.omdbapi.com/?t=${search}&apikey=7e475f2f`)
                .then((response) => {
                    setData(response.data?.Response === "True" ? response.data : null);
                })
                .catch((error) => {
                    console.error("Error fetching movie data:", error);
                    setData(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setData(null);
        }
    }, [search]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 to-white p-4">
            {/* Search Input */}
            <motion.div
                className="w-full md:w-1/3 lg:w-1/4 flex justify-center mb-6"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
            >
                <input
                    type="text"
                    className="w-full p-4 rounded-xl border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                    placeholder="Search for movies..."
                    value={search}
                    onChange={handleChange}
                />
            </motion.div>

            {/* Display Movie Data */}
            <div className="w-full flex justify-center items-center">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            className="flex flex-col items-center space-y-4 text-blue-600"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={fadeIn}
                        >
                            <motion.div
                                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                                variants={loaderSpin}
                                animate="animate"
                            />
                            <p className="text-lg font-medium">Searching...</p>
                        </motion.div>
                    ) : data ? (
                        <motion.div
                            key={data.imdbID}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Link
                                to={`/Details?id=${data.imdbID}`}
                                className="flex flex-col items-center transition-transform transform hover:scale-105"
                            >
                                <div className="text-blue-800 font-semibold text-2xl mb-2 text-center">
                                    {data.Title}
                                </div>
                                <img
                                    src={data.Poster}
                                    alt={data.Title}
                                    className="rounded-xl w-full max-w-xs h-auto"
                                    loading="lazy"
                                />
                            </Link>
                        </motion.div>
                    ) : (
                        search.trim() && (
                            <motion.p
                                key="no-result"
                                className="text-xl text-gray-500 text-center"
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                No results found for "{search}"
                            </motion.p>
                        )
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
