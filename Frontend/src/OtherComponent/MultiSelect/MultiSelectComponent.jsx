import React, { useEffect, useRef, useState } from 'react';
import './MultiSelectComponent.css';



const CustomMultiSelect = ({ options, placeholder, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (option) => {
        let newSelectedOptions;
        if (selectedOptions.includes(option)) {
            newSelectedOptions = selectedOptions.filter((item) => item !== option);
        } else {
            newSelectedOptions = [...selectedOptions, option];
        }

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    const selectedDisplay = selectedOptions.length > 2
        ? `${selectedOptions.length} options selected`
        : selectedOptions.join(', ');

    return (
        <div className="custom-multi-select" ref={selectRef} style={{ maxWidth: '180px' }}>
            <div className="select-container" onClick={toggleSelect}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={selectedDisplay}
                    readOnly
                />
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <div className="options">
                    {options.map((option) => (
                        <label key={option}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};


const MultiSelectComponent = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = (selectedOptions) => {
        setSelectedItems(selectedOptions);
    };

    return (
        <div>
            <h2>Select your options:</h2>
            <CustomMultiSelect
                options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
                placeholder="Select options"
                onChange={handleSelectionChange}
            />
            <p>Selected items: {selectedItems.join(', ')}</p>
        </div>
    );
};

export default MultiSelectComponent;
