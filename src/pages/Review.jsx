import { useLocation, Link } from "react-router-dom";

const Review = () => {
    const { state } = useLocation();
    const { quizzes, userAnswers } = state;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 text-white p-3 text-lg font-semibold">
            {quizzes.map((quiz, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center mb-5 p-4 border rounded-lg bg-purple-700 shadow-md w-[90vw]"
                >
                    <p className="mb-3 text-center">{quiz.question}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {quiz.all_answers.map((answerObj, answerIndex) => {
                            const isCorrect =
                                answerObj.answer === quiz.correct_answer;
                            const isSelected =
                                userAnswers[index] === answerObj.answer;

                            return (
                                <div
                                    key={answerIndex}
                                    className={`px-4 py-2 text-center rounded-md shadow ${
                                        isCorrect
                                            ? "bg-green-500 text-white"
                                            : isSelected
                                            ? "bg-red-500 text-white ring-4 ring-purple-300"
                                            : "bg-purple-600 text-white"
                                    }`}
                                >
                                    {answerObj.answer}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            <Link
                to={"/quiz"}
                className="bg-slate-200 text-purple-800 px-3 py-1 rounded font-bold hover:text-slate-200 hover:bg-purple-600 transition delay-75 ease-out mx-auto shadow-xl block"
            >
                Try again
            </Link>
        </div>
    );
};

export default Review;
