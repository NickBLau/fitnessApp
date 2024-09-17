import Classes from "../components/Classes";
import { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";
import Menu from "../components/Menu";
import { IoIosStar } from "react-icons/io";

const Search = () => {
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [Trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/v1/trainers")
      .then((response) => response.json())
      .then((data) => {
        setTrainers(data);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
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
    setLoading(true);
    fetch("http://localhost:4000/api/v1/classes/2/ratings")
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
      })
      .catch((error) => {
        console.error("Error fetching rating:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTrainers = Trainers.filter((trainer) =>
    trainer.trainerName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredClasses = fitnessClasses.filter((fitnessClass) =>
    fitnessClass.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="flex items-center justify-between mx-5 my-5">
        <div className="flex gap-5 items-center">
          <Link to="/Home">
            <MdArrowBack className="text-2xl text-slate-400" />
          </Link>
          <p className="font-normal text-2xl">Search</p>
        </div>
        <Menu></Menu>
      </section>
      <form
        onChange={(e) => setSearch(e.target.value)}
        className="w-80 h-12 border flex items-center gap-5 border-gray rounded-3xl ml-5 mb-5 pl-5"
      >
        <CiSearch className="text-2xl text-slate-400" />
        <input
          className="outline-none "
          type="search"
          name="search"
          placeholder="Search classes"
          id=""
        />
      </form>
      {!filteredClasses.length &&
      !filteredTrainers.length &&
      search.length > 1 ? (
        <div className="ml-5">
          <span className="flex">Your search did not give any results.</span>
          <span>Try to search for something else</span>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-xl ml-5 mt-5 mb-5">Popular classes</h2>
          {/* <Classes search={search} setSearch={setSearch}></Classes> */}
          <section className=" rounded-2xl ml-5 mr-5 mb-10 ">
            <div className="flex">
              {!loading ? (
                <ul className="flex gap-5 overflow-x-auto no-scrollbar ">
                  {fitnessClasses
                    .filter((fitnessClass) => {
                      return search.toLocaleLowerCase() === ""
                        ? fitnessClass
                        : fitnessClass.className
                            .toLocaleLowerCase()
                            .includes(search);
                    })
                    .map((fitnessClass) => (
                      <Link
                        to={`/classDetails/${fitnessClass.id}`}
                        key={fitnessClass.id}
                      >
                        <div
                          className="flex flex-col justify-end bg-center bg-no-repeat bg-cover items-center w-32 h-36 rounded-2xl"
                          style={{
                            backgroundImage: `url(${fitnessClass.asset.url})`,
                          }}
                        >
                          <div className="rounded-tr-2xl rounded-bl-xl text-xs font-bold w-32 h-14 flex flex-col gap-1 justify-center bg-primarycolor">
                            <p className="text-center truncate mx-2">
                              {fitnessClass.className}
                            </p>
                            <div className="flex gap-2 text-xs items-center ml-1">
                              <span>{ratings[0]?.rating}</span>
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                              <IoIosStar />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </ul>
              ) : (
                <div>
                  <Lottie animationData={Loading} />
                  <span className="ml-5">Loading Popular classes</span>
                </div>
              )}
            </div>
          </section>

          <h2 className="font-bold text-xl ml-5 mt-5 ">Popular Trainers</h2>
          {!loading ? (
            <section className="flex flex-col mb-5">
              {filteredTrainers.map((trainer) => (
                <div
                  className="flex mt-5 ml-5 gap-5 rounded-2xl items-center"
                  key={trainer.id}
                >
                  <img
                    className="object-cover w-20 h-20 rounded-2xl"
                    src={trainer.asset.url}
                    alt=""
                  />

                  <p className="text-base  font-semibold">
                    {trainer.trainerName}
                  </p>
                </div>
              ))}
              {/* {!filteredTrainers.length ? (
            <p className="ml-5 mt-5">
              Your search did not give any results. Try to search for something
              else
            </p>
          ) : null} */}
            </section>
          ) : (
            <div>
              <Lottie animationData={Loading} />
              <span className="ml-5">Loading Popular trainers</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
