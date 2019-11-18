import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Overview.module.css';

import OverviewSteps, {STEPS_INFO} from './OverviewSteps';

const overviewPropTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
}

function Overview(props) {
	useEffect(() => {
		document.title = `Welcome to the React Pokemon App`;
	}, []);

	let history = useHistory();
	const navigateToSelection = () => history.push('/selection');

	return (
		<>
			<div className={styles['header-container']}>
				<h1 className={styles['header-title']}>{props.title.toUpperCase()}</h1>
				<div className={styles['header-subtitle']}>{props.subtitle.toUpperCase()}</div>
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

			<div className={styles['steps']}>
				{STEPS_INFO.map((step, index) => 
					<OverviewSteps 
						key={index} 
						stepTitle={`STEP ${++index}`} 
						stepDescription={step.description}
						imagePath={step.imagePath}
					/>
				)}
			</div>

			<button className={styles['go-to-selection']} onClick={navigateToSelection}>{`LET'S DO IT!`}</button>
		</>
	);
}

Overview.propTypes = overviewPropTypes;

export default Overview;