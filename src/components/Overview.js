import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Overview.module.css';

import './Overview.css';

function Overview() {
	useEffect(() => {
		document.title = `Welcome to the React Pokemon App`;
	}, []);

	let history = useHistory();
	const navigateToSelection = () => history.push('/selection');

	return (
		<>
			<div className={styles['header-container']}>
				<h1 className={styles['header-title']}>{props.title.toUpperCase()}</h1>
				<div className={styles['subtitle']}>{props.subtitle}</div>
				<button className={styles['go-to-selection']} onClick={navigateToSelection}>{`LET'S DO IT!`}</button>
			</div>

			<div className={styles['feature-list']}>
				<section>
					<h1 className={styles['section-title']}>OBJECTIVE</h1>
					<div className={styles['description']}>The goal is to create a Pokemon application using the React framework and the Pokemon API.</div>
				</section>
				<section>
					<h1 className={styles['section-title']}>CHALLENGE</h1>
					<div className={styles['description']}>
					We will be creating a model to instantiate new pokemons and supply our application with data, having several fields such as their name, type, weakness and other stats.
				</div>
				</section>
				<section>
					<h1 className={styles['section-title']}>HOW IT WORKS</h1>
				<video width="auto" height="auto" controls>
					(Your browser does not support the video tag).
				</video>
			</section>
			</div>

			<button className={styles['go-to-selection']} onClick={navigateToSelection}>{`LET'S DO IT!`}</button>
		</>
	);
}

export default Overview;