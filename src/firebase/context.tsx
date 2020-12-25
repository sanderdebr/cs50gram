import { createContext, useContext, useEffect, useState } from "react";

import { firebaseClient } from "./firebaseClient";
import nookies from "nookies";

const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebaseClient.User | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log("token changed!");

      if (!user) {
        console.log("no token found..");
        setUser(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", {});
        return;
      }

      console.log("updating token..");
      const token = await user.getIdToken();
      setUser(user);
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, {});
    });
  }, []);

  // Fore refresh of token every 15 min
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log("refreshing token..");
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 1000 * 60 * 10);
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
