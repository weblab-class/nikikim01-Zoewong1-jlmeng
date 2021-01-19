import React, { useState, Component } from "react";
import Select from "react-select";


const days = [
    {
      value: "Day1",
      label: 1,
    },{
      value: "Day2",
      label: 2,
    },{
      value: "Day3",
      label: 3,
    },{
      value: "Day4",
      label: 4,
    },{
      value: "Day5",
      label: 5,
    },{
      value: "Day6",
      label: 6,
    },{
      value: "Day7",
      label: 7,
    },{
      value: "Day8",
      label: 8,
    },{
      value: "Day9",
      label: 9,
    },{
      value: "Day10",
      label: 10,
    },{
      value: "Day11",
      label: 11,
    },{
      value: "Day12",
      label: 12,
    },{
      value: "Day13",
      label: 13,
    },{
      value: "Day14",
      label: 14,
    },{
      value: "Day15",
      label: 15,
    },{
      value: "Day16",
      label: 16,
    },{
      value: "Day17",
      label: 17,
    },{
      value: "Day18",
      label: 18,
    },{
      value: "Day19",
      label: 19,
    },{
      value: "Day20",
      label: 20,
    },{
      value: "Day21",
      label: 21,
    },{
      value: "Day22",
      label: 22,
    },{
      value: "Day23",
      label: 23,
    },{
      value: "Day24",
      label: 24,
    },{
      value: "Day25",
      label: 25,
    },{
      value: "Day26",
      label: 26,
    },{
      value: "Day27",
      label: 27,
    },{
      value: "Day28",
      label: 28,
    },{
      value: "Day29",
      label: 29,
    },{
      value: "Day30",
      label: 30,
    },{
      value: "Day31",
      label: 31,
    }
  ];


class DaysDropdown extends Component {
    state = {
        selectedOption: null,
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log("Option selected:", selectedOption);
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                styles={{
                  indicatorSeparator: () => {},
                }}
                className = "CreateEntry-dropdownButton DaysDropdown-button"
                placeholder="Day"
                value={selectedOption}
                onChange={this.handleChange}
                options={days}
                />
        );
    }

}

export default DaysDropdown;