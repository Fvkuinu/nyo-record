import React, { FC } from 'react';

interface DropdownProps {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ options, selected, onChange }) => {
    return (
        <select value={selected} onChange={(e) => onChange(e.target.value)}>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
