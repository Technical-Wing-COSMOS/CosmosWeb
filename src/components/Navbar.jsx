import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link to="/" className="text-xl font-bold">
          Cosmos
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/team">Team</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/join">Join Us</Link>
          <Link to="/alumni">Alumni</Link>
          <Link to="/contact">Contact</Link>
          {user && <Link to="/admin">Admin</Link>}
        </div>

      </div>
    </nav>
  )
}

export default Navbar