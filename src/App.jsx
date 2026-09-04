import AdminFAQ from "./admin/AdminFAQ";
import Events from "./pages/Events";
import AdminEvents from "./admin/AdminEvents";
import AdminApplications from "./admin/AdminApplications";
import AdminAlumni from "./admin/AdminAlumni";
import AdminGallery from "./admin/AdminGallery";
import AdminBlog from "./admin/AdminBlog";
import AdminTeam from "./admin/AdminTeam";
import AdminRoute from "./admin/AdminRoute";
import AdminProjects from "./admin/AdminProjects";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Team from "./pages/Team"
import Blog from "./pages/Blog"
import Gallery from "./pages/Gallery"
import FAQ from "./pages/FAQ"
import Join from "./pages/Join"
import Alumni from "./pages/Alumni"
import Contact from "./pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/projects"
  element={
    <AdminRoute>
      <AdminProjects />
    </AdminRoute>
  }
/>
<Route
  path="/admin/team"
  element={
    <AdminRoute>
      <AdminTeam />
    </AdminRoute>
  }
/>
<Route
  path="/admin/blog"
  element={
    <AdminRoute>
      <AdminBlog />
    </AdminRoute>
  }
/>
<Route
  path="/admin/gallery"
  element={
    <AdminRoute>
      <AdminGallery />
    </AdminRoute>
  }
/>
<Route
  path="/admin/alumni"
  element={
    <AdminRoute>
      <AdminAlumni />
    </AdminRoute>
  }
/>
<Route
  path="/admin/applications"
  element={
    <AdminRoute>
      <AdminApplications />
    </AdminRoute>
  }
/>
<Route
  path="/admin/events"
  element={
    <AdminRoute>
      <AdminEvents />
    </AdminRoute>
  }
/>
<Route
  path="/admin/faq"
  element={
    <AdminRoute>
      <AdminFAQ />
    </AdminRoute>
  }
/>
        <Route path="/events" element={<Events />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/join" element={<Join />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App