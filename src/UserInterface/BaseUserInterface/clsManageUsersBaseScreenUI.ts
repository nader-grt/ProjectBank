import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsBaseScreenUI from "../clsBaseScreenUI";
import clsAddUserScreenUI from "../UserManageScreenUI/clsAddUserScreenUI";
import clsAllUsersScreenUI from "../UserManageScreenUI/clsAllUsersScreenUI";
import clsBaseMainScreenUI from "./clsBaseMainScreenUI";

import * as readlineSync from "readline-sync";

export enum enOptionManageUsers {
  AddNewUserManage = 1,
  UpdateUserManage = 2,
  GetUserManage = 3,
  DeleteUserManage = 4,
  FindUserManage = 5,
  GoBackMainMenu = 6,
}

export default class clsManageUsersBaseScreenUI extends clsBaseScreenUI {
  private static ClearScreen() {
    console.clear();
  }

  private static _ReadManageUserMenuNumber(): number {
    let num: number = clsInputValidate.ReadNumberBetweenStartEnd(
      1,
      6,
      "Choose Way you want enter "
    );
    return num;
  }
  private static async _GoBackMainMenu() {
    clsManageUsersBaseScreenUI.ClearScreen();

    await clsBaseMainScreenUI.showMainMenu();
  }

  public static async _GoBackUserManageMenu() {
    console.log("\n\tPress any key to go back to Main Menu...");

    readlineSync.keyInPause();
    clsManageUsersBaseScreenUI.ClearScreen();
    await clsManageUsersBaseScreenUI.ShowManageUsersMenu();
  }

   private static async   _AddNewUser():Promise<void>
   {
           

           await clsAddUserScreenUI.AddUser()  ;

   }

   private static async   _UpdateUser():Promise<void>
   {

    console.log("update  USER")
   }

   private static async   _GetUser():Promise<void>
   {

  

    await clsAllUsersScreenUI.ShowAllUsers()  ;
   }

   private static async   _DeleteUser():Promise<void>
   {

    console.log("delete USER")
   }

   private static async   _FindUser():Promise<void>
   {
    console.log(" find USER")

   }

  private static async _StartUserManage(): Promise<void> {
    let num: number = await this._ReadManageUserMenuNumber();

    switch (num as enOptionManageUsers) {
      case enOptionManageUsers.AddNewUserManage:
        clsManageUsersBaseScreenUI.ClearScreen();
      await this._AddNewUser()  ;
      await  clsManageUsersBaseScreenUI._GoBackUserManageMenu()
        break;

      case enOptionManageUsers.UpdateUserManage:
        clsManageUsersBaseScreenUI.ClearScreen();
        await this._UpdateUser()  ;
        await  clsManageUsersBaseScreenUI._GoBackUserManageMenu()
        break;

      case enOptionManageUsers.GetUserManage:
        clsManageUsersBaseScreenUI.ClearScreen();
        await this._GetUser()
        await  clsManageUsersBaseScreenUI._GoBackUserManageMenu()
        break;

      case enOptionManageUsers.DeleteUserManage:
        clsManageUsersBaseScreenUI.ClearScreen();
        await this._DeleteUser()
        await  clsManageUsersBaseScreenUI._GoBackUserManageMenu()
        break;

      case enOptionManageUsers.FindUserManage:
        clsManageUsersBaseScreenUI.ClearScreen();
        await this._FindUser()  ;
        await  clsManageUsersBaseScreenUI._GoBackUserManageMenu()
        break;

      case enOptionManageUsers.GoBackMainMenu:
        clsManageUsersBaseScreenUI.ClearScreen();

        await  this._GoBackMainMenu() ;
        break;

      default:
        break;
    }
  }

  public static async ShowManageUsersMenu(): Promise<void> {
    clsManageUsersBaseScreenUI.ClearScreen();
    clsBaseScreenUI._DrawScreenHeader("\t Manage User Menu");

    console.log("".padEnd(37, " ") + "\t[1] Add New User Manage.\n");
    console.log("".padEnd(37, " ") + "\t[2] Update User Manage.\n");
    console.log("".padEnd(37, " ") + "\t[3] Get User Manage.\n");
    console.log("".padEnd(37, " ") + "\t[3] Get User Manage.\n");
    console.log("".padEnd(37, " ") + "\t[5] Delete User Manage.\n");
    console.log("".padEnd(37, " ") + "\t[5] Find User Manage.\n");
    console.log("".padEnd(37, " ") + "\t[6] Main Menu.\n");
    console.log(
      "".padEnd(37, " ") + "===========================================\n"
    );

    await this._StartUserManage();
  }
}
