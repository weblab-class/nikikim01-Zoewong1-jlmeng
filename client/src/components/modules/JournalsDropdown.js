
import React, { Component } from "react";
import Creatable from 'react-select/creatable';

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

    handlechange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log('action: ${actionMeta.action}');
        console.groupEnd();
    };

    render() {
        return(
            <Creatable
                className="CreateEntry-dropdownButton JournalsDropdown-button"
                styles={{
                    indicatorSeparator: () => {},
                  }}
                onChange={this.handleChange}
                options = {journals}
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