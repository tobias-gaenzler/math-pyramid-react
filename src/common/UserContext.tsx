import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "./ChildrenProps";
import userNames from "./userNames.json";

type UserContextProps = {
  userName: string;
  saveUserName: (newUserName: string) => void;
};
const UserContext = createContext<UserContextProps>({
  userName: "",
  saveUserName: () => { },
});
const useUserContext = () => useContext(UserContext);

function UserContextProvider(props: ChildrenProps) {
  useEffect(() => {
    const initialUserName = getInitialUserName()
    setUserName(initialUserName)
  }, []);
  const [userName, setUserName] = useState<string>("");

  const saveUserName = (newUserName: string) => {
    console.log("Saving new user name: ".concat(newUserName));
    localStorage.setItem("userName", newUserName);
    setUserName(newUserName);
  };

  return (
    <UserContext.Provider value={{ userName, saveUserName }}>
      {props.children}
    </UserContext.Provider>
  );

  function getInitialUserName() {
    const userNameFromStorage = localStorage.getItem("userName");
    if (userNameFromStorage) {
      console.log(`Setting user name from storage: ${userNameFromStorage}`);
      return userNameFromStorage;
    } else {
      const randomUserName =
        userNames[Math.floor(Math.random() * userNames.length)];
      console.log("Setting initial user name: ".concat(randomUserName));
      localStorage.setItem("userName", randomUserName);
      return randomUserName;
    }
  }
}

export { useUserContext, UserContextProvider };
export type { UserContextProps };
