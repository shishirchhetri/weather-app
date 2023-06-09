import { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";
import cloudyBg from "./assets/cloudy.jpg";
import rainyBg from "./assets/rainy.jpg";
import sunnyBg from "./assets/sunny.jpg";
import thunderBg from "./assets/thunderstorm.jpg";
import snowyBg from "./assets/snowy.jpg";


const api = "49c23cc60d61e5d5d19db87bbdd9f9dd";
function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("kathmandu");
  const [inputVal, setInputVal] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  //for toast notification
  const notifyErr = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  //for searching value
  const handleSearch = (e) => {
    setInputVal(e.target.value);
  };

  //for search button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal) {
      setLocation(inputVal);
    }
    //animate form if empty
    if (inputVal === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
      notifyErr("Enter the city or country name");
    }

    //reset input field
    const input = document.querySelector("input");
    input.value = "";
  };

  //fetch data
  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api}`;
    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 2000)
    }).catch((err) => {
      setLoading(false);
      notifyErr(err);
    });
  }, [location]);

  if (!data) {
    return (
      <div className="">
        <div className="h-screen w-full bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  // change icon with weather
  let icon, bg;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy className="text-[#c6c1c1]" />;
      bg = "cloudyBg";
      break;
    case "Rainy":
      icon = <IoMdRainy className="text-[#31cafb"/>;
      bg = "rainyBg";
      break;
    case "Clear":
      icon = <IoMdSunny className="text-yellow-500" />;
      bg = "sunnyBg";
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb"/>;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      bg = "thunderBg";
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb"/>;
      bg = "snowyBg";
      break;
    default:
      icon = "";
      break;
  }

  const date = new Date();

  return (
    <div
      className={`h-screen flex justify-center items-center bg-rainyBg bg-cover bg-repeat-none text-white`}>
      <div className="w-full m-auto  max-w-[550px]">
        <div className="m-4 flex flex-col gapy-2 ">
          <form
            className={`${
              animate ? "animate-shake" : "animate-none"
            } h-16 w-full bg-black/30  max-w-[550px] rounded-full backdrop-blur-[16px] mb-2`}
          >
            <div className="h-full w-full relative flex items-center justify-center p-2 ">
              <input
                type="text"
                placeholder="Enter city name or country"
                className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full rounded-md"
                onChange={(e) => handleSearch(e)}
              />
              <button
                onClick={handleSubmit}
                className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
              >
                <IoMdSearch className="text-2xl text-white " />
              </button>
            </div>
          </form>
          <div className="bg-black/30 backdrop-blur-[5px] py-5 px-2 rounded-md h-full w-full">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <div>
                  <ImSpinner8 className="text-5xl animate-spin" />{" "}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-start gap-x-2">
                  <div className="text-[87px]">{icon}</div>

                  <div>
                    <div className="flex items-center gap-x-5 text-2xl font-semibold ">
                      {data.name}, {data.sys.country}
                    </div>
                    <div className=" text-xl">
                      {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                      {date.getUTCFullYear()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div className="flex justify-center items-center">
                    <div className="text-[100px] leading-none font-light">
                      {parseInt(data.main.temp)}
                    </div>
                    <div className="text-4xl">
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                  <span className="text-xl capitalize">
                    {data.weather[0].description}
                  </span>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div className="flex  justify-between mx-8 font-bold">
                    <div className="flex items-center gap-x-2">
                      <div className="text-[20px]">
                        <BsEye />
                      </div>
                      <div>
                        Visibility
                        <span className="ml-1">
                          {data.visibility / 1000} KM
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="text-[20px]">
                        <BsThermometer />
                      </div>
                      <div className="flex">
                        Feels like{" "}
                        <span className=" flex ml-2">
                          {parseInt(data.main.feels_like)}{" "}
                          <TbTemperatureCelsius />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mx-8 font-bold">
                    <div className="flex items-center gap-x-2">
                      <div className="text-[20px]">
                        <BsWater />
                      </div>
                      <div>
                        Humidity{" "}
                        <span className="ml-1">{data.main.humidity}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="text-[20px]">
                        <BsWind />
                      </div>
                      <div className="flex">
                        Wind <span className="ml-1">{data.wind.speed} m/s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
