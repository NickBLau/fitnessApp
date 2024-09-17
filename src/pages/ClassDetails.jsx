import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const ClassDetails = () => {
  const { id } = useParams();
  const [fitnessClass, setFitnessClass] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [loading, setLoading] = useState([]);
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const {
    loggedIn,
    setLoggedIn,
    token,
    setToken,
    userID,
    setUserID,
    userClasses,
    setUserClasses,
  } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/v1/classes/${id}`)
      .then((response) => response.json())

      .then((data) => {
        setFitnessClass(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      })
      .finally(() => {
        setLoading(false);
        console.log("test class");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/v1/trainers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTrainer(data);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      })
      .finally(() => {
        console.log("test trainers");
        setLoading(false);
      });
  }, []);

  const signUp = async () => {
    try {
      const apiUrl = `http://localhost:4000/api/v1/users/${userID}/classes/${id}`;

      let method = "POST";

      if (userIsRegistered) {
        method = "DELETE";
      }

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`${method} request failed:`, response.statusText);
        return;
      }

      setUserIsRegistered((prev) => !prev);

      console.log(`${method} request successful!`);
    } catch (error) {
      console.error("Error handling sign up:", error);
    }
  };
  console.log(userID);
  console.log(userClasses);
  return (
    <>
      <p></p>
      {!loading ? (
        <section
          className="bg-center flex flex-col  bg-no-repeat bg-cover "
          style={{
            backgroundImage: `url(${fitnessClass?.asset?.url})`,
            height: "432px",
          }}
        >
          <div className="flex flex-col"></div>
          <section className="flex mt-10  ">
            <div className="flex justify-between w-full gap-5 mx-5 items-center">
              <Link to="/Home">
                <MdArrowBack className="text-2xl text-white" />
              </Link>

              <Menu className="text-2xl text-white"></Menu>
            </div>
          </section>
          <div className="flex flex-col mt-44 justify-between gap-10">
            <h1 className="text-primarycolor  text-4xl ml-5 font-bold">
              {fitnessClass.className}
            </h1>
            <div className="flex text-primarycolor ml-5 justify-between items-center">
              <div className="flex gap-2 items-center">
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar /> <p className=" ">5/5</p>
              </div>
              <button className="border-2 border-primarycolor mr-5 font-bold rounded-3xl w-28 h-12">
                RATE
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div>
          <Lottie animationData={Loading} />
          <span className="ml-5">Loading class details</span>
        </div>
      )}
      {!loading ? (
        <section className="mx-5 mt-5 flex flex-col gap-5">
          <p>
            {fitnessClass.classDay} - {fitnessClass.classTime}
          </p>
          <p>{fitnessClass.classDescription}</p>

          <h2 className="font-bold text-xl">Trainer</h2>
          <div className="flex">
            <img
              className="w-20 h-20 object-cover rounded-xl mb-5 flex"
              src={trainer?.asset?.url}
              alt=""
            />
            <p className="font-semibold ml-5 mt-5">{trainer?.trainerName}</p>
          </div>
        </section>
      ) : (
        <div>
          <Lottie animationData={Loading} />
          <span className="ml-5">Loading trainer details</span>
        </div>
      )}
      {loggedIn ? (
        <div>
          {!userIsRegistered ? (
            <button
              onClick={signUp}
              className="bg-primarycolor font-semibold rounded-3xl w-[334px] h-12 mx-5 mb-2"
            >
              SIGN UP
            </button>
          ) : (
            <button
              onClick={signUp}
              className="bg-primarycolor font-semibold rounded-3xl w-[334px] h-12 mx-5 mb-2"
            >
              LEAVE
            </button>
          )}
        </div>
      ) : (
        <Link to="/Login">
          <button
            onClick={signUp}
            className="bg-primarycolor font-semibold rounded-3xl w-[334px] h-12 mx-5 mb-2"
          >
            Log in to sign up for this class
          </button>
        </Link>
      )}
    </>
  );
};

export default ClassDetails;
