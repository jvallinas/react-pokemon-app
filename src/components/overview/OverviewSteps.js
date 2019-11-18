import React from 'react';
import PropTypes from 'prop-types';
import styles from './OverviewSteps.module.css';

const overviewStepsPropTypes = {
	imagePath: PropTypes.string,
	stepTitle: PropTypes.string,
	stepDescription: PropTypes.string
}

export const STEPS_INFO = [
	{
		imagePath: 'images/pachirisu.png',
		description: 'Info for the first step'
	},
	{
		imagePath: 'images/pachirisu.png',
		description: 'Info for the second step'
	},
	{
		imagePath: 'images/pachirisu.png',
		description: 'Info for the third and final step'
	}
];

function OverviewSteps(props) {
	return (
		<>
			<div className={styles['step-container']}>
				<img className={styles['step-image-container']} src={props.imagePath} alt=""></img>
				<h1>{props.stepTitle}</h1>
				<div className={styles['description']}>{props.stepDescription}</div>
			</div>
		</>
	);
}

OverviewSteps.propTypes = overviewStepsPropTypes;

export default OverviewSteps;