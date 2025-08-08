const app = require("./src/app");
const config = require("./src/config");

const PORT = config.port || 3000;
const host = config.db.host || "127.0.0.1";

app.listen(PORT, () => {
  console.log(`Server is running on port http://${host}:${PORT}`);
});
