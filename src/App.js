import React, {useState, useEffect} from "react";
import JokeCard from './JokeCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import CategoryButton from './CategoryButton'

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://api.chucknorris.io/jokes/';

function App() {
    const [jokes, setJokes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(5);

    const searchJoke = async (title) => {
        const response = await fetch(`${API_URL}search?query=${title}`);
        const data = await response.json();
        setLimit(5)
        setJokes([...data.result]);
    }

    const loadJokeByCategory = async (category) => {
        const response = await fetch(`${API_URL}random?category=${category}`);
        const data = await response.json();
        setJokes([data]);
    }

    // ToDO: Implement this function for Bonus
    const loadJokeByUrl = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setJokes([data]);
    }

    const randomJoke = async () => {
        const response = await fetch(`${API_URL}random`);
        const data = await response.json();
        setJokes([data]);
        console.log('Random Joke',data);
    }

    const changeCategory = title => {
        title !== 'Categories' ? loadJokeByCategory(title) : console.log('Change Category to see a random joke');
    }

    function changeLimit() {
        setLimit(limit + 5);
    }

    useEffect(() => {
        randomJoke();
        // loadJokeByUrl("https://api.chucknorris.io/jokes/AezjEijKQWiX0zh9BJptsg");
        console.log(jokes);
    }, []);

    useEffect(() => {
    }, []);

    return (
        <div className="app">
            <h1>Chuck Norris Jokes</h1>

            <div className="search">
                <input
                    placeholder="Search Jokes"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => {searchJoke(searchTerm)}}
                />
            </div>

            <CategoryButton changeCategory={changeCategory}/>

            {/*<hr style={{backgroundColor: '#a1dd12'}}/>*/}

            {
                jokes.length > 0
                    ? (
                        <div className="container">
                            {jokes.slice(0, limit).map((joke) => (
                                <JokeCard key={joke?.id} joke={joke}/>
                            ))}
                            <div style={{marginTop: '1rem'}}>
                                {
                                    jokes.length > limit
                                        ? (
                                            <button className="btn-outline-dark" onClick={changeLimit}> Load More</button>
                                        )
                                        : (
                                            <p>Only this much here :)</p>
                                        )
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No jokes found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;