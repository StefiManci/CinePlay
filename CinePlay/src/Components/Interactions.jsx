import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { data, Link } from "react-router-dom";
import Buy from "../Modals/Buy";
import Rent from "../Modals/Rent";

export default function Interactions({ title, id }) {
    const d = new Date();
    /*Display Message State*/
    const [favstatus,setFavStatus]=useState(false);
    const [favmessage,setFavMessage]=useState("");

    const [commentstatus,setCommentStatus]=useState(false);
    const [commentmessage,setCommentMessage]=useState("");

    /*Display Message Functions*/
     function handleFavStatus(){
        setFavStatus(!favstatus);
    }

    function handleCommentStatus(){
        setCommentStatus(!commentstatus);
    }

    /*Other Functions*/
    const [buy, setBuy] = useState(false);
    const [rent, setRent] = useState(false);
    const { user, isAuthenticated } = useAuth0();
    const [seecomment,setSeeComment]=useState(false);
    const [comments,setComments]=useState([]);
    const [comment, setComment] = useState({
        name: user.sub,
        movie: title,
        text: "",
        date: d,
    });
    const [watched, setWatched] = useState({
        name: user.sub,
        movie: title,
        date: d,
    });

    const [favourite,setFavourite]=useState({
        name:user.sub,
        movie:title,
        date:d,
    });

    const handleChange = (e) => {
        const { value } = e.target;
        setComment({
            ...comment,
            text: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/comments", comment);
            setCommentMessage("You Commented on this movie!");
            handleCommentStatus();
        } catch (error) {
            console.log(error);
        }
    };

    const handleWatch = async () => {
        try {
            await axios.post("http://localhost:3000/watched", watched);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddFavourite=async ()=>{
        try {
            await axios.post("http://localhost:3000/favourites", favourite);
            setFavMessage("You added this movie to your Favourites!");
            handleFavStatus();
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = () => {
        setBuy(true);
    };
    const handleRent = () => {
        setRent(true);
    };

    function handleCloseBuy() {
        setBuy(false);
    }

    function handleCloseRent() {
        setRent(false);
    } 
    
    function handleSeeComment(){
        setSeeComment(!seecomment);
    }

    

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get("http://localhost:3000/comments");
                // Filter comments for this movie
                const movieComments = res.data.filter(c => c.movie_title === title);
                setComments(movieComments);
            } catch (error) {
                console.log("Error fetching comments:", error);
            }
        };
    
        fetchComments();
    }, [title]); 
    return (
        <>
            <div className="h-full w-full flex flex-col justify-start gap-6 items-center py-8 px-4 bg-gray-50 rounded-lg shadow-md">
                <Buy open={buy} funct={handleCloseBuy} user={user.sub} movie={title}/>
                <Rent open={rent} funct={handleCloseRent} user={user.sub} movie={title} />

                {/* Comment Form */}
                <div className="w-full max-w-2xl">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <input
                            type="text"
                            name="text"
                            value={comment && comment.text}
                            onChange={handleChange}
                            placeholder="Leave a comment..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Actions */}
                <div className="w-full max-w-2xl flex flex-wrap gap-4 justify-center">
                    <Link
                        to={`https://vidsrc.icu/embed/movie/${id}`}
                        target="_blank"
                        onClick={handleWatch}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-center"
                    >
                        Watch Movie
                    </Link>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={handleBuy}
                    >
                        Buy
                    </button>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={handleRent}
                    >
                        Rent
                    </button>
                </div>

                {/* Favorites and Comments */}
                <div className="w-full max-w-2xl flex flex-wrap gap-4 justify-center mt-4">
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition" onClick={handleAddFavourite}>
                        Add to Favourites
                    </button>
                    <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition" onClick={handleSeeComment}>
                        {seecomment ? "Hide Comments" : "Show Comments"}
                    </button>
                </div>
                {seecomment ? <div className="w-full max-w-2xl mt-6">
    <h2 className="text-xl font-semibold mb-4">Comments</h2>
    {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
    ) : (
        <ul className="space-y-4">
            {comments.map((c, idx) => (
                <li key={idx} className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
                    <p className="text-sm text-gray-600 mb-1"><strong>User:</strong> {c.user_sub}</p>
                    <p className="text-gray-800">{c.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(c.comment_date).toLocaleString()}</p>
                </li>
            ))}
        </ul>
    )}
</div> : ""}

            </div>
            <dialog
    open={favstatus}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               w-1/3 max-w-sm bg-white rounded-xl shadow-2xl p-6 border border-green-200"
>
    <div className="flex flex-col gap-4 items-center justify-center">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
            ✓
        </div>
        <h2 className="text-lg font-semibold text-green-700">{favmessage}</h2>
        <button
            onClick={handleFavStatus}
            className="mt-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
            Close
        </button>
    </div>
</dialog>
<dialog
    open={commentstatus}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               w-1/3 max-w-sm bg-white rounded-xl shadow-2xl p-6 border border-green-200"
>
    <div className="flex flex-col gap-4 items-center justify-center">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
            ✓
        </div>
        <h2 className="text-lg font-semibold text-green-700">{commentmessage}</h2>
        <button
            onClick={handleCommentStatus}
            className="mt-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
            Close
        </button>
    </div>
</dialog>
        </>
    );
}