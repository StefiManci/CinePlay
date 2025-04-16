import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Search() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        if (search) {
            axios
                .get(`http://www.omdbapi.com/?t=${search}&apikey=7e475f2f`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching movie data:", error);
                });
        }
    }, [search]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 to-white p-4">
                {/* Search Input */}
                <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center mb-6">
                    <input
                        type="text"
                        className="w-full p-4 rounded-xl border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                        placeholder="Search for movies..."
                        value={search}
                        onChange={handleChange}
                    />
                </div>

                {/* Display Movie Data */}
                <div className="w-full flex justify-center items-center space-y-4">
                    {data ? (
                        <Link to={`/Details?id=${data.imdbID}`} className="flex flex-col items-center transition-transform transform hover:scale-105">
                            <div className="w-full max-w-xs text-center text-blue-800 font-semibold text-2xl">{data.Title}</div>
                            <img
                                src={data.Poster}
                                alt={data.Title}
                                className="rounded-xl w-full h-auto transition-transform transform hover:scale-105"
                                loading="lazy"
                            />
                        </Link>
                    ) : (
                        search && (
                            <p className="text-xl text-gray-500">No results found for "{search}"</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
