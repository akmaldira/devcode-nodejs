const app = require('./src/app');
const port = 5000;

app.listen(port, () => {
    console.log('Server listen on port', port);
})