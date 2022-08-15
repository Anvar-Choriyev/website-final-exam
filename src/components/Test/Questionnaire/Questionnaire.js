import React from "react";
import styles from "./Questionnaire.module.css"

const Questionnaire = ({handleAnswer, showAnswers, handleNextQuestion, handlePrevQuestion, 
     answerIndex, data:{question, correct_answer, answers}}
     ) => {
    return ( 
        <>
            <div className={styles.test}>
                <div className={styles.question}>
                    <p dangerouslySetInnerHTML={{__html:question}}/>
                </div>
                <div>
                    <ul>
                        {answers.map(answer => {
                            const specialClassName = answer === answerIndex
                             ? styles.gray : ""
                             const checkAnswer = showAnswers ? (answer === correct_answer
                                ? styles.green : styles.red) : ""
                            return <li className={specialClassName} 
                            onClick={()=>handleAnswer(answer)}>
                                 <span className={checkAnswer} onClick={handleAnswer}
                                 >{answer}</span></li>
                             })}     
                    </ul>
                </div>
                <div className={styles.control}>
                    <button onClick={handlePrevQuestion}>PREVIOUS</button>
                    <button onClick={handleNextQuestion}>NEXT</button>
                </div>
            </div>
        </>
     );
}
 
export default Questionnaire;