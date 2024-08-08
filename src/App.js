import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleInterestChange = (event) => {
    const { value, checked } = event.target;
    setInterests(prevInterests =>
      checked
        ? [...prevInterests, value]
        : prevInterests.filter(interest => interest !== value)
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm Sammy Mwaura</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            aria-label="name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            aria-label="email"
          />
        </label>

        <fieldset>
          <legend>Select your interests:</legend>
          <label>
            <input
              type="checkbox"
              value="Interest 1"
              onChange={handleInterestChange}
            />
            Interest 1
          </label>
          <label>
            <input
              type="checkbox"
              value="Interest 2"
              onChange={handleInterestChange}
            />
            Interest 2
          </label>
          <label>
            <input
              type="checkbox"
              value="Interest 3"
              onChange={handleInterestChange}
            />
            Interest 3
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>
          Thank you for subscribing, {name}!{interests.length > 0 && ` You are interested in: ${interests.join(", ")}`}
        </p>
      )}
    </main>
  );
}

export default App;
