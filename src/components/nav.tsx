import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="static-dungeon">Static Dungeon</Link>{" "}
      | <Link to="pacman">Pacman</Link>
    </nav>
  );
}
