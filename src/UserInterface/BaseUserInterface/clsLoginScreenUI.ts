import clsLogFileHandleUser from "../../filesystem/clsLogFileUser";

import GlobalCurrentUserClass, {
  GlobalCurrentUser,
} from "../../infra/currentUser";
import clsLogUser from "../../log/clsLog";
import clsDate from "../../packageUsing/clsDate";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsUser from "../../useCases/UserUseCase/clsUser";
import clsBaseScreenUI from "../clsBaseScreenUI";
import clsBaseMainScreenUI from "./clsBaseMainScreenUI";

export default class clsLogin extends clsBaseScreenUI {
  private static count: number = 0;
  private static ClearScreen() {
    console.clear();
  }

  private static async RegisterToLogFile(): Promise<clsLogUser> {
    // GlobalCurrentUser.CurrentUser  =     ;
    let date: any = new Date();

    let logUser: clsLogUser = new clsLogUser(
      clsDate.convertDateToString(date),
      GlobalCurrentUser.CurrentUser.getUserName,
      GlobalCurrentUser.CurrentUser.getPassword,
      GlobalCurrentUser.CurrentUser.getPermission
    );

    //   console.log("object logUser ************************ \t " , logUser)  ;

    logUser = await clsLogFileHandleUser.RegisterLogFile(logUser);
    return logUser;
  }

  private static async _Login(): Promise<void> {
    let isFailedLogin: boolean = false;
    let userName: string = "";
    let password: string = "";

    do {
      if (isFailedLogin) {
        console.log(" Login Failed invalid userName and password  \n");
      }

      userName = clsInputValidate.ReadString(" Enter User Name  :  \n");
      password = clsInputValidate.ReadString(" Enter Password  :  \n");
      GlobalCurrentUser.CurrentUser =
        await GlobalCurrentUserClass.getCurrentUserByUserNameAndPassword(
          userName,
          password
        );

      isFailedLogin = await clsUser.isEmptyUser(
        GlobalCurrentUser.CurrentUser.getUserName,
        GlobalCurrentUser.CurrentUser.getPassword
      );

      this.count++;
      //   console.log("this.count ***** "+ this.count)  ;

      if (this.count === 3) {
        console.log(
          " You have exceeded the maximum number of login attempts. Exiting the application. \n"
        );
        process.exit(0);
      }
    } while (!isFailedLogin);
    //  await clsLogin.ClearScreen()  ;

    let loguser = await this.RegisterToLogFile();
    //   console.log("  await this.RegisterToLogFile() ******* ; condition \t \n \n ",  await this.RegisterToLogFile() ,"in login " )
  }

  public static async ShowLoginScreen(): Promise<void> {
    clsBaseScreenUI._DrawScreenHeader("\t Login Screen \t : ");

    //  console.log("  await this.RegisterToLogFile()  ; \t \n \n ",  await this.RegisterToLogFile() ,"end" )
    await this._Login();

    //    console.log(` Login Successfully Welcome  ${GlobalCurrentUser.CurrentUser.getFirstName}  \n`)  ;

    await clsLogin.ClearScreen()  ;
    await clsBaseMainScreenUI.showMainMenu();
    // await clsLogin.ClearScreen()  ;
  }
}
