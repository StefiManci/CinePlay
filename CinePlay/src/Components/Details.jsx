import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Info from './Info';
import Interactions from './Interactions';
import { useAuth0 } from '@auth0/auth0-react';

export default function Details() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('id');
    const [data, setData] = useState(null);
    const [show, setShow] = useState("0");
    const { isAuthenticated } = useAuth0();

    const handleClick1 = () => {
        setShow("1");
    }

    const handleClick2 = () => {
        setShow("2");
    }

    useEffect(() => {
        if (code) {
            axios.get(`http://www.omdbapi.com/?i=${code}&apikey=7e475f2f`)
                .then((response) => {
                    setData(response.data);
                })
        }
    }, [code]);

    return (
        <div className="flex flex-col items-center w-full py-10 bg-gray-100">
            <div className="flex  w-10/12 md:w-3/4 gap-10 bg-white p-5 rounded-lg shadow-lg">
                {/* Poster Section */}
                <div className="w-full md:w-1/3 flex justify-center mb-5 md:mb-0">
                    {data && 
                        <img src={data.Poster} alt={data.Title} className="h-96 w-auto object-cover rounded-md shadow-md" />
                    }
                </div>
                {/* Content Section - Information and Interactions */}
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                    {/* Buttons to toggle between Movie Information and Interactions */}
                    <div className="flex gap-5 justify-center mb-8">
                        <button 
                            onClick={handleClick1} 
                            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                        >
                            Movie Information
                        </button>
                        <button 
                            onClick={handleClick2} 
                            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                        >
                            Movie Interactions
                        </button>
                    </div>
                    {/* Content Section - Display based on state */}
                    <div className="w-full">
                        {show === "0" ? 
                            <div></div> 
                        : show === "1" ? 
                            <Info data={data} />
                        : show === "2" && isAuthenticated ? 
                            <Interactions title={data.Title} id={data.imdbID} />
                        : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}
