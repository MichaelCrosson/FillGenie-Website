import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { ComingSoon } from './pages/ComingSoon';
import { Security } from './pages/Security';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ScheduleDemo } from './pages/ScheduleDemo';
import { CaseStudies } from './pages/CaseStudies';
import { CustomSolutions } from './pages/CustomSolutions';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="coming-soon" element={<ComingSoon />} />
            <Route path="security" element={<Security />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="schedule-demo" element={<ScheduleDemo />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="custom-solutions" element={<CustomSolutions />} />
          <Route path="login" element={<Login />} />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="blog" element={<Blog />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
