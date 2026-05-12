import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import { AuthProvider } from "./contexts/AuthContext";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import Home from "./pages/Home";
import ChecklistPage from "./pages/ChecklistPage";
import ShoppingPage from "./pages/ShoppingPage";
import FieldPage from "./pages/FieldPage";
import MatchingPage from "./pages/MatchingPage";
import VenuePage from "./pages/VenuePage";
import MyPage from "./pages/MyPage";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/checklist"} component={ChecklistPage} />
        <Route path={"/shopping"} component={ShoppingPage} />
        <Route path={"/field"} component={FieldPage} />
        <Route path={"/matching"} component={MatchingPage} />
        <Route path={"/venue"} component={VenuePage} />
        <Route path={"/mypage"} component={MyPage} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FirebaseProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <TooltipProvider>
              <Toaster />
              <Router />
              <PWAInstallPrompt />
            </TooltipProvider>
          </ThemeProvider>
        </FirebaseProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;