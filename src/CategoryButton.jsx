import React, {useEffect} from "react";
import "./App.css";

function CharacterDropDown({changeCategory}) {
    const [items, setItems] = React.useState([]);
    const [value, setValue] = React.useState("Categories");

    useEffect(() => {
        console.log(value);
        changeCategory(value);
    }, [value]);

    React.useEffect(() => {
        async function getCategories() {
            const response = await fetch(
                "https://api.chucknorris.io/jokes/categories"
            );
            const body = await response.json();
            setItems(['Categories',...body]);
        }
        getCategories()
    }, []);

    return (
        <select
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
        >
            {items.map(( value ) => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}

export default CharacterDropDown;
