import styles from "./TestPage.module.css"
import { useCallback, useEffect, useMemo, useState } from "react";
import Questionnaire from "../Questionnaire/Questionnaire";
import Modal from "../Modal/Modal"

const TestPage = props => {

    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(1)
    const [score, setScore] = useState(0)
    const [showAnswers, setShowAnswers] = useState(false)
    const [answerIndex, setAnswerIndex] = useState(0)
    const [isCartShown, setIsCartShown] = useState(false)

    const makeAPICall = useCallback(async ()=> {
        try {
            const response = await 
            fetch(`https://opentdb.com/api.php?amount=${amount+1}&category=18`);
            const data = await response.json();
            const questions = data.results.map((question) => ({
                ...question,
                answers: [question.correct_answer, ...question.incorrect_answers].sort(() => 
                    Math.random() - 0.5
                )
            }))
            setQuestions(questions)
          }
          catch (err) {
            console.log(err)
          }
        },[])    
        useEffect(() => {
            makeAPICall();
          }, [])
        const amount = props.selectedAmount.value;
        const countColumns = (start, amount) => {
            return Array(amount - start + 1).fill().map(() => {
               return start++
            })
        }
        const amountAnswers = countColumns(1, amount)

        const touchNumber = (number) => {
            setCurrentIndex(number)
            setQuestions(questions)
        }

        const handleAnswer = (answer) => {
            if(!showAnswers) {
                if(answer === questions[currentIndex].correct_answer) {
                    setScore(score+1)
                }
            }
            setAnswerIndex(answer)
        }
        const handleNextQuestion = () => {
            if(currentIndex<amount) {
                setCurrentIndex(currentIndex+1)
            }
        }
        const handlePrevQuestion = () => {
            if(currentIndex>1) {
                setCurrentIndex(currentIndex-1)
            }
        }
        const submitHandler = (answer) => {
            handleAnswer()
            setShowAnswers(true)
        }
        const showCartHandler = () => {
            setIsCartShown(true)
          }
        const hideCartHandler = () => {
            setIsCartShown(false)
        }
    return ( 
        <>
        <nav className={styles.navbar}>
            <span>Final Exam</span>
            <span>{currentIndex}/{amount}</span>
            <button onClick={showCartHandler}><a onClick={submitHandler}>FINISH</a></button>
        </nav>
        <div className={styles.table}>
            <table>
            <tbody>
            <tr>
                {amountAnswers.map(number => {
                    const numberClass = number===currentIndex ? styles.blue : ""
                return <td className={numberClass} onClick={()=>touchNumber(number)}>
                    {number}</td>})}
            </tr>
            </tbody>
            </table>
        </div>
        {
            questions.length>0 ? (
                <div>
                    {isCartShown ? (
                        <Modal onShowCart={showCartHandler} onHideCart={hideCartHandler} 
                        score={score} amount={amount} />
                    )  
                    :(<Questionnaire handleAnswer={handleAnswer} 
                        showAnswers={showAnswers}
                        currentIndex={currentIndex}
                        answerIndex={answerIndex}
                        handleNextQuestion={handleNextQuestion}
                        handlePrevQuestion={handlePrevQuestion}
                        submitHandler={submitHandler}
                        data={questions[currentIndex]}/>)} 
                </div>): "Loading..."}
        </>
     );
}
 
export default TestPage;