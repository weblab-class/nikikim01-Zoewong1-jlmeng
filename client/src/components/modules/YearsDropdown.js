import React, { useState, Component } from "react";
import Select from "react-select";


const thisYear = new Date().getFullYear();

let years = new Array();
for (let i = 120; i>0; i--) {
  let yr = thisYear-120+i;
  let tempDict = {value: yr, label: yr};
  years.push(tempDict);
}

class YearsDropdown extends Component {
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
                className="CreateEntry-dropdownButton YearsDropdown-button"
                placeholder="Year"
                value={selectedOption}
                onChange={this.handleChange}
                options={years}
                />
        );
    }

}

export default YearsDropdown;