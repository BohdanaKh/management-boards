import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";

import './index.css'
import {routerConfig} from "./router/router.tsx";
import {setupStore} from "./redux/store.ts";

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={routerConfig}/>
    </Provider>
);
