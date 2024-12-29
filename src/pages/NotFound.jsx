import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-purple-800 text-white p-4">
            <div className="flex flex-col items-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-4 text-center">
                    Oops! It looks like you're lost.
                </p>
                <p className="mb-6 text-lg">
                    The page you are looking for doesn't exist.
                </p>
                <Link
                    to={"/"}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
