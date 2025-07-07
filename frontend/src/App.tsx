import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { useRecoilValue } from 'recoil'
import { reloadRecoil } from './store/atom'
import { Share } from './pages/Share'

function App() {

  const reloadRecoilValue = useRecoilValue(reloadRecoil);

  return <BrowserRouter>

    {console.log(reloadRecoilValue)}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path='/share' element={<Share/>}/>
    </Routes>
  </BrowserRouter>
}

export default App