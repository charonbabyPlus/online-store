import AppRoutes from "../Routes/Routes";
import './App.css'
import Header from "../Layouts/Header/Header";
import Footer from "../Layouts/Footer/Footer";


const App = () => {

      
    return( 
    <div className="app">
        <Header />
            <AppRoutes />
        <Footer />
       
    </div>
    )
}

export default App