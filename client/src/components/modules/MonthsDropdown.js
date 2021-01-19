import React, { useState, Component } from "react";
import Select from "react-select";

const months = [
    {
      value: "Month1",
      label: 'January',
    },{
      value: "Month2",
      label: 'February',
    },{
      value: "Month3",
      label: 'March',
    },{
      value: "Month4",
      label: 'April',
    },{
      value: "Month5",
      label: 'May',
    },{
      value: "Month6",
      label: 'June',
    },{
      value: "Month7",
      label: 'July',
    },{
      value: "Month8",
      label: 'August',
    },{
      value: "Month9",
      label: 'September',
    },{
      value: "Month10",
      label: 'October',
    },{
      value: "Month11",
      label: 'November',
    },{
      value: "Month12",
      label: 'December',
    },
  ];

const style = {
  control: base => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: "none",
    
  })
};

class MonthsDropdown extends Component {
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
                styles={style}
                components={{
                  IndicatorSeparator: () => null
                }}
                className = "CreateEntry-dropdownButton MonthsDropdown-button"
                placeholder="Month"
                value={selectedOption}
                onChange={this.handleChange}
                options={months}
                />
        );
    }

}

export default MonthsDropdown;