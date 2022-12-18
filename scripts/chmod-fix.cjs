const { exec } = require("child_process");

exec("which solid-start", (error1, stdout1, stderr1) => {
  console.log(`RUNNING: chmod -R a+rwx ${stdout1}`);

  exec(`chmod -R a+rwx ${stdout1}`, (error, stdout, stderr) => {
    if (error) console.log(`error: ${error.message}`);
    if (stderr) console.log(`stderr: ${stderr}`);
    console.log("DONE: finished running chmod-fix.");
  });
});
