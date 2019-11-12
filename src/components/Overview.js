import React, { useEffect } from 'react';
import './Overview.css';

function Overview() {
	useEffect(() => {
		document.title = `Welcome to the React Pokemon App`;
	}, []);

	return (
		<div className="Overview">
			<div className="header-container">
				<h1 className="header-title">POKEMON BATTLE</h1>
				<div className="subtitle">Test your skills building a Pokemon application</div>
				<button className="go-to-selection">{`LET'S DO IT!`}</button>
			</div>

			<section className="description">
				<h2 className="section-title">OBJECTIVE</h2>
				<div className="description">The goal is to create a Pokemon application using the React framework and the Pokemon API.</div>

				<h2 className="section-title">CHALLENGE</h2>
				<div className="description">
					We will be creating a model to instantiate new pokemons and supply our application with data, having several fields such as their name, type, weakness and other stats.
        </div>

				<h2 className="section-title">HOW IT WORKS</h2>
				<video width="auto" height="auto" controls>
					(Your browser does not support the video tag).
        </video>
			</section>

			<button className="go-to-selection">{`LET'S DO IT!`}</button>
		</div>
	);
}

export default Overview;