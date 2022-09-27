const app = require('./src/app');
const port = 3030;

app.listen(port, () => {
    console.log('Server listen on port', port);
})