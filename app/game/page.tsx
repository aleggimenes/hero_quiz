"use client";
import { Card } from "../_components/Card"
import { Footer } from "../_components/Footer"
import pageStyles from '../page.module.css'
import config from '../../config.json'
import { Alternative } from "../_components/Alternative";
import React from "react";
import { useRouter } from "next/navigation"
const questions = config.questions;

const answerStates = {
    DEFAULT: 'DEFAULT',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS'
} as const;

export default function GameScreen() {
    const router = useRouter();
    const [answerState, setAnswerState] = React.useState<keyof typeof answerStates>(answerStates.DEFAULT);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState([]);
    const questionNumber = currentQuestion + 1;
    const question = questions[currentQuestion];
    const isLastQuestion = questionNumber === questions.length

    React.useEffect(() => {
        if (isLastQuestion) {
            const totalPoints = userAnswers.reduce((_totalPoints, currentAnswer) => {
                if (currentAnswer === true) {
                    return _totalPoints + 1;
                }
                return _totalPoints
            }, 0)
            alert(`Voce concluiu o desafio! e acertou ${totalPoints}`);
            router.push("/")
            return;
        }
    }, [userAnswers])

    return (
        <main className={pageStyles.screen} style={{
            flex: 1,
            backgroundImage: `url("https://place-hold.it/1366x768")`
        }}>
            <section>
                <Card headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}>
                    <h1>
                        {question?.title}
                    </h1>
                    <p>
                        {question?.description}
                    </p>
                    <form
                        style={{
                            marginTop: "24px"
                        }}
                        onSubmit={(event) => {
                            event.preventDefault()
                            const $questionInfo = event.target as HTMLFormElement;
                            const formData = new FormData($questionInfo)
                            const { alternative } = Object.fromEntries(formData.entries())
                            const isCorrectAnswer = alternative === question.answer;

                            if (isCorrectAnswer) {

                                setUserAnswers([...userAnswers, true])
                                setAnswerState(answerStates?.SUCCESS);
                            }

                            if (!isCorrectAnswer) {
                                setUserAnswers([...userAnswers, false])

                                setAnswerState(answerStates?.ERROR);

                            }
                            setTimeout(() => {
                                if (isLastQuestion) {
                                    return;
                                }
                                setCurrentQuestion(currentQuestion + 1)
                                setAnswerState(answerStates?.DEFAULT);
                            }, 2 * 1000);
                        }}
                    >
                        {question?.alternatives?.map((alternative, index) => (
                            <div
                                key={alternative + index}
                                style={{ marginBottom: "8px" }}
                            >
                                <Alternative
                                    label={alternative}
                                    order={index}
                                />
                            </div>
                        ))}
                        {answerState === answerStates.DEFAULT && (
                            <button>
                                Confirmar
                            </button>
                        )}
                        <p style={{ textAlign: 'center' }}>
                            {answerState === answerStates.ERROR && (
                                "❌"
                            )}
                            {answerState === answerStates.SUCCESS && (
                                "✅"
                            )}
                        </p>

                    </form>
                </Card>
                <Footer />
            </section>
        </main>
    )
}