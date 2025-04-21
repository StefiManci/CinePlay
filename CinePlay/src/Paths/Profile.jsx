import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContent = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Profile() {
    const { user, isAuthenticated } = useAuth0();

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);

    const [watched, setWatched] = useState([]);
    const [bought, setBought] = useState([]);
    const [rented, setRented] = useState([]);
    const [favourites, setFavourites] = useState([]);

    const openModal = (title, data) => {
        setModalTitle(title);
        setModalData(data);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    useEffect(() => {
        const fetchData = async (type, setState, endpoint) => {
            try {
                const res = await axios.get(`http://localhost:3000/${endpoint}`);
                const filtered = res.data.filter(c => c.user_sub === user.sub);
                setState(filtered);
            } catch (err) {
                console.log(`Error fetching ${type} data:`, err);
            }
        };

        if (user?.sub) {
            fetchData("watched", setWatched, "watched");
            fetchData("rented", setRented, "rented");
            fetchData("bought", setBought, "bought");
            fetchData("favourites", setFavourites, "favourites");
        }
    }, [user?.sub]);

    if (!isAuthenticated) {
        return (
            <motion.div
                className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <h2 className="text-3xl font-semibold text-red-600 mb-4">You're not logged in</h2>
                <p className="text-lg text-gray-700 mb-6">Please log in to view your profile.</p>
                <a
                    href="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition duration-300"
                >
                    Go to Home
                </a>
            </motion.div>
        );
    }

    return (
        <>
            <motion.div
                className="min-h-screen w-full flex flex-col items-center py-8 bg-gray-100"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {/* Header */}
                <div className="w-4/5 flex flex-col sm:flex-row gap-6 items-center border-b-2 border-gray-300 pb-6">
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-3xl font-semibold text-blue-800">{user.nickname}</h1>
                        <p className="text-lg text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex-1 text-center sm:text-right">
                        <p className="text-xl text-gray-800">Current Date</p>
                        <p className="text-md text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Cards */}
                <div className="w-4/5 flex flex-wrap gap-8 justify-center mt-8">
                    {[
                        { title: "Bought", count: bought.length, data: bought, color: "from-blue-500 via-indigo-500 to-purple-500", text: "text-blue-600" },
                        { title: "Watched", count: watched.length, data: watched, color: "from-green-400 via-teal-400 to-blue-400", text: "text-green-600" },
                        { title: "Rented", count: rented.length, data: rented, color: "from-yellow-400 via-orange-500 to-red-500", text: "text-yellow-600" },
                        { title: "Favourites", count: favourites.length, data: favourites, color: "from-pink-500 via-red-500 to-yellow-500", text: "text-pink-600" },
                    ].map(({ title, count, data, color, text }, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardVariant}
                            initial="hidden"
                            animate="visible"
                            className={`h-72 w-60 bg-gradient-to-r ${color} rounded-lg p-6 flex flex-col justify-between items-center shadow-lg`}
                        >
                            <h2 className="text-2xl text-white font-semibold">{title}</h2>
                            <div className="text-3xl text-white font-bold">{count}</div>
                            <button
                                onClick={() => openModal(title, data)}
                                className={`mt-4 bg-white ${text} px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300`}
                            >
                                See Details
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                        variants={modalBackdrop}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded shadow-lg"
                            variants={modalContent}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{modalTitle} Movies</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                                >
                                    &times;
                                </button>
                            </div>
                            {modalData.length > 0 ? (
                                <ul className="space-y-2 max-h-64 overflow-y-auto">
                                    {modalData.map((movie, idx) => (
                                        <li key={idx} className="border p-2 rounded shadow-sm text-gray-700">
                                            {movie.movie_title || "Untitled Movie"}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No movies found in this category.</p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

