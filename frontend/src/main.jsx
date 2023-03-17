import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./store";
import {Provider} from "react-redux";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
    ,
)
