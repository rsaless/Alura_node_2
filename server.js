const app = require('./src/config/custom-express');

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
