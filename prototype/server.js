const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

