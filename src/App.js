import React, { Component } from "react";
import "./App.scss";
import getNASAPictures from "./helper/fetchAPIData";
import applyFilter from "./helper/applyFilter";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Enlarge from "./Enlarge";

class App extends Component {
  state = {
    pictures: [],
    filteredPictures: [],
    filter: "month",
    mountEnlarge: false,
    selectedPicture: {},
  };

  componentDidMount = () => {
    const endDate = new Date();
    const d = new Date();
    d.setTime(d.getTime() - 30 * 24 * 60 * 60 * 1000);
    let startDate = new Date(d);
    getNASAPictures(startDate, endDate).then((res) => {
      this.setState({
        pictures: [...res.filter((picture) => picture.media_type === "image")],
        filteredPictures: [
          ...res.filter((picture) => picture.media_type === "image"),
        ],
      });
    });
  };

  handleChange = (value) => {
    this.setState({
      filteredPictures: this.state.pictures.filter(
        (picture) =>
          new Date(picture.date).getTime() >= applyFilter(value).getTime() &&
          new Date(picture.date).getTime() <= new Date().getTime()
      ),
      filter: value,
    });
  };

  handleMountEnlarge = (picture) => {
    this.setState({
      mountEnlarge: !this.state.mountEnlarge,
      selectedPicture: picture,
    });
  };

  handleUnMountEnlarge = () => {
    this.setState({
      mountEnlarge: !this.state.mountEnlarge,
      selectedPicture: {},
    });
  };

  render() {
    return (
      <div className="app--wrapper_full">
        {this.state.mountEnlarge ? (
          <Enlarge
            picture={this.state.selectedPicture}
            handleClose={this.handleUnMountEnlarge}
          />
        ) : null}
        <div
          className={
            !this.state.mountEnlarge ? "app--wrapper" : "app--display_none"
          }
        >
          <div className="app--heading">
            <h3>Welcome to Nasa Picture of the Day</h3>
          </div>
          <div className="app--select">
            <InputLabel>
              Choose Pictures from <span>&nbsp;</span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.filter}
                onChange={(e) => this.handleChange(e.target.value)}
              >
                <MenuItem value={"month"}>Last Month</MenuItem>
                <MenuItem value={"week"}>Last Week</MenuItem>
                <MenuItem value={"twoweeks"}>Last 2 Weeks</MenuItem>
              </Select>
            </InputLabel>
          </div>

          {this.state.pictures.length === 0 ? (
            <div className="app--loader">
              <CircularProgress />
            </div>
          ) : (
            <div className="app--pictures_section">
              {this.state.filteredPictures.map((picture) => (
                <div key={picture.date} className="app--media_card">
                  <div className="app--image_wrapper">
                    <img
                      className="app--image"
                      src={picture.url}
                      alt="NasaPic"
                      onClick={() => this.handleMountEnlarge(picture)}
                    ></img>
                  </div>
                  <p className="app--date_overlay">{picture.date}</p>
                  <div className="app--media_card_text">
                    <p className="app--media_Card_title">{picture.title}</p>
                    <p className="app--media_Card_copyright">
                      {picture.copyright}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
