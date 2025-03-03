import { Button, Container, Typography } from '@mui/material'
import { useState } from 'react'

function App() {
	const [count, setCount] = useState(0)

	return (
		<Container sx={{ textAlign: 'center', mt: 5 }}>
			<Typography variant='h3' gutterBottom>
				Welcome to MUI + React + Vite!
			</Typography>
			<Typography variant='h5'>Counter: {count}</Typography>
			<Button
				variant='contained'
				color='primary'
				onClick={() => setCount(count + 1)}
			>
				Increase
			</Button>
		</Container>
	)
}

export default App
