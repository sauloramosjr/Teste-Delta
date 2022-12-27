import { useState } from "react";
import "./App.css";
import { Footer } from "./common/components/footer/footer";
import { Outlet } from "react-router-dom";
import { SnackBarProvider } from "./common/contexts/snackbar.contexts";

function App() {
  return (
    <>
      <SnackBarProvider>
        <main style={{ minWidth: "100vw", height: "100%", minHeight: "100vh" }}>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </SnackBarProvider>
    </>
  );
}

export default App;
