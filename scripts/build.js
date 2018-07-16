const args2 = ["run build"];
const opts2 = { stdio: "inherit", cwd: "client", shell: true };
require("child_process").spawn("npm", args2, opts2);