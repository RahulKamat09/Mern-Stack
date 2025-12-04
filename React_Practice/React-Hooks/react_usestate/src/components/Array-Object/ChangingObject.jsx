import React, { useState } from 'react';

const ChangingObject = () => {
    const [person, setPerson] = useState({
        name: "Weeknd",
        artwork: {
            title: "Blinding Lights",
            city: "New York",
            image:
                "https://t2.genius.com/unsafe/380x380/https%3A%2F%2Fimages.genius.com%2F34c1c35ca27a735e6e5f18611acb1c16.1000x1000x1.png"
        }
    });

    const changeName = (e) => {
        setPerson({
            ...person,
            name: e.target.value
        });
    };

    const changeTitle = (e) => {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                title: e.target.value
            }
        });
    };

    const changeCity = (e) => {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                city: e.target.value
            }
        });
    };

    const changeImage = (e) => {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                image: e.target.value
            }
        });
    };

    return (
        <div className="container">
            <h2 className="heading">🎨 Artwork Editor</h2>

            <div className="form-box">
                <label>
                    Name:
                    <input value={person.name} onChange={changeName} />
                </label>

                <label>
                    Title:
                    <input value={person.artwork.title} onChange={changeTitle} />
                </label>

                <label>
                    City:
                    <input value={person.artwork.city} onChange={changeCity} />
                </label>

                <label>
                    Image URL:
                    <input value={person.artwork.image} onChange={changeImage} />
                </label>
            </div>

            <div className="preview-box">
                <p className="preview-text">
                    <strong>{person.artwork.title}</strong> by <span>{person.name}</span>
                    <br />
                    <span className="city-text">{person.artwork.city}</span>
                </p>

                <img
                    className="preview-img"
                    src={person.artwork.image}
                    alt="artwork preview"
                />
            </div>
        </div>
    );
};

export default ChangingObject;
