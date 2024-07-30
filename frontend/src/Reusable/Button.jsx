import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({ children, type, to }) {
  if (type === "headLink") {
    return (
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        <Link to={to}>{children}</Link>
      </h2>
    );
  }
}

export default Button;
