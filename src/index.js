const express = require('express');

const server = express();

server.use(express.json());

let numberOfRequests = 0;

const projects = [];

function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

function chekProjectsId(req, res, next) {
  const { id } = req.params
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project does exists' })
  }

  res.project = project;

  return next();
}

//Criar Projeto
server.post('/projects', (req, res) => {

  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

//Listar todos projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Editar um projeto
server.put('/projects/:id', chekProjectsId, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

//Deletar projeto
server.delete('/projects/:id', chekProjectsId, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);

  res.send('Project deleted with success');
});

//Inserir Task
server.post('/projects/:id/tasks', chekProjectsId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
})

server.listen(4444);