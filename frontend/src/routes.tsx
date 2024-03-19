import { Route , Routes, BrowserRouter} from "react-router-dom";
import HomePage from "./pages/home";


export function Rotas (){

    return(

        <BrowserRouter>
            <Routes>
                <Route path = '/' element ={<HomePage/>}/>
            </Routes>
        </BrowserRouter>

    )
}

