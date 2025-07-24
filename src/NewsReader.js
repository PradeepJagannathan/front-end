import { SavedQueries } from "./SavedQueries";
import { QueryForm } from "./QueryForm";
import { Articles } from "./Articles";
import { useState, useEffect } from "react";
import { exampleQuery, exampleData } from "./data";
import { LoginForm } from "./LoginForm";

export function NewsReader() {
  const [query, setQuery] = useState(exampleQuery); // latest query send to newsapi
  const [data, setData] = useState(exampleData); // current data returned from newsapi
  const [queryFormObject, setQueryFormObject] = useState({ ...exampleQuery });
  const [savedQueries, setSavedQueries] = useState([{ ...exampleQuery }]);
  const [currentUser, setCurrentUser] = useState(null);
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const urlNews = "/news";
  const urlQueries = "/queries";
  const urlDefaultQueries = "/queries/default";
  const urlUsersAuth = "/users/authenticate";

  useEffect(() => {
    getNews(query);
  }, [query]);

  async function getQueryList() {
    try {
      console.log ("current user : ", currentUser);
      if (currentUser === null) {
        // if no user is logged in, load default queries
        const response = await fetch(urlDefaultQueries);
        if (response.ok) {
          const data = await response.json();
          console.log("defaultQueries has been retrieved: ");
          setSavedQueries(data);
        }
      }
      // if a user is logged in, load saved queries
      else {
        console.log("currentUser is not null, fetching saved queries");
        const response = await fetch(urlQueries);
        if (response.ok) {
          const data = await response.json();
          console.log("savedQueries has been retrieved: ");
          setSavedQueries(data);
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  async function login() {
    console.log ("login display ");
    if (currentUser !== null) {
      // logout
      setCurrentUser(null);
    } else {
      // login
      try {
        const response = await fetch(urlUsersAuth, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (response.status === 200) {
          console.log("user authenticated successfully");
          setCurrentUser({ ...credentials });
          setCredentials({ user: "", password: "" });
        } else {
          alert(
            "Error during authentication! " +
            credentials.user +
            "/" +
            credentials.password
          );
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        setCurrentUser(null);
      }
    }
  }

  async function saveQueryList(savedQueries) {
    try {
      const response = await fetch(urlQueries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedQueries),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("savedQueries array has been persisted:");
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function onSavedQuerySelect(selectedQuery) {
    setQueryFormObject(selectedQuery);
    setQuery(selectedQuery);
  }

  function currentUserMatches(user) {
    if (currentUser) {
      if (currentUser.user) {
        if (currentUser.user === user) {
          return true;
        }
      }
    }
    return false;
  }

  function onFormSubmit(queryObject) {
    if (currentUser === null) {
      alert("Log in if you want to create new queries!");
      return;
    }
    if (savedQueries.length >= 3 && currentUserMatches("guest")) {
      alert(
        "Guest users cannot submit new queries once saved query count is 3 or greater!"
      );
      return;
    }
    let newSavedQueries = [];
    newSavedQueries.push(queryObject);
    for (let query of savedQueries) {
      if (query.queryName !== queryObject.queryName) {
        newSavedQueries.push(query);
      }
    }
    console.log(JSON.stringify(newSavedQueries));
    saveQueryList(newSavedQueries);
    setSavedQueries(newSavedQueries);
    setQuery(queryObject);
  }

  function onQueriesReset() {
    if (currentUser === null) {
      alert("Log in if you want to reset queries!");
      return;
    }

    /*if (!currentUserMatches("admin")) {
      alert("Only admin users can reset queries!");
      return;
    }*/

    setSavedQueries([]);
    saveQueryList([]);
    setQuery(exampleQuery);
  }

  async function getNews(queryObject) {
    if (queryObject.q) {
      console.log("Fetching news with query:", queryObject);
      try {
        const response = await fetch(urlNews, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queryObject),
        });

        console.log("Response from server:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Below code is to handle response text when nothing is returned from NewsAPI
        
        /*const text = await response.text();
        console.log("Response text:", text);

        if (!text) {
          console.error("No data received from server");
          setData({});
          return;
        }
        const data = JSON.parse(text);
        */
        const data = await response.json();
        console.log("Parsed data:", data);
        setData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      setData({});
    }
  }

  useEffect(() => {
    getQueryList();
  }, [currentUser]);

  return (
    <div className="newsreader-layout">
      <div className="login-box">
        <LoginForm
          login={login}
          credentials={credentials}
          currentUser={currentUser}
          setCredentials={setCredentials}
        />
      </div>

      <section className="parent">
        <div className="container">
          <div className="grid">
            <div className="box query-box">
              <span className="title">Query Form</span>
              <QueryForm
                currentUser={currentUser}
                setFormObject={setQueryFormObject}
                formObject={queryFormObject}
                submitToParent={onFormSubmit}
              />
            </div>
            <div className="box saved-query-box">
              <span className="title">Saved Queries</span>
              <SavedQueries
                savedQueries={savedQueries}
                selectedQueryName={query.queryName}
                onQuerySelect={onSavedQuerySelect}
                queriesReset={onQueriesReset}
                currentUser={currentUser}
              />
            </div>
            <div className="box articles-box">
              <span className="title">Articles List</span>
              <div className="articles-scroll-container">
                <Articles query={query} data={data} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
