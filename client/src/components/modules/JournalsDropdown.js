import React, { useState, Component } from "react";
import Select, { components } from "react-select";
// import dropdownButton from "../../public/images/dropdownButton.svg";
// import dropdownUpButton from "../..public/images/dropdownUpButton.svg";

const journals = [
    {
      value: 'Journal1',
      label: 'School Journal',
    },{
      value: 'Journal2',
      label: 'Work Journal',
    }
  ];

class JournalsDropdown extends Component {
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
                className = "JournalsDropdown-button"
                placeholder="Journal Name"
                value={selectedOption}
                onChange={this.handleChange}
                options={journals}
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
//                 <ul className="JournalDropdown-list u-flex" >
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