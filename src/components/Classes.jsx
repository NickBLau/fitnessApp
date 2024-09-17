import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import Loading from "../assets/Loading.json";

const Classes = ({ search }) => {
  console.log(search);
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/classes")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setFitnessClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
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
        console.error("Error fetching classes:", error);
        setLoading(false);
      });
  }, []);

  // const filteredClasses = fitnessClasses.filter((fitnessClass) =>
  //   fitnessClass.className.toLowerCase().includes(search.toLowerCase())
  // );

  console.log(fitnessClasses);
  return (
    <>
      <section className=" rounded-2xl ml-5 mr-5 mb-10 ">
        <div className="flex">
          {!loading ? (
            <ul className="flex gap-5 overflow-x-auto no-scrollbar ">
              {fitnessClasses
                // .filter((fitnessClass) => {
                //   return search.toLocaleLowerCase() === ""
                //     ? fitnessClass
                //     : fitnessClass.className
                //         .toLocaleLowerCase()
                //         .includes(search);
                // })
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
              {/* {!filteredClasses.length ? (
                <p>
                  Your search did not give any results. Try to search for
                  something else
                </p>
              ) : null} */}
            </ul>
          ) : (
            <div>
              <Lottie animationData={Loading} />
              <p className="ml-5">Loading classes</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Classes;
