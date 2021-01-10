import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IndividualProject } from './IndividualProject';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProject } from '../reducer';

export const Projects = ({ activeValue = null }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [active, setActive] = useState(activeValue);
  const { projects } = state;

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            dispatch(setSelectedProject(project.projectId));
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              dispatch(setSelectedProject(project.projectId));
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
};
