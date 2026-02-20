import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { AuthProvider } from "~/context/auth-context";
import "./app.css"; // Panda CSS layers

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <AuthProvider>
            <Title>オイスターマーケット</Title>
            <Suspense>{props.children}</Suspense>
          </AuthProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
