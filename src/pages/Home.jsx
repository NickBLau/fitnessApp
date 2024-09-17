import { CiMenuBurger } from "react-icons/ci";
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Classes from "../components/Classes";
import { Link, useOutletContext } from "react-router-dom";
import Menu from "../components/Menu";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Home = () => {
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(false);
  const { loggedIn, setLoggedIn, token, setToken, userID, setUserID } =
    useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/v1/classes")
      .then((response) => response.json())
      .then((data) => {
        setFitnessClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/classes/2/ratings")
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
      })
      .finally(() => {
        // console.log("test trainers");
        setLoading(false);
      });
  }, []);
  const RandomNumber = Math.floor(Math.random() * fitnessClasses.length);
  const id = RandomNumber + 1;
  console.log("amount of classes " + fitnessClasses.length);
  console.log(RandomNumber + " my number");
  // console.log("logged in status " + loggedIn);
  // console.log("UserID " + userID);
  // console.log("UserToken " + token);
  return (
    <>
      <div className="flex justify-between items-center px-5 mt-5 mb-5">
        <h1 className="text-2xl text-black  ">Popular classes</h1>

        <Menu></Menu>
        {/* {loading ? "loading" : error ? "There was an error" : "Hello world"} */}
      </div>
      {!loading ? (
        <Link to={`/classDetails/${id}`}>
          <div
            className="flex flex-col justify-end mx-5 h-96 bg-center rounded-xl bg-no-repeat bg-cover "
            style={{
              backgroundImage: `url(${fitnessClasses[RandomNumber]?.asset.url})`,
            }}
          >
            <div className="w-56 h-20 flex flex-col justify-center rounded-tr-[48px] bg-primarycolor">
              <h2 className="font-semibold ml-2 text-base">
                {fitnessClasses[RandomNumber]?.className}
              </h2>
              <p className="flex gap-2 items-center ml-2">
                {ratings[0]?.rating}
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div>
          <Lottie animationData={Loading} />
          <span className="ml-5">Loading popular classes</span>
        </div>
      )}

      <h2 className="font-bold text-xl ml-5 mt-5 mb-5">Classes for you</h2>
      <Classes></Classes>
    </>
  );
};

export default Home;
