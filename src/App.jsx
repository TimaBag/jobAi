import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthPage from './pages/auth.page'
import CompanyPage from './pages/company.page'
import TalentPage from './pages/talent.page'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<AuthPage />} />
				<Route path='/company' element={<CompanyPage />} />
				<Route path='/talent' element={<TalentPage />} />
			</Routes>
		</Router>
	)
}

export default App
