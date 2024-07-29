import { Routes, Route, NavLink } from 'react-router-dom'
import { SurveyForm } from "./components/SurveryForm"
import { ShowJson } from "./components/ShowJson"

function App() {

  return (
    <>
      <header>
        <nav className="container">
          <NavLink className='text-warning fw-bold me-3' to='/'>Survey</NavLink>
          <NavLink className='text-warning fw-bold' to='/show-json'>Show JSON</NavLink>
        </nav >
      </header >
      <Routes>
        <Route path="/" element={<SurveyForm />} />
        <Route path="/show-json" element={<ShowJson />} />
      </Routes>
    </>
  )
}

export default App
