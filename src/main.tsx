import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import BaseComponent from './components/molecules/BaseComponent.tsx'
import { faHome, faMap, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons'
import Ships from './pages/Ships.tsx'
import Map from './pages/Map.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const nav = [
  {
    label: "Dashboard",
    path: "/",
    icon: faHome,
    component: <App />
  },
  {
    label: "Ships",
    path: "/ships",
    icon: faSpaceShuttle,
    component: <Ships />
  },
  {
    label: "Map",
    path: "/map",
    icon: faMap,
    component: <Map />
  }

]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 2000,
      retry: 3,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <script src="https://kit.fontawesome.com/76602e036c.js" crossOrigin="anonymous"></script>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {nav.map((item) => (
            <Route key={item.path} path={item.path} element={
              <BaseComponent navItems={nav}>
                {item.component}
              </BaseComponent>
            } />
          ))}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
