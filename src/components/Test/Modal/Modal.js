import { useContext } from "react"
import ReactDOM from "react-dom"
import AppContext from "../../../context/appContext"
import styles from "./Modal.module.css"

const Modal = (props) => {
    const scorePersentage = props.score*100/props.amount

    const ctx = useContext(AppContext)
    const Backdrop = props => {
        return <div className={styles.backdrop} onClick={props.onClose}></div>
    }
    const Overlay = props => {
        return (<div className={styles.modal}>
            <div className={styles.modal_field}>
                <h1>Your results</h1>
                <p>{props.score}/{props.amount}</p>
                <p>or</p>
                <p>{Math.ceil(scorePersentage)} %</p>   
                <div>
                    <button className={styles.btn_ok} onClick={props.onClose}>OK</button>
                    <button className={styles.btn_home} onClick={ctx.onLogOut}>GO HOME</button>
                </div>
            </div>
            {props.children}
            </div>)
    }
    const portalElement = document.getElementById("modal")

    return ( 
        <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onHideCart}/>, portalElement)}
        {ReactDOM.createPortal(<Overlay onClose={props.onHideCart} 
        score={props.score} amount={props.amount}/>, portalElement)}
        {props.children}
        </>
    );
}
 
export default Modal;