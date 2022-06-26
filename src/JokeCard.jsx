import React from "react";

function JokeCard({ joke }) {
    return (
        <div className="container">
            <div className="card">
                <div>
                    <span>{joke.updated_at.split(" ")[0]}</span>
                    <p className="description">{joke.value}</p>
                </div>
            </div>
        </div>
    );
}

export default JokeCard;