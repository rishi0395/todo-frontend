import React, { useState } from 'react';
import { FaChevronDown, FaInbox } from 'react-icons/fa';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';
import { useDispatch } from 'react-redux';
import { AiFillCheckSquare } from 'react-icons/ai';
import { setSelectedProject } from '../../reducer';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === 'inbox' ? 'active' : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('inbox');
              dispatch(setSelectedProject('INBOX'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('inbox');
                dispatch(setSelectedProject('INBOX'));
              }
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          data-testid="bin"
          className={active === 'bin' ? 'active' : undefined}
        >
          <div
            data-testid="bin-action"
            aria-label="Show tasks for the next 7 days"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive('bin');
              dispatch(setSelectedProject('BIN'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('bin');
                dispatch(setSelectedProject('BIN'));
              }
            }}
          >
            <span>
              <AiFillCheckSquare />
            </span>
            <span>Bin</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        aria-label="Show/hide projects"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowProjects(!showProjects);
        }}
        role="button"
        tabIndex={0}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
