import React, { Component } from "react";
import CreatableSelect from 'react-select/creatable';

const tags = [
    {
        value: 'fake1',
        label: 'School'
    },
    {
        value: 'fake2',
        label: 'Really Good Day'
    },
    {
        value: 'fake3',
        label: 'Read when in need of pick me up'
    }
]

const createTags = (label) => ({
    label,
    value: label,
});

const style = {
    control: base => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      
    })
  };

class Tags extends Component {
    state = {
        inputValue: '',
        value: [], 
    }

    handleChange = (value, actionMeta) => {
        console.group('Value Changed');
        console.log(value);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        this.setState({ value });
    };

    handleInputChange = (inputValue) => {
        this.setState({ inputValue });
      };

    handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
        case 'Enter':
        case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        this.setState({
            inputValue: '',
            value: [...value, createTags(inputValue)],
        });
        event.preventDefault();
    }
    };

    render() {
        const { inputValue, value } = this.state;
        return (
          <CreatableSelect
            styles={style}
            components={{
                IndicatorSeparator: () => null
            }}
            inputValue={inputValue}
            className="CreateEntry-dropdownButton"
            isClearable
            isMulti
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder='tag(s)'
            value={value}
            options = {tags}
          />
        );
      }

}

export default Tags;