import { useState } from "react";
import AppContext from "./appContext"

const AppContextProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false)
    const logInHandler = (selectedAmount, selectedCategory) => {
        if(selectedAmount, selectedCategory) {
            setIsAuth(true)
        }
    }
    const logOutHandler = (selectedAmount, selectedCategory) => {
        setIsAuth(false)
    }
    return (  
        <AppContext.Provider value={{isAuth, 
        onLogIn: logInHandler, onLogOut: logOutHandler}}>
            {props.children}
        </AppContext.Provider>
    );
}
 
export default AppContextProvider;