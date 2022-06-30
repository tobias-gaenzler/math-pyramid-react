import { createContext, ReactNode, useContext, useState } from "react";
import userNames from "./userNames.json";

type UserContextProps = {
  userName: string;
  saveUserName: (newUserName: string) => void;
};
type ChildrenProps = {
  children: React.ReactNode;
};
const UserContext = createContext<Partial<UserContextProps>>({});
const useUserContext = () => useContext(UserContext);

function UserContextProvider(props: ChildrenProps) {
  const initialUserName =
    userNames[Math.floor(Math.random() * userNames.length)];
  console.log("Setting initial user name: ".concat(initialUserName));
  const [userName, setUserName] = useState<string>(initialUserName);

  const saveUserName = (newUserName: string) => {
    setUserName(newUserName);
  };

  return (
    <UserContext.Provider value={{ userName, saveUserName }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { useUserContext, UserContextProvider };
export type { UserContextProps };
