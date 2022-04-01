import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
  return (
    <div className="menus-Menu">
      <h1>Price Quiz</h1>

      <Link className="item" to="/quiz">
        Start
      </Link>

      <Link className="item" to="/setting">
        Setting
      </Link>

      <Link className="item" to="/history">
        History
      </Link>
    </div>
  );
}
