
export default function Layout({children}){
  return(
    <main>
      <header className="text-2xl font-bold underline">Blog App</header>
      {children}
      <footer>
        <h4>Yakuba Swaray, Freetown 2025</h4>
      </footer>
    </main>
  )
}