import React, { Component } from "react";
import "./App.css";
import { getNASAPictures } from "./helper/fetchAPIData";
import applyFilter from "./helper/applyFilter";

class App extends Component {
  state = {
    pictures: [],
    filteredPictures: [],
    filter: "month",
  };

  componentDidMount = () => {
    const endDate = new Date();
    const startDate = new Date(`2020-${endDate.getMonth()}-01`);
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

    console.log(applyFilter(value));
  };

  render() {
    return (
      <div>
        <label>
          Filter pictures from:
          <select
            value={this.state.filter}
            onChange={(e) => this.handleChange(e.target.value)}
          >
            <option value="month">Last Month</option>
            <option value="week">Last Week</option>
            <option value="twoweeks">Last 2 Weeks</option>
          </select>
        </label>
        {this.state.filteredPictures.map((picture) => (
          <div key={picture.date}>
            <img src={picture.url} alt="NasaPic"></img>
            <p>{picture.date}</p>
            <p>{picture.title}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
