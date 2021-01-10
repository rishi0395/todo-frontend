import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAndUpdateProject,
  deleteAndUpdateTasks,
  setSelectedProject,
} from '../reducer';
import { projectDelete } from '../constants';
import { axios } from '../helpers/axios';

export const IndividualProject = ({ project }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { projects, tasks } = state;

  const deleteProject = (docId) => {
    axios.delete(projectDelete(docId)).then((res) => {
      dispatch(
        deleteAndUpdateTasks(
          tasks.filter((ele) => {
            return ele.projectId !== res.data.project.projectId;
          })
        )
      );
      dispatch(
        deleteAndUpdateProject(
          projects.filter((ele) => ele._id !== res.data.project._id)
        )
      );
      dispatch(setSelectedProject('INBOX'));
    });
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => deleteProject(project._id)}
      >
        <FaTrashAlt />
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
