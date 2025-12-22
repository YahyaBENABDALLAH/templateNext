"use client"

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  })
}

let browserQueryClient: QueryClient | null = null

function getQueryClient() {
  if (isServer) {
    // new client per request on the server
    console.log("SSR")
    return createQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient()
  }

  return browserQueryClient
}

export function ReactQueryProvider({ children }: PropsWithChildren<unknown>) {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}><ReactQueryDevtools initialIsOpen={false} />{children}</QueryClientProvider>
}
