import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { fetchProjects } from './reducer';

export const App = ({ darkModeDefault = false }) => {
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(darkModeDefault);
  /** eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <main
      data-testid="application"
      className={darkMode ? 'darkmode' : undefined}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content />
    </main>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
