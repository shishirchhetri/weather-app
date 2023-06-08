import { useState,  useEffect } from "react";
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
const api = "49c23cc60d61e5d5d19db87bbdd9f9dd";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("pokhara");

  //fetch data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  // change icon with weather
  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Rainy":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    default:
      icon = ''
      break;
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <form action="">
        <div className="w-full max-w-[450px] bg-black/20 min-h-[548px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
          <div className="text-[87px]">{icon}</div>
          {/* country name */}
          <div className="bg-pink-100/30 flex items-center gap-x-5">
            <div className="text-2xl font-semibold">
              {data.name}, {data.sys.country}
            </div>

            {/* date */}
            <div>
              {date.getUTCDate()}/{date.getUTCMonth() + 1}/
              {date.getUTCFullYear()}
            </div>
          </div>
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[144px] leading-none font-light">{parseInt(data.main.temp)}</div>
              <div className="text-4xl">
                <TbTemperatureCelsius/>
              </div>
            </div>
            <div className="capitalize ">{data.weather[0].description}</div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsEye/>
                </div>
                <div className="ml-2">Visibility <span>{data.visibility /1000} KM</span></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
