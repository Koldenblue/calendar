import React from "react";
import { Redirect, Route } from "react-router-dom";
import ReactLoading from "react-loading";

let styles = {
  loading: {
    backgroundColor: 'blue',
    height: '250px',
    width: '500px',
    marginTop: '75px',
    position: 'absolute',
    boxShadow: '1px 1px 5px'
  },
  loadingBottom: {
    position: 'relative',
    backgroundColor: 'white',
    height: '125px',
    width: '500px',
    top: '0'
  },
  loadingBars: {
    position: 'relative',
    top: '-125px',
  }
}
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
            <ReactLoading color="red" height={500} width={500} type="bars" />
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
