import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

function UnauthorizedRedirect({ onUnauthorized }) {
  useEffect(() => {
    onUnauthorized();
  }, [onUnauthorized]);

  return <Redirect to="/" />;
}

function ProtectedRoute({
  children,
  isLoggedIn,
  isAuthChecked,
  onUnauthorized,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthChecked) {
          return null;
        }

        if (!isLoggedIn) {
          return <UnauthorizedRedirect onUnauthorized={onUnauthorized} />;
        }

        return typeof children === "function" ? children(props) : children;
      }}
    />
  );
}

export default ProtectedRoute;
