import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsBaseScreenUI from "../clsBaseScreenUI";

import * as readlineSync from 'readline-sync';
import clsGetAllClientScreenUI from "../ClientBankScreenUI/clsGetAllClientScreenUI";
import clsAddClientScreenUI from "../ClientBankScreenUI/clsAddCLientScreenUI";
import clsUpdateCLientScreenUI from "../ClientBankScreenUI/clsUpdateCLientScreenUI";
import clsDeleteClientScreenUI from "../ClientBankScreenUI/clsDeleteClientScreenUI";
import clsFindClientScreenUI from "../ClientBankScreenUI/clsFindClientScreenUI";
import clsTransactionBaseMainScreenUI from "./clsTransactionBaseMainScreenUI";
import clsManageUsersBaseScreenUI from "./clsManageUsersBaseScreenUI";
import clsUser, { enPermission } from "../../useCases/UserUseCase/clsUser";
import { GlobalCurrentUser } from "../../infra/currentUser";
import clsLogUserScreenUI from "../LogUserScreenUI/clsLogUserScreenUI";

export enum enOption {
  showListClients = 1,
  AddNewClient = 2,
  UpdateClient = 3,
  DeleteClient = 4,
  FindCLient = 5,
  TransactionMenu = 6,
  ManageUsersMenu = 7 ,
  AllLogUserInSystem = 8,
  EnScreen   =9 ,
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
      9,
      "Choose Way you want enter "
    );
    return num;
  }

  private static  async _showListClient() {
       
   // clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pListClients) ;

    if(!await  clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pListClients))return 
    clsBaseMainScreenUI.ClearScreen() ;
    await clsGetAllClientScreenUI.GetAllClientListScreen(); 
   
  }

  private static async  _AddNewClient():Promise<void> {
    

   // clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pAddNewClient) ;
try
{

  if(!await clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pAddNewClient) )return
 // clsBaseMainScreenUI.ClearScreen() ;

    await clsAddClientScreenUI.AddClient()
}catch(error)
{
  console.log("Error : "+ error) ;
}
  }

  private static async  _UpdateClient():Promise<void> {
   // clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pUpdateClients) ;

    if(!await clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pUpdateClients)) return
    clsBaseMainScreenUI.ClearScreen() ;
     await  clsUpdateCLientScreenUI.UpdateClient()
  }

  private static async  _DeleteClient() {
    

    if( !await clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pDeleteClient)) return 
    clsBaseMainScreenUI.ClearScreen() ;
    await clsDeleteClientScreenUI.DeleteCLient()
  }

  private static async _FindClient():Promise<void >
  {

                 try{
                  let found:boolean = await clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pFindClient) ;
                  if(!found)
                    {
                    return  ;
                     // break ;
                    }
                    await clsFindClientScreenUI.FindClient()
                 }catch(ex)
                 {
                    console.log("Error : "+ ex) ;
                 }

  }

  private static async _TransactionMenu():Promise<void>
  {

          if(!await clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pTranactions) ) return
          clsBaseMainScreenUI.ClearScreen() ;
      await clsTransactionBaseMainScreenUI.ShowTransactionMenu() ;

  }

  private static async _ManageUserMenu():Promise<void>
  {

     // await clsTransactionBaseMainScreenUI.ShowTransactionMenu() ;

     if(!await clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pManageUsers) ) return
     clsBaseMainScreenUI.ClearScreen() ;
     await clsManageUsersBaseScreenUI.ShowManageUsersMenu() ;

  }

  // private static _EndScreen():void
  // {

  //   console.log("end system ") ;
  //   readlineSync.keyInPause();
  //   clsBaseMainScreenUI.ClearScreen() ;

  // }

//clsLogUserScreenUI



private static  async  _ShowAllUsersLogInSystem():Promise<void>
{
 // GlobalCurrentUser.CurrentUser  = await clsUser._FindUserByUserNameAndPassword("","")  ;
 

 if(!await clsBaseScreenUI.isAccessRIghtsGranted(enPermission.pUserLog) ) return
 clsBaseMainScreenUI.ClearScreen() ;
  await   clsLogUserScreenUI.DisplayLogUserScreen() ;
 // clsBaseMainScreenUI.ClearScreen() ;

}


  private static  async  _Logout():Promise<void>
  {
    GlobalCurrentUser.CurrentUser  = await clsUser._FindUserByUserNameAndPassword("","")  ;
   
   // clsBaseMainScreenUI.ClearScreen() ;

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

            //

            case enOption.ManageUsersMenu:
              clsBaseMainScreenUI.ClearScreen() ;
           await   clsBaseMainScreenUI._ManageUserMenu();
              clsBaseMainScreenUI._GobackToMainMenu() ;
              break;


              case enOption.AllLogUserInSystem:
                clsBaseMainScreenUI.ClearScreen() ;
                //clsBaseMainScreenUI._EndScreen();
              await  clsBaseMainScreenUI._ShowAllUsersLogInSystem();
              clsBaseMainScreenUI._GobackToMainMenu() ;
                break;

        case enOption.EnScreen:
          clsBaseMainScreenUI.ClearScreen() ;
          //clsBaseMainScreenUI._EndScreen();
        await  clsBaseMainScreenUI._Logout();
         
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
    console.log("".padEnd(37, " ") + "\t[8] Show All Users Log In System.\n");
    console.log("".padEnd(37, " ") + "\t[9] Logout.\n");
    console.log(
      "".padEnd(37, " ") + "===========================================\n"
    );

  await  clsBaseMainScreenUI.StartChooseFromMainMenuOption();
  //clsBaseMainScreenUI.ClearScreen() ;
  }
}
