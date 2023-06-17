import { useState } from "react"
import { Navbar, Footer } from "./components"
import { Home, Signin, Signup, Aware, Events, Profile } from "./pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppwriteContext } from './appwrite'

function App() {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} user={user} />} />
        <Route path="/signin" element={<Signin setUser={setUser} user={user} />} />
        <Route path="/signup" element={<Signup setUser={setUser} user={user} />} />
        <Route path="/aware" element={<Aware />} />
        <Route path="/events" element={<Events setUser={setUser} user={user} />} />
        <Route path="/profile" element={<Profile setUser={setUser} user={user} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
