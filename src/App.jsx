import { Routes, Route, NavLink } from 'react-router-dom'
import { SurveyForm } from "./components/SurveryForm"
import { ShowJson } from './components/ShowJson';

function App() {

  return (
    <>
      <header className='nav bg-primary bg-opacity-50 py-3'>
        <nav className="container">
          <NavLink className='h4 text-decoration-none text-warning fw-bold me-4' to='/'>Survey</NavLink>
          <NavLink className='h4 text-decoration-none text-warning fw-bold' to='/show-json'>Show JSON</NavLink>
        </nav >
      </header >

      <Routes>
        <Route path="/" element={<SurveyForm />} />
        <Route path="/show-json" element={
          <ShowJson />
        } />
      </Routes>
    </>
  )
}

export default App
