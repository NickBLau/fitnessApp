import { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Schedule = () => {
  const {
    loggedIn,
    setLoggedIn,
    token,
    userID,
    setuserID,
    userClasses,
    setUserClasses,
  } = useContext(UserContext);
  // const [userClasses, setUserClasses] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/v1/users/3", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6InVzZXIzIiwicGFzc3dvcmQiOiIkMmEkMTUkMWRVVUMveUpKZUxrSE9Lc0YuMFYwTzFNOUpWd1FpSkI5LjF6WmxPd3Q3NzRCOENZcFN3Z3EiLCJ1c2VyRmlyc3ROYW1lIjpudWxsLCJ1c2VyTGFzdE5hbWUiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjAtMDMtMDhUMTk6MDY6NTQuMjg5WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDMtMDhUMTk6MDY6NTQuMjg5WiJ9LCJpYXQiOjE3MDkyOTI4MzUsImV4cCI6MTcwOTI5NjQzNX0.uBeFN7V6hdwZWOl7vOmPv0VzfVwvMnTrmy47MCw-9wI`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserClasses(data.classes);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(userClasses);
  console.log(loading);
  console.log(loggedIn + " logged in");
  return (
    <>
      <section className="flex items-center justify-between mx-5 my-5">
        <div className="flex gap-5 items-center">
          <Link to="/Home">
            <MdArrowBack className="text-2xl text-slate-400" />
          </Link>
          <p className="font-normal text-2xl">My schedule</p>
        </div>
        <Menu></Menu>
      </section>

      {loggedIn ? (
        <div>
          {!loading ? (
            <div>
              {!userClasses[0]?.className ? (
                <div>
                  <p className="ml-5">You are not signed up for any classes</p>
                  <Link to="/Home">
                    <p className="ml-5 text-blue-500">Click here to signup</p>
                  </Link>
                </div>
              ) : (
                <div>
                  {userClasses.map((item) => (
                    <Link key={item.id} to={`/classDetails/${item.id}`}>
                      <section className="border border-lightgraygray w-80 h-24 rounded-xl ml-5 flex flex-col justify-around mb-5 bg-slate-100">
                        <h2 className="ml-5 font-semibold text-xl">
                          {item?.className}
                        </h2>

                        <p className="ml-5 font-medium ">
                          {item.classDay} - {item.classTime}
                        </p>
                      </section>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <section className="border border-lightgraygray animate-pulse w-80 h-24 rounded-xl ml-5 flex flex-col justify-around  bg-slate-100">
                <span className="ml-5 text-center">Loading Schedule</span>
              </section>
              <Lottie animationData={Loading} />
            </div>
          )}
        </div>
      ) : (
        <Link to="/Login">
          <p className="ml-5">You need to be logged in</p>
          <p className="ml-5 text-blue-500">Click here to login</p>
        </Link>
      )}
      {/* <section className="border border-lightgraygray  w-80 h-24 rounded-xl ml-5 flex flex-col justify-around bg-slate-100">
        <h2 className="ml-5 font-semibold text-xl"> Lower Abs Workout </h2>
        <p className="ml-5 font-medium ">Wednesday - 17.00</p>
      </section> */}
    </>
  );
};

export default Schedule;
