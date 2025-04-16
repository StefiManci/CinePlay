import { useEffect,useState } from "react";
import axios from "axios";

export default function Rent({ open, funct, user,movie }) {
    const d = new Date();
    const [status,setStatus]=useState(false);
    const [message,setMessage]=useState("");
    const [data,setData]=useState({
        name:user,
        movie:movie,
        date:d,
        method:"paypal",
        days:"1"
    });

    function handleStatus(){
        setStatus(!status);
    }
     // Update payment method
     const handleMethodChange = (e) => {
        setData({
            ...data,
            method: e.target.value
        });
    };
    const handleDaysChange = (e) => {
        setData({
            ...data,
            days: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/rented", data);
            setMessage("Succesful Renting");
            funct();
        handleStatus();
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <dialog
                open={open}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           w-2/5 h-3/5 bg-white rounded-lg shadow-lg p-6"
            >
                <div className="h-full w-full flex flex-col gap-6 justify-between items-center">
                    <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                        <label htmlFor="payment-method" className="text-lg font-medium text-black">
                            Select a Payment Method:
                        </label>
                        <select
                            name="payment-method"
                            id="payment-method"
                            className="w-3/4 p-2 border border-gray-300 rounded text-black"
                            value={data.method}
                            onChange={handleMethodChange}
                        >
                            <option value="paypal" className="text-black">PayPal</option>
                            <option value="visa" className="text-black">Visa</option>
                            <option value="mastercard" className="text-black">MasterCard</option>
                        </select>
                        <label htmlFor="rent-days" className="text-lg font-medium text-black">
                            How many days are you going to rent this movie?:
                        </label>
                        <select
                            name="rent-days"
                            id="rent-days"
                            className="w-3/4 p-2 border border-gray-300 rounded text-black"
                            value={data.days}
                            onChange={handleDaysChange}
                        >
                            <option value="1" className="text-black">1</option>
                            <option value="2" className="text-black">2</option>
                            <option value="3" className="text-black">3</option>
                            <option value="4" className="text-black">4</option>
                            <option value="5" className="text-black">5</option>
                            <option value="6" className="text-black">6</option>
                            <option value="7" className="text-black">7</option>
                        </select>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white w-3/4 h-10 rounded transition"
                            type="submit"
                        >
                            Rent
                        </button>
                    </form>

                    <button
                        onClick={funct}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-3/4 h-10 rounded transition"
                    >
                        Close
                    </button>
                </div>
            </dialog>
            <dialog
    open={status}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               w-1/3 max-w-sm bg-white rounded-xl shadow-2xl p-6 border border-green-200"
>
    <div className="flex flex-col gap-4 items-center justify-center">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
            ✓
        </div>
        <h2 className="text-lg font-semibold text-green-700">{message}</h2>
        <button
            onClick={handleStatus}
            className="mt-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
            Close
        </button>
    </div>
</dialog>
        </>
    );
}