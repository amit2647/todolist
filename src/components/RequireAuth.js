/* eslint-disable no-unused-vars */
import React from "react";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { isSignedIn, isLoading } = useUser(); // Get user authentication status and loading state
  const location = useLocation();

  // If Clerk is still loading, we don't want to redirect or render anything yet
  if (isLoading) {
    return null; // You can display a loading spinner or something similar here
  }

  // Allow access to Tasks and other public pages without sign-in
  if (location.pathname === "/" || location.pathname === "/tasks") {
    return <>{children}</>;
  }

  // For other routes, check if the user is signed in
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default RequireAuth;
