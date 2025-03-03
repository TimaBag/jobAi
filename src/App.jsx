import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthPage from './pages/auth.page'
import CompanyPage from './pages/company.page'
import TalentPage from './pages/talent.page'
// import CandidateForm from './pages/candidate.page'
import CandidateProfileForm from './pages/candidate.page'
import CandidateSignUp from './pages/candidate-signup.page'
import JobList from './pages/job-list.page'
import JobDetail from './pages/job-detail.page'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<AuthPage />} />
				<Route path='/company' element={<CompanyPage />} />
				<Route path='/talent' element={<TalentPage />} />
				<Route path='/candidate' element={<CandidateProfileForm />} />
				<Route path='/candidate/signup' element={<CandidateSignUp />} />
				<Route path="/jobs" element={<JobList />} />
        		<Route path="/jobs/:id" element={<JobDetail />} />
			</Routes>
		</Router>
	)
}

export default App
