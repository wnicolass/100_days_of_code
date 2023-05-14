const {describe, it, before, after } = require('node:test');
const { deepStrictEqual, ok, strictEqual } = require('node:assert');
const app = require('../app');

const BASE_URL = 'http://localhost:3001';

describe('API Workflow', () => {
    let server = {};
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
        console.log(responseData);
    });

    it('should return a list of todo objects', async () => {
        const response = await fetch(`${BASE_URL}/todos`);
        strictEqual(response.status, 200);
        const responseData = await response.json();
        ok(responseData.todos instanceof Array, 'todos should be an array');
    });

    after(done => server.close(done));
})
