import clsAddClientController from "../../controllers/ClientBankController/AddClientController";
import clsDeleteClientController from "../../controllers/ClientBankController/DeleteClientContoller";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { clsBankClientUseCase, enMode } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsBaseScreenUI from "../clsBaseScreenUI";


export default class clsDeleteClientScreenUI  extends clsBaseScreenUI
{

              

            private static async _PrintClient(client:clsBankClientUseCase):Promise<void>
            {
                console.log("\nCard InfoUI\t: ");
              console.log("Account Number", client.getAccountNumber);
                console.log("FirstName", client.getFirstName);
                console.log("LastName", client.getLastName);
                console.log("Email", client.getEmail);
                console.log("Phone", client.getPhone);
                console.log("BalanceAccount", client.getBalanceAccount);
                console.log("PinCode", client.getPinCode);
            }


              public static async DeleteCLient():Promise<void>
              {
                    clsBaseScreenUI._DrawScreenHeader("\t\tDelete Client :\t")
                      

                    const AccountNumber = clsInputValidate.ReadString(
                        "Please Enter Your Account Number ? "
                    );
        
                    const isExist:boolean =           await clsAddClientController.FindAccountNumberInFile(AccountNumber)
                          
        
                          if(!isExist)
                          {
                            console.log(`Account Number ${AccountNumber} already exists. Try another one.`);
                            return;
        
                          }
                                 
        
                          const client = new clsBankClientUseCase( enMode.DeleteMode,  "",   "", "", "", AccountNumber, "",  0 );



                          await clsDeleteClientController.DeleteClient(client)

                          await this._PrintClient(client) ;
              }
}