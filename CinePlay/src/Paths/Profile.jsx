export default function Profile() {
    return (
        <div className="h-screen w-full flex flex-col items-center py-8 bg-gray-100">
            {/* Profile Header */}
            <div className="h-1/6 w-4/5 flex flex-col sm:flex-row gap-6 place-items-center border-b-2 border-gray-300 pb-6">
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-semibold text-blue-800">John Doe</h1>
                    <p className="text-lg text-gray-600">johndoe@example.com</p>
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
                    <div className="text-3xl text-white font-bold">10</div>
                    <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300">
                        See Details
                    </button>
                </div>

                {/* Watched */}
                <div className="h-72 w-60 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 rounded-lg p-6 flex flex-col justify-between items-center shadow-lg">
                    <h2 className="text-2xl text-white font-semibold">Watched</h2>
                    <div className="text-3xl text-white font-bold">15</div>
                    <button className="mt-4 bg-white text-green-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300">
                        See Details
                    </button>
                </div>

                {/* Rented */}
                <div className="h-72 w-60 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg p-6 flex flex-col justify-between items-center shadow-lg">
                    <h2 className="text-2xl text-white font-semibold">Rented</h2>
                    <div className="text-3xl text-white font-bold">5</div>
                    <button className="mt-4 bg-white text-yellow-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300">
                        See Details
                    </button>
                </div>

                {/* Favourites */}
                <div className="h-72 w-60 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-6 flex flex-col justify-between items-center shadow-lg">
                    <h2 className="text-2xl text-white font-semibold">Favourites</h2>
                    <div className="text-3xl text-white font-bold">20</div>
                    <button className="mt-4 bg-white text-pink-600 px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300">
                        See Details
                    </button>
                </div>
            </div>
        </div>
    );
}
