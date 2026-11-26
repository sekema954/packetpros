//App.tsx-react-routing component

import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Home } from './pages/Home'
import { Academy } from './pages/Academy'
import { Community } from './pages/Community'
//import { Resources } from './pages/Resources'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import BlogPost from './pages/BlogPost'
import { Enroll } from './enroll'
import Blogs from './pages/Blogs'
import { PacketPros } from './packprosvideos/student_dashboard'
import Videos from './pages/youtubeVideos'
import { ProtectedRoute } from './components/protectedRoute'
import AdminDashboard from './admin/crm'
import Admin from './admin/crm_sections/manageblog'

const Layout = () => {
  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}


const App = () => {
  return(
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Home />} />
          <Route path='/academy' element={<Academy/>} />
          <Route path='/community' element={<Community />} />
          {/**<Route path='/resources' element={<Resources />} />**/}
          <Route path='/about' element={<About />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>


        <Route path='/crm' element={<AdminDashboard />} />
        <Route path='/dashboard' element={<Admin/>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/enroll' element={<Enroll />} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/packetPros' element={<PacketPros />} />
        </Route>
      </Routes>
  )
}

export default App