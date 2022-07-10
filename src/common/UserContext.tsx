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
  saveUserName: () => {},
});
const useUserContext = () => useContext(UserContext);

function UserContextProvider(props: ChildrenProps) {
  const [userName, setUserName] = useState<string>(getInitialUserName());

  const saveUserName = (newUserName: string) => {
    console.log("Saving new user name: ".concat(userName));
    localStorage.setItem("userName", newUserName);
    setUserName(newUserName);
  };

  return (
    <UserContext.Provider value={{ userName, saveUserName }}>
      {props.children}
    </UserContext.Provider>
  );

  function getInitialUserName() {
    let initialUserName: string;

    if (localStorage.getItem("userName")) {
      initialUserName = (localStorage.getItem("userName") || "").toString();
      console.log(`Setting user name from storage: ${initialUserName}`);
    } else {
      initialUserName = userNames[Math.floor(Math.random() * userNames.length)];
      localStorage.setItem("userName", initialUserName);
      console.log("Setting initial user name: ".concat(initialUserName));
    }
    return initialUserName;
  }
}

export { useUserContext, UserContextProvider };
export type { UserContextProps };
