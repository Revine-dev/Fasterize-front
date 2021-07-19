import { useState } from "react";
import "./App.css";
import Cloud from "./components/Cloud";
import Logo from "./components/Logo";
import Loading from "./components/Loading";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const addToHistory = (link, result) => {
    let search = [...searchHistory];
    search.push({
      url: link,
      date: new Date().toLocaleDateString(),
      result: result,
    });
    setSearchHistory(search);
    localStorage.setItem("history", JSON.stringify(search));
  };

  console.log(searchHistory);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const search = await axios.post("https://fasterize-back.vercel.app/", {
        url:
          url.match(/^((http|https):\/\/)?(www\.)?([A-z]+)\.([A-z]{2,})/) &&
          !url.match(/^http/)
            ? "http://" + url
            : url,
      });
      addToHistory(url, search.data);
    } catch (error) {
      if (error.request.status === 400) {
        return addToHistory(url, error.response.data);
      }
      console.log(error.response.data, Object.keys(error));
      // handle error
    } finally {
      setUrl("");
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="left">
        <div className="container">
          <Logo />
          <div className="title-left">Fasterize</div>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <h1>Fasterize Debugger</h1>
        </div>
        <div className="container-large">
          <div className="title-content">Header Debugger</div>
          <div className="checker">
            <div className="name">Url to checker</div>
            <form
              className="search"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                type="text"
                className="uri_checker"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                placeholder="https://www.fasterize.com"
              />
              <button
                type="submit"
                onClick={handleSearch}
                disabled={
                  isLoading ||
                  !url.match(
                    /^((http|https):\/\/)?(www\.)?([A-z]+)\.([A-z]{2,})/
                  )
                }
              >
                {isLoading ? <Loading /> : "Launch analysis"}
              </button>
            </form>
          </div>

          <div className="title-content">History</div>

          {searchHistory.length > 0 && (
            <div className="table history">
              <div className="table-heading">
                <div className="table-row">
                  <div className="table-head">Date</div>
                  <div className="table-head url">URL</div>
                  <div className="table-head">Status</div>
                  <div className="table-head">Flags</div>
                  <div className="table-head">Cloudfront status</div>
                  <div className="table-head">Cloudfront pop</div>
                </div>
              </div>
              <div className="table-body">
                {searchHistory.map((search, i) => {
                  return (
                    <div className="table-row" key={i}>
                      <div className="table-cell">{search.date}</div>
                      <div className="table-cell">
                        <a href={search.url} target="_blank" rel="noreferrer">
                          {search.url}
                        </a>
                      </div>
                      <div className="table-cell">
                        <Cloud color={search.plugged ? "green" : "red"} />
                      </div>
                      <div className="table-cell tags">
                        <span>Optimisé</span>
                        <span>Caché</span>
                      </div>
                      <div className="table-cell cloudstatus">
                        <span>MISS</span>
                      </div>
                      <div className="table-cell">Paris</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
