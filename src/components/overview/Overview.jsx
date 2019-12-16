import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Overview.module.css';

import BaseButton from '../_common/BaseButton/BaseButton';
import OverviewStep from './elements/OverviewStep';

const overviewPropTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

const STEPS_INFO = [
  {
    id: 1,
    imagePath: 'images/pokeball.png',
    description: `Go to the Selection screen, where you will be able to select from a list of many different Pokemons
    and choose them for battle. It is also possible to filter pokemons by their name, or by their type.`,
  },
  {
    id: 2,
    imagePath: 'images/pokedex.png',
    description: `By selecting a Pokemon, their full stats will be displayed so that you can confirm if you want it to take part in a battle.
    If you change your mind, you can always cancel by closing the dialog and select another Pokemon from the Selection screen.`,
  },
  {
    id: 3,
    imagePath: 'images/battle.png',
    description: 'When two Pokemons are selected, gather them together and go to the Fight screen in order for the battle to start!',
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
        <BaseButton label={'Let\'s do it!'} onClickHandler={navigateToSelection} styleOptions={['uppercase', 'purple']} />
      </div>

      <div className={styles['feature-list']}>
        <section>
          <img className={styles['description-decoration']} src="../images/pachirisu.png" width="auto" height="400" alt="" />

          <h1 className={styles['section-title']}>OBJECTIVE</h1>
          <div className={styles.description}>
            The goal is to create a Pokemon application using the React framework
            and the Pokemon API.
            React Hooks and functional components will be used for this app.
          </div>
        </section>
        <section>
          <h1 className={styles['section-title']}>CHALLENGE</h1>

          <div className={styles.description}>
            We will be creating a model to instantiate new pokemons and supply our application
            with data, having several fields such as their name, type, weakness and other stats.
            This information will be stored via Redux store,
            dispatching different actions based on the type of info to store.
          </div>
        </section>
        <section>
          <h1 className={styles['section-title']}>HOW IT WORKS</h1>
          <video min-width="300px" width="80%" height="auto" controls>
            <source src="../sample_video.mp4" type="video/mp4" />
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

      <BaseButton label={'Let\'s do it!'} onClickHandler={navigateToSelection} styleOptions={['uppercase', 'purple']} />
    </>
  );
};

Overview.propTypes = overviewPropTypes;

export default Overview;
