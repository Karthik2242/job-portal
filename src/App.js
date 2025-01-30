import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Components/Layout";
import ApplicationList from "./pages/ApplicationList";
import UserProfile from "./pages/UserProfile";
import JobDetails from "./pages/JobDetails";
import ApplicationForm from "./pages/ApplicationForm";
import { ApplicationProvider } from "./utils/ApplicationContext";
import { UserProvider } from "./utils/UserContext";

function App() {
  return (
    <ApplicationProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="application-list" element={<ApplicationList />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="job-details" element={<JobDetails />} />
            <Route path="application-form" element={<ApplicationForm />} />
          </Route>
        </Routes>
      </UserProvider>
    </ApplicationProvider>
  );
}

export default App;
