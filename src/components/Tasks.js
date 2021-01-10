import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { fetchTasks, setSelectedProjectTask } from '../reducer';

export const Tasks = () => {
  const [checked, setChecked] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { selectedProject, projects, tasks, selectedProjectTask } = state;

  let projectName = '';

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject)?.name;
  }

  useEffect(() => {
    if (selectedProject === 'BIN') {
      dispatch(
        setSelectedProjectTask(tasks.filter((ele) => ele.archived === true))
      );
    } else if (selectedProject === 'INBOX') {
      console.log('oooo');
      dispatch(
        setSelectedProjectTask(tasks.filter((ele) => ele.archived !== true))
      );
    } else {
      const filterTask = tasks.filter(
        (task) => task.projectId === selectedProject
      );
      dispatch(
        setSelectedProjectTask(
          filterTask.filter((ele) => ele.archived !== true)
        )
      );
    }
  }, [selectedProject, tasks, checked]);

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  useEffect(() => dispatch(fetchTasks()), []);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {selectedProjectTask.map((task) => (
          <li key={`${task._id}`}>
            <Checkbox
              id={task._id}
              taskDesc={task.task}
              checked={() => setChecked((checked) => !checked)}
            />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};
