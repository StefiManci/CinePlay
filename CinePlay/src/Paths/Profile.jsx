import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState,useEffect } from "react";

export default function Profile() {
    /*User Details*/
    const {user,isAuthenticated}=useAuth0();
    
    if (!isAuthenticated) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center px-4">
                <h2 className="text-3xl font-semibold text-red-600 mb-4">You're not logged in</h2>
                <p className="text-lg text-gray-700 mb-6">Please log in to view your profile.</p>
                <a
                    href="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition duration-300"
                >
                    Go to Home
                </a>
            </div>
        );
    }else{
        /*Modal Functions*/
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);

    const openModal = (title, data) => {
        setModalTitle(title);
        setModalData(data);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
    };







    /*Data State*/
    const [watched,setWatched]=useState([]);
    const [bought,setBought]=useState([]);
    const [rented,setRented]=useState([]);
    const [favourites,setFavourites]=useState([]);


    /*Fetching Watched Movies Data*/

    useEffect(() => {
        const fetchWatched = async () => {
            try {
                const res = await axios.get("http://localhost:3000/watched");
                // Filter comments for this movie
                const watchedMovies = res.data.filter(c => c.user_sub === user.sub);
                setWatched(watchedMovies);
            } catch (error) {
                console.log("Error fetching comments:", error);
            }
        };
    
        fetchWatched();
    }, [user.sub]); 

    /*Fetching Rented Movies Data*/

    useEffect(() => {
        const fetchWatched = async () => {
            try {
                const res = await axios.get("http://localhost:3000/rented");
                // Filter comments for this movie
                const rentedMovies = res.data.filter(c => c.user_sub === user.sub);
                setRented(rentedMovies);
            } catch (error) {
                console.log("Error fetching comments:", error);
            }
        };
    
        fetchWatched();
    }, [user.sub]); 

    /*Fetching Bought Movies Data*/

    useEffect(() => {
        const fetchWatched = async () => {
            try {
                const res = await axios.get("http://localhost:3000/bought");
                // Filter comments for this movie
                const boughtMovies = res.data.filter(c => c.user_sub === user.sub);
                setBought(boughtMovies);
            } catch (error) {
                console.log("Error fetching comments:", error);
            }
        };
    
        fetchWatched();
    }, [user.sub]); 

    /*Fetching Favourites Movies Data*/

    useEffect(() => {
        const fetchWatched = async () => {
            try {
                const res = await axios.get("http://localhost:3000/favourites");
                // Filter comments for this movie
                const favouriteMovies = res.data.filter(c => c.user_sub === user.sub);
                setFavourites(favouriteMovies);
            } catch (error) {
                console.log("Error fetching comments:", error);
            }
        };
    
        fetchWatched();
    }, [user.sub]); 



        
        return (
        <>
       
        <div className="h-screen w-full flex flex-col items-center py-8 bg-gray-100">
            {/* Profile Header */}
            <div className="h-1/6 w-4/5 flex flex-col sm:flex-row gap-6 place-items-center border-b-2 border-gray-300 pb-6">
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-semibold text-blue-800">{user.nickname}</h1>
                    <p className="text-lg text-gray-600">{user.email}</p>
                </div>
                <div className="flex-1 text-center sm:text-right">
                    <p className="text-xl text-gray-800">Current Date</p>
                    <p className="text-md text-gray-500">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Profile Content */}
            <div className="h-5/6 w-4/5 flex flex-wrap gap-8 justify-center mt-8">
                {/* Bought */}
                <div className="h-72 w-60 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg p-6 flex flex-col justify-between items-center shadow-lg">
                    <h2 className="text-2xl text-white font-semibold">Bought</h2>
                    <div className="text-3xl text-white font-bold">{bought.length}</div>
                    <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300"  onClick={() => openModal("Bought", bought)}>
                        See Details
                    </button>
                </div>

                {/* Watched */}
                <div className="h-72 w-60 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 rounded-lg p-6 flex flex-col justify-between items-center shadow-lg">
                    <h2 className="text-2xl text-white font-semibold">Watched</h2>
                    <div className="text-3xl text-white font-bold">{watched.length}</div>
                    <button className="mt-4 bg-white text-green-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300"  onClick={() => openModal("Watched", watched)}>
                        See Details
                    </button>
                </div>

                {/* Rented */}
                <div className="h-72 w-60 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg p-6 flex flex-col justify-between items-center shadow-lg">
                    <h2 className="text-2xl text-white font-semibold">Rented</h2>
                    <div className="text-3xl text-white font-bold">{rented.length}</div>
                    <button className="mt-4 bg-white text-yellow-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300"  onClick={() => openModal("Rented", rented)}>
                        See Details
                    </button>
                </div>

                {/* Favourites */}
                <div className="h-72 w-60 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-6 flex flex-col justify-between items-center shadow-lg">
                    <h2 className="text-2xl text-white font-semibold">Favourites</h2>
                    <div className="text-3xl text-white font-bold">{favourites.length}</div>
                    <button className="mt-4 bg-white text-pink-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300"  onClick={() => openModal("Favourites", favourites)}>
                        See Details
                    </button>
                </div>
            </div>
        </div>
        {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded shadow-lg">
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
        </div>
    </div>
)}
        </>
        
    );
    }
    
}
