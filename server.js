const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});