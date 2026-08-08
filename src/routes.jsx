import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Experience from './pages/Experience.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export const routes = [
  {
    path: '/',
    element: <Home />,
    label: 'Home',
    showInNav: true,
    layout: 'main',
  },
  {
    path: '/projects',
    element: <Projects />,
    label: 'Projects',
    showInNav: true,
    layout: 'main',
  },
  {
    path: '/experience',
    element: <Experience />,
    label: 'Experience',
    showInNav: true,
    layout: 'main',
  },
  {
    path: '/about',
    element: <About />,
    label: 'About',
    showInNav: true,
    layout: 'main',
  },
  {
    path: '/contact',
    element: <Contact />,
    label: 'Contact',
    showInNav: true,
    layout: 'main',
  },
]
