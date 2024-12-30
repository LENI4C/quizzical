import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="sticky top-0 bg-purple-700 shadow-lg z-50">
            <Link to={"/"} className="block">
                <h1 className="text-3xl font-bold text-white py-3 px-6  hover:bg-purple-600 transition-all ease-in-out duration-200 text-center">
                    Quizzical
                </h1>
            </Link>
        </header>
    );
};

export default Header;
