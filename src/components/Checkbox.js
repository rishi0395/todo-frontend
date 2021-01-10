import React from 'react';
import PropTypes from 'prop-types';
import { axios } from '../helpers/axios';
import { taskModify } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { modifyTask } from '../reducer';

export const Checkbox = ({ id, taskDesc, checked }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { selectedProject } = state;

  const archiveTask = () => {
    axios
      .patch(taskModify(id), {
        archived: selectedProject !== 'BIN' ? true : false,
      })
      .then((res) => {
        checked();
        const { transactionSuccess, task } = res.data;
        if (transactionSuccess) {
          dispatch(modifyTask(task));
        }
      });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') archiveTask();
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
