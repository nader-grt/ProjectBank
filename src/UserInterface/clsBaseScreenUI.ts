import { GlobalCurrentUser } from "../infra/currentUser";
import clsDate from "../packageUsing/clsDate";

export default  abstract class clsBaseScreenUI
{
    protected static _DrawScreenHeader(Title: string, SubTitle: string = ""): void {
        console.log("\t\t\t\t\t______________________________________");
        console.log("\n\n\t\t\t\t\t  " + Title);
        if (SubTitle !== "") {
            console.log("\n\t\t\t\t\t  " + SubTitle);
        }
        console.log("\n\t\t\t\t\t______________________________________\n\n");
      
        console.log(`\n\t\t\t\t\tUser: ${GlobalCurrentUser.CurrentUser.getUserName}`);
        console.log(`\t\t\t\t\tDate: ${clsDate.DateToString(new Date())}\n`);
        console.log("\t\t\t\t\t______________________________________\n");
    }


    protected static async isAccessRIghtsGranted( userPermission: number): Promise<boolean> 
        {


            if (!GlobalCurrentUser.CurrentUser.checkAccessPermission(userPermission))
                {
                    console.log( "\t\t\t\t\t______________________________________");
                    console.log( "\n\n\t\t\t\t\t  Access Denied! Contact your Admin).");   
                    console.log( "\n\t\t\t\t\t______________________________________\n\n");
                    return false;
                }
                else
                {
                    return true;
                }
           // return true
        }
    
}