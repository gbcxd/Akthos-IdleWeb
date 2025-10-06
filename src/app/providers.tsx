'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';


export default function Providers({ children }: { children: ReactNode }) {
const [client] = useState(() => new QueryClient());
return (
<QueryClientProvider client={client}>
{children}
<ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
);
}