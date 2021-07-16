import "./App.css";
import Logo from "./components/Logo";

function App() {
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
                placeholder="https://www.fasterize.com"
              />
              <button>Launch analysis</button>
            </div>
          </div>

          <div className="title-content">History</div>

          <div className="divTable history">
            <div className="divTableHeading">
              <div className="divTableRow">
                <div className="divTableHead">Date</div>
                <div className="divTableHead">URL</div>
                <div className="divTableHead">Status</div>
                <div className="divTableHead">Flags</div>
                <div className="divTableHead">Cloudfront status</div>
                <div className="divTableHead">Cloudfront pop</div>
              </div>
            </div>
            <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableCell">cell1_1</div>
                <div className="divTableCell">cell2_1</div>
                <div className="divTableCell">cell3_1</div>
                <div className="divTableCell">cell4_1</div>
                <div className="divTableCell">cell4_1</div>
                <div className="divTableCell">cell4_1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
