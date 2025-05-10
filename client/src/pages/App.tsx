import { router } from '@/features/navigation'
import { RouterProvider } from 'react-router'

export function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}
