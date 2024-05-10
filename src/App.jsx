
import { useContext } from 'react'
import { UserContext } from './Components/Context/userContext'
import Search from './Components/Search'
import MainDashboard from './Components/MainDashboard'
import SubDashboard from './Components/SubDashboard'

function App() {
const {isSearch} = useContext(UserContext)

  return (
    <section className='App'>
      {
        isSearch ? <Search/> : <MainDashboard/>
      }
      <SubDashboard/>
    </section>
  )
}

export default App
