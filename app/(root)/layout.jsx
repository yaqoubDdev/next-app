import NavBar from "../components/NavBar"
import { UserProvider } from "../context/UserContext"

export default function Layout({ children }) {
  return (
    <UserProvider>
      <main>
        <header className="">
          <NavBar />
        </header>
        {children}
        <footer className="absolute w-full bottom-0 text-center mt-4 bg-white">
          <h4>Yakuba Swaray, Freetown 2025</h4>
        </footer>
      </main>
    </UserProvider>
  )
}