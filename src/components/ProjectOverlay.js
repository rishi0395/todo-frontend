import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const state = useSelector((state) => state);

  const { projects } = state;

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setProject(project.projectId);
                    setShowProjectOverlay(false);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  projects: PropTypes.array,
};
