export const collatedTasks = [
  { key: 'INBOX', name: 'Inbox' },
  { key: 'BIN', name: 'Bin' },
];

export const projectsSync = '/projectsSync';
export const projectSubmit = '/projectSubmit';
export const projectDelete = (id) => `/projectsDelete/${id}`;

export const tasksSync = '/tasksSync';
export const taskSubmit = '/taskSubmit';
export const taskModify = (id) => `taskModify/${id}`;
