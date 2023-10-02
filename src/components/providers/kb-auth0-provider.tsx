"use client";

import { useRouter } from "next/navigation";
import { Auth0Provider } from "@auth0/auth0-react";

export default function KBAuth0Provider(props: React.PropsWithChildren) {
  const router = useRouter();

  const onRedirectCallback = (appState: any) => {
    router.push((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      authorizationParams={{
        // display: "popup",
        // redirect_uri: window.location.origin,
        // redirect_uri: `${window.location.origin}/callback/auth0`,
        // redirect_uri: `http://localhost:3000/callback/auth0`,
        redirect_uri:
          typeof window !== "undefined"
            ? `${window.location.origin}/callback/auth0`
            : undefined,
        audience: "urn:kb-crm:api-gateway:sandbox",
        // scope: "openid profile email",
        // scope: "create:task",
      }}
    >
      {props.children}
    </Auth0Provider>
  );
}
