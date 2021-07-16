import { useState } from "react";
import "./App.css";
import Cloud from "./components/Cloud";
import Logo from "./components/Logo";
import Loading from "./components/Loading";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    localStorage.getItem("history") || []
  );
  const [isLoading, setIsLoading] = useState(false);

  console.log(searchHistory);

  const addToHistory = (link, result) => {
    let search = [...searchHistory];
    search.push({
      url: link,
      result: result,
    });
    setSearchHistory(search);
    localStorage.setItem("history", search);
  };

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
      console.log(search);
    } catch (error) {
      if (error.request.status === 400 && error.response.data?.plugged) {
        addToHistory(url, error.response.data);
      }
      console.log(error.response, Object.keys(error));
      // handle error
    } finally {
      //setUrl("");
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
            <div className="search">
              <input
                type="text"
                className="uri_checker"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                placeholder="https://www.fasterize.com"
              />
              <button
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
            </div>
          </div>

          <div className="title-content">History</div>

          {searchHistory.length > 1 && (
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
                <div className="table-row">
                  <div className="table-cell">16/07/2021</div>
                  <div className="table-cell">
                    <a
                      href="https://www.fasterize.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.fasterize.com
                    </a>
                  </div>
                  <div className="table-cell">
                    <Cloud color="green" />
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
