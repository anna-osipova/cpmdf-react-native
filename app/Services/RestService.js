const headers = {
  'Authorization': 'Basic YW5uYTp3ZXJlLWtlcHQtZmlndXJl',
  'Content-Type': 'application/json'
};
const URL = 'https://rocky-beach-17461.herokuapp.com';

const Api = {
  getTasks: function() {
    return fetch(`${URL}/tasks`, {
      method: 'GET',
      headers
    }).then((response) => response.json());
  },

  addTask: function(task) {
    return fetch(`${URL}/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(task)
    }).then((response) => response.json());
  },

  updateTask: function(task) {
    return fetch(`${URL}/tasks/${task._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(task)
    }).then((response) => response.json());
  },

  deleteTask: function(task) {
    return fetch(`${URL}/tasks/${task._id}`, {
      method: 'DELETE',
      headers
    }).then((response) => response.json());
  }
};

export { Api as default };
