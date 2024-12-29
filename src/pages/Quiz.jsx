import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState({});

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const quizreq = await fetch(
                    "https://opentdb.com/api.php?amount=5"
                );
                const res = await quizreq.json();

                const decodedResults = res.results.map((quiz) => {
                    const decodedQuestion = decodeHtmlEntities(quiz.question);
                    const decodedIncorrect =
                        quiz.incorrect_answers.map(decodeHtmlEntities);
                    const decodedCorrect = decodeHtmlEntities(
                        quiz.correct_answer
                    );

                    // Combine all answers
                    // const allAnswers = [...decodedIncorrect, decodedCorrect];
                    const allAnswers = [
                        ...decodedIncorrect.map((answer) => ({
                            answer,
                            isCorrect: false,
                        })),
                        { answer: decodedCorrect, isCorrect: true },
                    ];

                    // Shuffle answers using Fisher-Yates Shuffle
                    fisherYatesShuffle(allAnswers);

                    return {
                        ...quiz,
                        question: decodedQuestion,
                        all_answers: allAnswers, // Add the shuffled answers
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

    // Fisher-Yates Shuffle function
    const fisherYatesShuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    };

    // Helper function to decode HTML entities
    const decodeHtmlEntities = (text) => {
        const parser = new DOMParser();
        const decodedString =
            parser.parseFromString(text, "text/html").body.textContent || "";
        return decodedString;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 text-white p-3 text-lg font-semibold">
            {loading ? (
                <>
                    <PulseLoader color="white" />
                    <p>loading</p>
                </>
            ) : (
                quizzes.map((quiz, index) => (
                    <form
                        key={index}
                        className="flex flex-col items-center mb-5 p-4 border rounded-lg bg-purple-700 shadow-md w-[90vw]"
                    >
                        <p className="mb-3 text-center">{quiz.question}</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {quiz.all_answers.map((answerObj, answerIndex) => (
                                <button
                                    key={answerIndex}
                                    className={`px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md shadow `}
                                >
                                    {answerObj.answer}
                                </button>
                            ))}
                        </div>
                    </form>
                ))
            )}
        </div>
    );
};

export default Quiz;
