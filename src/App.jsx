import { Routes, Route } from 'react-router-dom'
import { routes } from './routes.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import BareLayout from './layouts/BareLayout.jsx'
import NotFound from './pages/NotFound.jsx'

const layouts = {
  main: MainLayout,
  bare: BareLayout,
}

export default function App() {
  return (
    <Routes>
      {routes.map((route) => {
        const Layout = layouts[route.layout] ?? MainLayout
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        )
      })}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  )
}
