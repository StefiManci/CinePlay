import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { logout, loginWithRedirect, isAuthenticated, user } = useAuth0();

    return (
        <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-white flex flex-col lg:flex-row px-6 py-8">
            {/* Welcome Section */}
            <div className="w-full h-full flex flex-col justify-center items-center text-center space-y-4">
                <p className="text-6xl sm:text-7xl font-bold text-blue-800">WELCOME!</p>

                {isAuthenticated ? (
                    <>
                        <p className="text-5xl sm:text-6xl text-gray-800">Back</p>
                        <p className="text-4xl sm:text-5xl text-blue-600 font-medium uppercase">
                            {user.nickname}
                        </p>
                        <p className="text-6xl sm:text-7xl font-bold text-blue-400 mt-6">
                            We Missed You!
                        </p>
                        <button
                            onClick={() =>
                                logout({ logoutParams: { returnTo: window.location.origin } })
                            }
                            className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition"
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full gap-12 mt-8">
                        {/* Left Side Welcome Message */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <p className="text-5xl sm:text-6xl text-gray-800">To The Movie World</p>
                            <p className="text-3xl sm:text-4xl text-gray-600">Watch, Enjoy</p>
                            <p className="text-2xl sm:text-3xl text-gray-600 italic">
                                But most importantly...
                            </p>
                            <p className="text-6xl sm:text-8xl font-extrabold text-blue-900 mt-4">
                                Have Fun!
                            </p>
                        </div>

                        {/* CTA Section */}
                        <div className="flex flex-col justify-center items-center text-center space-y-6">
                            <div className="animate-bounce text-blue-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-12 h-12"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                    />
                                </svg>
                            </div>
                            <p className="text-4xl sm:text-5xl font-bold text-blue-700">
                                Want a better experience?
                            </p>
                            <button
                                onClick={() => loginWithRedirect()}
                                className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg uppercase transition"
                            >
                                Log In / Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
