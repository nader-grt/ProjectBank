import clsLogTransfertAmountFileBetweenClient from "../../filesystem/clsLogTransfertAmountFileBetweenClient";
import clsLogTransactionAmount from "../../log/clsLogTransactionAmount";

export default class LogAmountClientController {

            

    public static async DisplayLogAmountClient():Promise<clsLogTransactionAmount[]>
    {
          
     
                     
  const clientLogAmountInSystem :clsLogTransactionAmount[] =              await clsLogTransfertAmountFileBetweenClient.loadUsersFromLogAmountUserFile();


          //    console.log("controller usersLogInSystem \t \t  "  ,usersLogInSystem )
              return clientLogAmountInSystem ;
    }
}