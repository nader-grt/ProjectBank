

import clsLogin from "./src/UserInterface/BaseUserInterface/clsLoginScreenUI";

async function main() {
  try {
  

   

   
      await clsLogin.ShowLoginScreen();
   

  } catch (err) {
    console.error(err);
  }
}

await main();
