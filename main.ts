

import clsBaseMainScreenUI from "./src/UserInterface/BaseUserInterface/clsBaseMainScreenUI";

async function main() {
  try {
    // work with UI

   await clsBaseMainScreenUI.showMainMenu();

    // const client = await FindClientController.find("A101");

  } catch (err) {
    console.error(err);
  }
}

await main();
