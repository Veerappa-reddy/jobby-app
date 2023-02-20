import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
// import Jobs from './components/Jobs'
import Home from './components/Home'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import AllJobsSection from './components/AllJobsSection'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobsSection} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
  </Switch>
)
export default App
