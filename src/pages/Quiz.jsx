import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const quizreq = await fetch(
                    "https://opentdb.com/api.php?amount=3"
                );
                const res = await quizreq.json();

                const decodedResults = res.results.map((quiz) => {
                    const decodedQuestion = decodeHtmlEntities(quiz.question);
                    const decodedIncorrect =
                        quiz.incorrect_answers.map(decodeHtmlEntities);
                    const decodedCorrect = decodeHtmlEntities(
                        quiz.correct_answer
                    );

                    const allAnswers = [
                        ...decodedIncorrect.map((answer) => ({
                            answer,
                            isCorrect: false,
                        })),
                        { answer: decodedCorrect, isCorrect: true },
                    ];

                    fisherYatesShuffle(allAnswers);

                    return {
                        ...quiz,
                        question: decodedQuestion,
                        all_answers: allAnswers,
                    };
                });

                setQuizzes(decodedResults);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    const fisherYatesShuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const decodeHtmlEntities = (text) => {
        const parser = new DOMParser();
        return parser.parseFromString(text, "text/html").body.textContent || "";
    };

    const handleAnswerSelect = (quizIndex, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [quizIndex]: answer,
        }));
    };

    const handleSubmit = () => {
        const allQuestionsAnswered =
            quizzes.length === Object.keys(userAnswers).length;

        if (allQuestionsAnswered) {
            navigate("/review", { state: { quizzes, userAnswers } });
        } else {
            toast.error("Please answer all questions before submitting.", {
                position: "top-center",
                autoClose: 3000, // Closes after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 text-white p-3 text-lg font-semibold">
            <ToastContainer />

            {loading ? (
                <>
                    <PulseLoader color="white" />
                    <p className="mt-3">Loading quizzes...</p>
                </>
            ) : (
                <div>
                    {quizzes.map((quiz, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center mb-5 p-4 border rounded-lg bg-purple-700 shadow-md w-[90vw]"
                        >
                            <p className="mb-3 text-center">{quiz.question}</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {quiz.all_answers.map(
                                    (answerObj, answerIndex) => (
                                        <button
                                            key={answerIndex}
                                            type="button"
                                            className={`px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md shadow ${
                                                userAnswers[index] ===
                                                answerObj.answer
                                                    ? "ring-4 ring-purple-300"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleAnswerSelect(
                                                    index,
                                                    answerObj.answer
                                                )
                                            }
                                        >
                                            {answerObj.answer}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleSubmit}
                        className="bg-slate-200 text-purple-800 px-3 py-1 rounded font-bold hover:text-slate-200 hover:bg-purple-600 transition delay-75 ease-out mx-auto shadow-xl block"
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
