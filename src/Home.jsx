import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="flex flex-col text-lg items-center justify-center h-screen bg-purple-800 text-white gap-y-4 font-semibold leading-loose">
            <h3 className="text-xl lg:text-3xl">Creating Quiz apps can be fun, No ?</h3>
            <Link
                to="/quiz"
                className="bg-slate-200 text-purple-800 px-3 py-1 rounded font-bold hover:text-slate-200 hover:bg-purple-600 transition delay-75 ease-out shadow-xl"
            >
                Start quiz
            </Link>
        </main>
    );
};

export default Home;
