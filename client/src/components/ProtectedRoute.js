import React from "react";
import { Redirect, Route } from "react-router-dom";
import ReactLoading from "react-loading";

/** Protected Route that redirects to login if user is not logged in.
 * Also displays loading bars while loading user */
let styles = {
  loading: {
    backgroundColor: 'blue',
    height: '50px',
    width: '100px',
    marginTop: '75px',
    position: 'absolute',
    boxShadow: '1px 1px 5px',
    left: '50%',
    transform: 'translateX(-50%)',

  },
  loadingBottom: {
    position: 'relative',
    backgroundColor: 'white',
    height: '25px',
    width: '100px',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  loadingBars: {
    position: 'relative',
    top: '-100%',
    left: '50%',
    transform: 'translateX(-50%)',
  }
}

/** returns loading animation if loading is true (from App.js).
 * returns child route (in App.js) if loading is done and user is logged in.
 * Else redirects to /login. */
const ProtectedRoute = ({
  onFailureRedirectToPath = "/login",
  isLoading,
  user,
  ...rest
}) => {
  return isLoading ? (
    // loading animation component
    <>
      <div style={styles.loading}>
        <div style={styles.loadingBottom}>
          <div style={styles.loadingBars}>
            <ReactLoading color="red" height={100} width={100} type="bars" />
          </div>
        </div>
      </div>
    </>
  ) : user ? (
    <Route {...rest} />
  ) : (
    <Redirect to={onFailureRedirectToPath} />
  );
};

export default ProtectedRoute;
