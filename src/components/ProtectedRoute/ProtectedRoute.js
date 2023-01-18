import { Route, redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props })=> {
  return (
    <Route>
      {
        () => (props.loggedIn === true) ? <Component {...props} /> : redirect('/')
      }
    </Route>
  )
}
export default ProtectedRoute;
