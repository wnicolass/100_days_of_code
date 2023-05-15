const {describe, it, before, after } = require('node:test');
const { deepStrictEqual, ok, strictEqual } = require('node:assert');
const app = require('../app');

const BASE_URL = 'http://localhost:3001';

describe('API Workflow', () => {
    let server = {};
    let todoId = '';
    before(async () => {
        server = app.listen(3001);
        await new Promise(resolve => server.once('listening', resolve));
    });

    it('should create a todo and return a success message', async () => {
        const text = 'I am a todo from test';
        const response = await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text
            }),
        });
        strictEqual(response.status, 201);
        const responseData = await response.json();
        ok(typeof responseData.message === 'string');
        strictEqual(responseData.message,'Added todo successfully!');
        console.log(responseData.todo);
        todoId = responseData.todo.id;
    });

    it('should return a list of todo objects', async () => {
        const response = await fetch(`${BASE_URL}/todos`);
        strictEqual(response.status, 200);
        const responseData = await response.json();
        ok(responseData.todos instanceof Array, 'todos should be an array');
    });

    it('should update a todo and return success message', async () => {
        const text = 'I am a new text';
        const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newText: text
            }),
        });
        strictEqual(response.status, 200);
        const responseData = await response.json();
        ok(typeof responseData.message === 'string');
        strictEqual(responseData.message,'Todo updated!');
    });

    after(done => server.close(done));
})
