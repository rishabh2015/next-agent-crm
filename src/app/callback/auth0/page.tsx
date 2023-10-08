"use client";

import DataStore from "@/lib/data-store";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Page() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => DataStore.setToken(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>Auth0 Callback Page</p>
    </div>
  );
}
