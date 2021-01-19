import React, { Component } from "react";
import Creatable from 'react-select/creatable';

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

class Tags extends Component {

    handlechange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log('action: ${actionMeta.action}');
        console.groupEnd();
    };

    render() {
        return(
            <Creatable
                className="CreateEntry-dropdownButton"
                styles={{
                    indicatorSeparator: () => {},
                  }}
                isMulti
                onChange={this.handleChange}
                options = {tags}
                placeholder='tag(s)'
            />
        );
    }
}

export default Tags;