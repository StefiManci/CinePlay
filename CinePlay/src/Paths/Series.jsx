import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const containerVariant = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

const loaderVariant = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6],
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

export default function Movie() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const titles = [
            "tt0944947", "tt1632701", "tt3107288", "tt2193021", "tt0903747",
            "tt7366338", "tt0386676", "tt0108778", "tt2707408", "tt3581920"
        ];

        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    titles.map(id =>
                        axios.get(`http://www.omdbapi.com/?i=${id}&apikey=7e475f2f`)
                    )
                );
                const allData = responses.map(response => response.data);
                setData(allData);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <motion.div
            className="min-h-screen bg-gray-100 flex items-center justify-center p-8"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <AnimatePresence>
                {loading ? (
                    <motion.div
                        key="loader"
                        className="flex flex-col items-center justify-center text-blue-700 space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                        <motion.p
                            className="text-xl font-semibold"
                            variants={loaderVariant}
                            animate="animate"
                        >
                            Loading shows...
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="movies"
                        className="flex flex-wrap justify-center gap-6 w-full"
                        variants={containerVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {data.map((movie, index) => (
                            <motion.div
                                key={movie.imdbID}
                                variants={cardVariant}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link
                                    to={`/Details?id=${movie.imdbID}`}
                                    className="w-60 h-auto bg-white rounded-lg shadow-lg overflow-hidden block"
                                >
                                    <div className="flex flex-col items-center p-4">
                                        <img
                                            className="h-96 w-full object-cover rounded-md mb-4"
                                            src={movie.Poster}
                                            alt={movie.Title}
                                        />
                                        <h1 className="text-center text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
                                            {movie.Title}
                                        </h1>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
