import { createContext, useContext, useState } from "react";
import userNames from "./userNames.json";

type UserContextProps = {
  userName: string;
  saveUserName: (newUserName: string) => void;
};
type ChildrenProps = {
  children: React.ReactNode;
};
const UserContext = createContext<UserContextProps>({
  userName: "",
  saveUserName: (newUserName: string) => {},
});
const useUserContext = () => useContext(UserContext);

function UserContextProvider(props: ChildrenProps) {
  let initialUserName: string;

  if (localStorage.getItem("userName")) {
    initialUserName = (localStorage.getItem("userName") || "").toString();
    console.log(
      "Setting initial user name from storage: ".concat(initialUserName)
    );
  } else {
    initialUserName = userNames[Math.floor(Math.random() * userNames.length)];
    localStorage.setItem("userName", initialUserName);
    console.log("Setting initial user name: ".concat(initialUserName));
  }

  const [userName, setUserName] = useState<string>(initialUserName);

  const saveUserName = (newUserName: string) => {
    localStorage.setItem("userName", newUserName);
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
