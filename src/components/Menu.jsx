import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import tw from "tailwind-styled-components";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const StyledList = tw.div`
   w-full
   h-8
   text-black
   size-6
   text-center

`;

const Menu = ({ className }) => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, token, setToken, userID, setUserID } =
    useContext(UserContext);
  const [MenuOpen, setMenuOpen] = useState(false);
  const logout = () => {
    setToken(false);
    setLoggedIn(false);
    setUserID(null);
    navigate("/Login");
  };

  const toggleMenu = () => {
    setMenuOpen(!MenuOpen);
  };

  return (
    <>
      <div>
        <button onClick={toggleMenu} className="flex justify-end   ">
          <HiOutlineMenuAlt3 className={className} />
        </button>
      </div>
      {MenuOpen && (
        <div className="fixed top-0 right-0 w-full h-full  text-2xl bg-white border-l border-gray-200 shadow dark:bg-additional-color dark:border-additional-color p-4">
          <div className="flex flex-row-reverse items-center pl-4 pr-1 pb-1  mb-4">
            <button
              className="mt-5 pb-5 text-base mr-5 text-gray"
              onClick={toggleMenu}
            >
              <ImCross />
            </button>
          </div>
          <nav className="h-screen w-screen">
            <ul className="flex flex-col items-center justify-center h-full gap-10 font-semibold">
              <Link to="/Home">
                <StyledList>Home</StyledList>
              </Link>
              <Link to="/Search">
                <StyledList>Search</StyledList>
              </Link>
              {!loggedIn ? (
                ""
              ) : (
                <Link to="/Schedule">
                  <StyledList>My schedule</StyledList>
                </Link>
              )}

              <StyledList>
                {!loggedIn ? (
                  <Link to="/Login">log in </Link>
                ) : (
                  <button onClick={logout}>logout</button>
                )}
              </StyledList>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;
