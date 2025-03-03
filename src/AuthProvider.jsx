import { clearKompassifyInfo } from '@core/utils'
import { DotWave } from '@uiball/loaders'
import Cookies from 'js-cookie'
import { createContext, useCallback, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import {
	fetchUserApp,
	fetchUserSessions,
	fetchUserTokens,
} from './services/auth.service'

const AuthContext = createContext({
	isAuthenticated: false,
	isLoading: true,
	tokens: null,
	login: () => '',
	logout: () => '',
})

export const ACCESS_TOKEN_NAME = 'ACCESS_TOKEN'

export function AuthProvider({ children, logoutUrl, loginUrl }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [tokens, setTokens] = useState(null)
	const [sessions, setSessions] = useState(null)

	const { isLoading } = useQuery('tokens', {
		queryFn: fetchUserTokens,
		// eslint-disable-next-line no-shadow
		onSuccess: tokens => {
			localStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token)
			setTokens(tokens)
			setIsAuthenticated(true)
			Cookies.remove('redirect_url')
		},
		onError: () => {
			Cookies.set('redirect_url', window.location.href)
		},
	})

	const sessionsQuery = useQuery('sessions', {
		queryFn: fetchUserSessions,
		onSuccess: data => {
			setSessions(data)
		},
	})

	const login = useCallback(() => {
		window.location.replace(loginUrl)
	}, [loginUrl])

	const logout = useCallback(() => {
		window.location.replace(logoutUrl)
		localStorage.removeItem(ACCESS_TOKEN_NAME)
		clearKompassifyInfo()
	}, [logoutUrl])

	useQuery('app', {
		queryFn: fetchUserApp,
		onSuccess: user_app_host => {
			if (!user_app_host) {
				logout()
				return
			}
			if (user_app_host !== window.location.origin) {
				window.location.replace(user_app_host)
			}
		},
		onError: () => {
			logout()
		},
	})

	if (isLoading || sessionsQuery.isLoading)
		return (
			<div
				className='d-flex w-100  align-items-center justify-content-center'
				style={{ height: '100vh' }}
			>
				<DotWave size={48} speed={1} color='black' />
			</div>
		)

	if (!isAuthenticated) return <>{window.location.replace(loginUrl)}</>

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				login,
				logout,
				tokens,
				sessions,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
