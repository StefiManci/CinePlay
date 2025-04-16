import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Movie() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const titles = [
            "tt0944947", "tt1632701", "tt3107288", "tt2193021", "tt0903747", 
            "tt7366338", "tt0386676", "tt0108778", "tt2707408", "tt3581920"
        ];

        const fetchData = async () => {
            try {
                // Make API calls for each element in the predefined array
                const responses = await Promise.all(
                    titles.map(id =>
                        axios.get(`http://www.omdbapi.com/?i=${id}&apikey=7e475f2f`)
                    )
                );

                // Extract data from the responses
                const allData = responses.map(response => response.data);

                // Store the fetched data
                setData(allData);
            } catch (err) {
                console.log("Error fetching data");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-100">
            {data.map((movie, index) => (
                <Link to={`/Details?id=${movie.imdbID}`} key={index} className="w-60 h-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                    <div className="flex flex-col items-center p-4">
                        <img className="h-96 w-full object-cover rounded-md mb-4" src={movie.Poster} alt={movie.Title} />
                        <h1 className="text-center text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-200">{movie.Title}</h1>
                    </div>
                </Link>
            ))}
        </div>
    );
}
