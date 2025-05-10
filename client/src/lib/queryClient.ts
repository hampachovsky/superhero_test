import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

const queryConfig = {
	queries: {
		// throwOnError: true,
		// refetchOnWindowFocus: false,
		retry: false,
		staleTime: 1000 * 60,
	},
} satisfies DefaultOptions

export const queryClient = new QueryClient({
	defaultOptions: queryConfig,
})
