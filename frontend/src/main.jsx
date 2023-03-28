import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./store";
import {Provider} from "react-redux";
import {QueryClientProvider, QueryClient, QueryCache} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Toaster position="top-right" reverseOrder={false} toastOptions={{
                    style: {
                        background: 'var(--background-main)',
                        color: 'var(--text)'
                    },
                    success: {
                        style: {
                            background: 'var(--background-main)',
                            color: 'green'
                        },
                    },
                    error: {
                        style: {
                            background: 'var(--background-main)',
                            color: 'red'
                        },
                    },
                }}/>
                <App/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
    ,
)
