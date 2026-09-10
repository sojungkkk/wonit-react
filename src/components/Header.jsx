import { useUser } from '../contexts/UserContext.jsx'
import puding from '../../puding.svg'

function Header() {
  const user = useUser()

  return (
    <header className="app-header">
      <h1>{user.name}님, 안녕하세요</h1>
      <img className="puding" src={puding} alt="퍼딩 캐릭터" />
    </header>
  )
}

export default Header