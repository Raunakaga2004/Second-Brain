import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { useRecoilValue } from 'recoil'
import { reloadRecoil } from './store/atom'
import { Share } from './pages/Share'
// import LandingPage from './components/ui/LandingPage'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'
import Home from './pages/Home'
import { EditWindowModal } from './components/ui/EditWindowModal'
import { PreviewModal } from './components/ui/PreviewModel'
import { ContentPage } from './pages/ContentPage'

function App() {

  return <BrowserRouter>

    <EditWindowModal/>
    <PreviewModal/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path='/share' element={<Share/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/:type" element={<ContentPage />} />
      {/* temporary routes */}
      {/* <Route path='/landing' element={<LandingPage/>}/> */}
    </Routes>
  </BrowserRouter>
}

export default App