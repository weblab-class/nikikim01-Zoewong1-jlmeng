import React, { useState, Component } from "react";
import useOnclickOutside from 'react-cool-onclickoutside';
import Select from "react-select";
import "./Dropdown.css";


const options = []


function Dropdown({ title, items, multiSelect = false}) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]); 
    const toggle = () => setOpen(!open);
    const ref = useOnclickOutside(() => {
        setOpen(false);
    });

    function handleOnClick(item) {
        if (!selection.some(current => current.id === item.id)) {
            if (!multiSelect) {
                setSelection([item]);
            } else if (multiSelect) {
                setSelection([...selection, item]);
            }
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([... selectionAfterRemoval]);
        }
    }

    function isItemInSelection(item) {
        if (selection.find(current => current.id === item.id)) {
            return true;
        }
        return false;
    }

    return (
        <div className="Dropdown-wrapper ignore-onclickoutside">
            <div 
            tabIndex={0} 
            className="Dropdown-header" 
            role="button" 
            onKeyPress={() => toggle(!open)}
            onClick={()=> toggle(!open)}
            >
                <div className="Dropdown-header_title">
                    <p className="Dropdown-title">{title}</p>
                    <p className="Dropdown-icon"></p>
                </div>
                <div className="Dropdown-header_action">
                </div>
            </div>
            {open && (
                <ul className="Dropdown-list u-flex" >
                    {items.map((item) => (
                        <li className="Dropdown-list-item" key={item.id}>
                            <button className="Dropdown-button" type="button" onClick={() => handleOnClick(item)}>
                                {item.value} {isItemInSelection(item)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {open && <div ref={ref}></div>}
        </div>
    )
}

export default Dropdown;