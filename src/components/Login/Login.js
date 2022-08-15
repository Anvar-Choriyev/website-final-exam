import { useContext, useState} from "react"
import Select from "react-select"
import AppContext from "../../context/appContext"
import styles from "./Login.module.css"

const categories = [
    {value: "Computers", label: "Computers"},
]

const Login = props => {

    const [selectedCategory, setSelectedCategory] = useState(null)

    const ctx = useContext(AppContext)

    const submitHandler = e => {
        e.preventDefault()
        ctx.onLogIn(props.selectedAmount, selectedCategory)
    }

    return ( 
        <>
            <h1>Final Exam</h1>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.select}>
                <label>
                Number of Questions:
                    <Select 
                        onChange={props.changeHandler}
                        options={props.amounts} 
                        />
                </label>
                <br />
                <label>
                Select Category:
                    <Select 
                    defaultValue={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                    />
                </label>
                </div>
                <button type="submit">START</button>
                <button type="submit">TESTS</button>
            </form>
        </>
     );
}
 
export default Login;