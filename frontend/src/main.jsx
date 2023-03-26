import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./store";
import {Provider} from "react-redux";
import {QueryClientProvider, QueryClient, QueryCache} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {ERROR_LIST, SERVER_ERROR_LIST} from "./ResponseStatus";
import toast, {Toaster} from "react-hot-toast";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error => {
                if (SERVER_ERROR_LIST.include(error.response?.status) || error.code === "ERR_NETWORK") {

                }
                toast.error("error")
                console.log("run")
            }
        )
    })
})

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
