import "./form.css";
import { useState, useEffect, useRef } from "react";

export const Form = () => {
  const [region, setRegion] = useState([]);
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value2}&appid=ff5bcda0d22bee80304f787a3b336e9d&units=metric`
    )
      .then((res) => res.json())

      .then((dataApi) => (dataApi.cod !== "400" ? setData([dataApi]) : null));
  }, [value2]);

  function getDate(format) {
    let dateTime = new Date();
    let localTime = dateTime.getTime();
    let localOffset = dateTime.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    var city = utc + 1000 * format;
    let newdate = new Date(city);
    return `Kun ${newdate}`;
  }

  function func(evt) {
    evt.preventDefault();
  }

  function inputFunc(evt) {
    if (evt.target.value) {
      if (evt.code === "Enter") {
        const todos = {
          id: region.length ? region[0].id + 1 : 1,
          text: evt.target.value,
          isComplate: false,
        };
        setRegion([todos, ...region].splice("", 5));
        evt.target.value = "";
      }
    }
  }

  const butttonFunc = (todosId) => {
    const filterdTodo = region.filter((e) => e.id === todosId);
    setValue1([...value1, filterdTodo]);
  };

  const titleFunc = (davlat) => {
    setValue2(davlat);
  };

  const btnFunc = (btnId) => {
    const filteredBtn = value1.filter((e) => e[0].id !== btnId);
    setValue1([...filteredBtn]);
  };

  return (
    <>
      <div>
        <form className="form__form" onSubmit={func}>
          <input onKeyUp={inputFunc} className="form__input" type="text" />
        </form>
        <div className="form__beg">
          <div className="form__box">
            <ul>
              {region.length &&
                region.map((e) => (
                  <li key={e.id} className="region__item">
                    <h2 className="region__title">{e.text}</h2>
                    <button
                      className="form__btn"
                      onClick={() => butttonFunc(e.id)}
                    >
                      BUTTON
                    </button>
                  </li>
                ))}
            </ul>

            <ul>
              {value1.length &&
                value1.map((e) => (
                  <li key={e.id} className="region__list-item">
                    <h2 onClick={() => titleFunc(e[0].text)}>{e[0].text}</h2>
                    <button
                      className="form__btn"
                      onClick={() => btnFunc(e[0].id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <ul className="form__list">
            {data.length >= 1 &&
              data.map((e, i) => {
                console.log(e);
                return (
                  <li className="form__list--item" key={i}>
                    <h1>Viloyat: {e.name}</h1>
                    <p>{getDate(e.timezone)}</p>
                    <p>Max: {e.main.temp_max}</p>
                    <p>SYS: {e.sys.country}</p>
                    <p>Dectionary: {e.weather[0].description}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};
