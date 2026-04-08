import { Link, Outlet } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

function App() {

  return (
    <>
     <Header/>
      <main className='min-h-[80vh] flex flex-col items-center justify-center'>
          <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App
