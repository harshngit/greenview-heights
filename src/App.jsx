import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ContentProvider } from './context/ContentContext'
import { I18nProvider } from './i18n/I18nContext'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Facilities from './pages/Facilities'
import Notices from './pages/Notices'
import Gallery from './pages/Gallery'
import Documents from './pages/Documents'
import Contact from './pages/Contact'
import Resources from './pages/Resources'
import Admin from './pages/Admin'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <ContentProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="facilities" element={<Facilities />} />
              <Route path="notices" element={<Notices />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="documents" element={<Documents />} />
              <Route path="contact" element={<Contact />} />
              <Route path="resources" element={<Resources />} />
              <Route path="privacy" element={<Legal kind="privacy" />} />
              <Route path="terms" element={<Legal kind="terms" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="admin" element={<><ScrollToTop /><Admin /></>} />
          </Routes>
        </ContentProvider>
      </I18nProvider>
    </MotionConfig>
  )
}
