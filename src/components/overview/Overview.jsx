import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Overview.module.css';

import BaseButton from '../_elements/BaseButton';
import OverviewStep from './elements/OverviewStep';

const overviewPropTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

const STEPS_INFO = [
  {
    id: 1,
    imagePath: 'images/pachirisu.png',
    description: 'Info for the first step',
  },
  {
    id: 2,
    imagePath: 'images/pachirisu.png',
    description: 'Info for the second step',
  },
  {
    id: 3,
    imagePath: 'images/pachirisu.png',
    description: 'Info for the third and final step',
  },
];

const Overview = ({ title, subtitle }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const history = useHistory();
  const navigateToSelection = () => history.push('/selection');

  return (
    <>
      <div className={styles['header-container']}>
        <h1 className={styles['header-title']}>{title.toUpperCase()}</h1>
        <div className={styles['header-subtitle']}>{subtitle.toUpperCase()}</div>
        <BaseButton label={'Let\'s do it!'} onClickHandler={navigateToSelection} uppercase purple />
      </div>

      <div className={styles['feature-list']}>
        <section>
          <h1 className={styles['section-title']}>OBJECTIVE</h1>
          <div className={styles.description}>
            {`The goal is to create a Pokemon application 
						using the React framework and the Pokemon API.`}
          </div>
        </section>
        <section>
          <h1 className={styles['section-title']}>CHALLENGE</h1>
          <div className={styles.description}>
            We will be creating a model to instantiate new pokemons
						and supply our application with data,
						having several fields such as their name, type, weakness and other stats.
          </div>
        </section>
        <section>
          <h1 className={styles['section-title']}>HOW IT WORKS</h1>
          <video width="auto" height="auto" controls>
            <track kind="captions" />

						(Your browser does not support the video tag).
          </video>
        </section>
      </div>

      <div className={styles.steps}>
        {STEPS_INFO.map((step, index) => (
          <OverviewStep
            key={step.id}
            stepTitle={`STEP ${index + 1}`}
            stepDescription={step.description}
            imagePath={step.imagePath}
          />
        ))}
      </div>

      <BaseButton label={'Let\'s do it!'} onClickHandler={navigateToSelection} uppercase purple />
    </>
  );
};

Overview.propTypes = overviewPropTypes;

export default Overview;
