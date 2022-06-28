import React from "react";
import useApiFetch from "./hooks/useApiFetch"; //created custom hook from "useApiFetch fil"
import { useLocalStorage } from "usehooks-ts"; //custom hook from hooks-ts
import "./App.css";
import male from "./images/male.png";
import female from "./images/female.png";
function App() {
  const { error, data, revalidate } = useApiFetch({
    url: "https://randomuser.me/api",
  });

  //state variaables from useLocalStorage hook
  const [localStorage, setLocalstorage] = useLocalStorage("User data", {});

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching users</h2>;
  }

  //in my tsx I am using map function over the results array
  //in the tsx part when I want to access the deeply nested child I have to iterate over the array
  //I am setting local storage as a seperate functionality so that viwer can able to differentiate when data has to
  //fetch and when he/she can set the localstorage to mail.
  //here el=(el:any) is the type passing to map function.
  return (
    <div className="App">
      <p className="title">"Custom Hook for data fetching asynchronusly"</p>

      <div className="items">
        {data.results.map((el: any) => (
          <div className="item" key={el.login.uuid}>
            <img className="image1" src={el.picture.large} alt="pic"></img>

            <p className="item__heading">
              Name: {el.name.first} {el.name.last}
            </p>
            <p>Email : {el.email}</p>
            <button className="validate" onClick={revalidate}>
              <span>fetch user</span>
            </button>
            <button
              onClick={() => {
                setLocalstorage(el.email);
              }}
              className="btn"
            >
              <span>set local storage</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
