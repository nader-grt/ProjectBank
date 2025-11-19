import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsBaseScreenUI from "../clsBaseScreenUI";

import * as readlineSync from 'readline-sync';
import clsGetAllClientScreenUI from "../ClientBankScreenUI/clsGetAllClientScreenUI";
import clsAddClientScreenUI from "../ClientBankScreenUI/clsAddCLientScreenUI";
import clsUpdateCLientScreenUI from "../ClientBankScreenUI/clsUpdateCLientScreenUI";
import clsDeleteClientScreenUI from "../ClientBankScreenUI/clsDeleteClientScreenUI";
import clsFindClientScreenUI from "../ClientBankScreenUI/clsFindClientScreenUI";
import clsTransactionBaseMainScreenUI from "./clsTransactionBaseMainScreenUI";

export enum enOption {
  showListClients = 1,
  AddNewClient = 2,
  UpdateClient = 3,
  DeleteClient = 4,
  FindCLient = 5,
  TransactionMenu = 6,
  EnScreen   =7 ,
}

export default class clsBaseMainScreenUI extends  clsBaseScreenUI {
  private static _options: enOption;

  static ClearScreen(): void {
    console.clear();
  }
  private  static  _GobackToMainMenu()
   {
 
       
        console.log("\n\tPress any key to go back to Main Menu...");

     
        readlineSync.keyInPause();
        clsBaseMainScreenUI.ClearScreen() ;
        clsBaseMainScreenUI.showMainMenu() ;


    
   }

  private static _ReadMainMenuNumber(): number {
    let num: number = clsInputValidate.ReadNumberBetweenStartEnd(
      1,
      8,
      "Choose Way you want enter "
    );
    return num;
  }

  private static  async _showListClient() {
   

    await clsGetAllClientScreenUI.GetAllClientListScreen(); 
   
  }

  private static async  _AddNewClient():Promise<void> {
    

      await clsAddClientScreenUI.AddClient()
  }

  private static async  _UpdateClient():Promise<void> {
     await  clsUpdateCLientScreenUI.UpdateClient()
  }

  private static async  _DeleteClient() {
    await clsDeleteClientScreenUI.DeleteCLient()
  }

  private static async _FindClient():Promise<void>
  {
    
      await clsFindClientScreenUI.FindClient()

  }

  private static async _TransactionMenu():Promise<void>
  {

      await clsTransactionBaseMainScreenUI.ShowTransactionMenu() ;

  }

  private static _EndScreen():void
  {

    console.log("end system ") ;
    readlineSync.keyInPause();
    clsBaseMainScreenUI.ClearScreen() ;

  }

  private static async StartChooseFromMainMenuOption() {
    const num: number = clsBaseMainScreenUI._ReadMainMenuNumber();
    //  return num as enOption; // convert number to enum

    switch (num as enOption) {
      case enOption.showListClients:
        clsBaseMainScreenUI.ClearScreen() ;
     await   clsBaseMainScreenUI._showListClient();
        clsBaseMainScreenUI._GobackToMainMenu() ;
        break;
      case enOption.AddNewClient:
        clsBaseMainScreenUI.ClearScreen() ;
      await  clsBaseMainScreenUI._AddNewClient();
        clsBaseMainScreenUI._GobackToMainMenu() ;
        break;
      case enOption.UpdateClient:
        clsBaseMainScreenUI.ClearScreen() ;
       await clsBaseMainScreenUI._UpdateClient();
        clsBaseMainScreenUI._GobackToMainMenu() ;
        break;
      case enOption.DeleteClient:
        clsBaseMainScreenUI.ClearScreen() ;
     await   clsBaseMainScreenUI._DeleteClient();
        clsBaseMainScreenUI._GobackToMainMenu() ;
        break;
        //_FindClient()

        case enOption.FindCLient:
          clsBaseMainScreenUI.ClearScreen() ;
       await   clsBaseMainScreenUI._FindClient();
          clsBaseMainScreenUI._GobackToMainMenu() ;
          break;

          //TransactionMenu
          case enOption.TransactionMenu:
            clsBaseMainScreenUI.ClearScreen() ;
         await   clsBaseMainScreenUI._TransactionMenu();
            clsBaseMainScreenUI._GobackToMainMenu() ;
            break;

        case enOption.EnScreen:
          clsBaseMainScreenUI.ClearScreen() ;
          clsBaseMainScreenUI._EndScreen();
         
          break;

      default:
        break;
    }

    //  return num
  }


  public static async showMainMenu() {
    clsBaseMainScreenUI.ClearScreen();
    clsBaseScreenUI._DrawScreenHeader("\t\t Main Screen");

   
    console.log("".padEnd(37, " ") + "\t[1] Show Client List.\n");
    console.log("".padEnd(37, " ") + "\t[2] Add New Client.\n");
    console.log("".padEnd(37, " ") + "\t[3] Update Client Info.\n");
    console.log("".padEnd(37, " ") + "\t[4] Delete Client.\n");
    console.log("".padEnd(37, " ") + "\t[5] Find Client.\n");
    console.log("".padEnd(37, " ") + "\t[6] Transactions.\n");
    console.log("".padEnd(37, " ") + "\t[7] Manage Users.\n");
    console.log("".padEnd(37, " ") + "\t[8] Logout.\n");
    console.log(
      "".padEnd(37, " ") + "===========================================\n"
    );

  await  clsBaseMainScreenUI.StartChooseFromMainMenuOption();
  }
}
