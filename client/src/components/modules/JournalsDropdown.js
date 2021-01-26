
import React, { Component } from "react";
import CreatableSelect from 'react-select/creatable';

const journals = [
{
    value: 'Journal1',
    label: 'School Journal',
},{
    value: 'Journal2',
    label: 'Work Journal',
}
];

const createJournals = (label) => ({
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

class JournalsDropdown extends Component {
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
            value: [...value, createJournals(inputValue)],
        });
        event.preventDefault();
    }
    };

    render() {
        const { inputValue, value } = this.state;
        return(
            <CreatableSelect
                className="CreateEntry-dropdownButton JournalsDropdown-button"
                styles={style}
                components={{
                  IndicatorSeparator: () => null
                }}
                isClearable
                inputValue={inputValue}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                options = {journals}
                value={value}
                placeholder='Journal Name'
            />
        );
    }
}
  

export default JournalsDropdown;

// import React, { useState, Component } from "react";
// import useOnclickOutside from 'react-cool-onclickoutside';
// import "./JournalDropdown.css";


// function JournalDropdown({ title, items, multiSelect = false}) {
//     const [open, setOpen] = useState(false);
//     const [selection, setSelection] = useState([]); 
//     const toggle = () => setOpen(!open);
//     const ref = useOnclickOutside(() => {
//         setOpen(false);
//     });

//     function handleOnClick(item) {
//         if (!selection.some(current => current.id === item.id)) {
//             if (!multiSelect) {
//                 setSelection([item]);
//             } else if (multiSelect) {
//                 setSelection([...selection, item]);
//             }
//         } else {
//             let selectionAfterRemoval = selection;
//             selectionAfterRemoval = selectionAfterRemoval.filter(
//                 current => current.id !== item.id
//             );
//             setSelection([... selectionAfterRemoval]);
//         }
//     }

//     function isItemInSelection(item) {
//         if (selection.find(current => current.id === item.id)) {
//             return true;
//         }
//         return false;
//     }

//     return (
//         <div className="JournalDropdown-wrapper ignore-onclickoutside">
//             <div 
//             tabIndex={0} 
//             className="JournalDropdown-header" 
//             role="button" 
//             onKeyPress={() => toggle(!open)}
//             onClick={()=> toggle(!open)}
//             >
//                 <div className="JournalDropdown-header_title">
//                     <p className="JournalDropdown-title">{title}</p>
//                     <p className="JournalDropdown-icon"></p>
//                 </div>
//                 <div className="JournalDropdown-header_action">
//                 </div>
//             </div>
//             {open && (
//                 <ul className="JournalDropdown-list u-flex" key={item.id} >
//                     {items.map((item) => (
//                         <li className="JournalDropdown-list-item" key={item.id}>
//                             <button className="JournalDropdown-button" type="button" onClick={() => handleOnClick(item)}>
//                                 {item.value} {isItemInSelection(item)}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {open && <div ref={ref}></div>}
//         </div>
//     )
// }

// export default JournalDropdown;