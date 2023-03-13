import { NativeRouter, Route, Routes } from 'react-router-native'
import Main from './pages/Main'
import New from './pages/New'

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/new' element={<New />} />
      </Routes>
    </NativeRouter>
  )
}
