import React from 'react';

const ReactProjectsList = () => {
  // Sample data, replace with your actual projects
  const projects = [
    { id: 1, name: 'Project Alpha', description: 'First React project.' },
    { id: 2, name: 'Project Beta', description: 'Second React project.' },
    { id: 3, name: 'Project Gamma', description: 'Third React project.' },
  ];

  return (
    <div>
      <h2>React Projects List</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <strong>{project.name}</strong>: {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactProjectsList;
