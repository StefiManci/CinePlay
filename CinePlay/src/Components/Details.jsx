import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Info from './Info';
import Interactions from './Interactions';
import { useAuth0 } from '@auth0/auth0-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Details() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('id');
    const [data, setData] = useState(null);
    const [show, setShow] = useState("0");
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        if (code) {
            axios.get(`http://www.omdbapi.com/?i=${code}&apikey=7e475f2f`)
                .then((response) => setData(response.data))
                .catch(err => console.error("Error fetching movie:", err));
        }
    }, [code]);

    return (
        <motion.div
            className="flex flex-col items-center w-full py-10 bg-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col md:flex-row w-10/12 md:w-3/4 gap-10 bg-white p-5 rounded-lg shadow-lg"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {/* Poster Section */}
                <motion.div
                    className="w-full md:w-1/3 flex justify-center mb-5 md:mb-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {data &&
                        <img
                            src={data.Poster}
                            alt={data.Title}
                            className="h-96 w-auto object-cover rounded-md shadow-md"
                        />
                    }
                </motion.div>

                {/* Content Section */}
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                    {/* Toggle Buttons */}
                    <motion.div
                        className="flex gap-5 justify-center mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            onClick={() => setShow("1")}
                            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                        >
                            Movie Information
                        </button>
                        <button
                            onClick={() => setShow("2")}
                            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                        >
                            Movie Interactions
                        </button>
                    </motion.div>

                    {/* Info / Interactions Display */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={show}
                            className="w-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {show === "1" && data && <Info data={data} />}
                            {show === "2" && isAuthenticated && data && (
                                <Interactions title={data.Title} id={data.imdbID} />
                            )}
                            {show === "2" && !isAuthenticated && (
                                <p className="text-center text-red-500 font-semibold">Please log in to interact with the movie.</p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}
