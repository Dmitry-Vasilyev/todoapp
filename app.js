const express = require('express');
const app = express();
app.listen(3000);

app.use(express.json());
app.use(express.static('static'));


let todoData = [];
let idTodoData = 0;

// for(let i = 0; i < 6; i++) {
//     todoData.push({
//         id: idTodoData++,
//         title: i + 'hello'
//     })
// }

app.get('/todo', function (req, res) {
    res.json(todoData);
});

app.post('/todo', function (req, res) {
    const todo = {
        id: idTodoData++,
        title: req.body.title
    }
    todoData.push(todo);
    res.status(201).json(todo);
});

app.delete('/todo/:id', function (req, res) {
    const id = parseInt(req.params.id);
    let match = false;
    for (let i = 0; i < todoData.length; i++) {
        if (todoData[i].id === id) {
            todoData.splice(i, 1);
            match = true;
        }
    }
    if(match) {
        res.status(204).send();
    } else {
        res.status(404).send('Not Found');
    }

})