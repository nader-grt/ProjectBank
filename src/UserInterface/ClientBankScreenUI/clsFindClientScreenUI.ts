import clsFindClientController from "../../controllers/ClientBankController/FindClientController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { clsBankClientUseCase } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsBaseScreenUI from "../clsBaseScreenUI";


export default class clsFindClientScreenUI  extends clsBaseScreenUI
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

               public static async FindClient():Promise<void>
               {

                          let isAccountNumbeFind :boolean ;
                    clsBaseScreenUI._DrawScreenHeader("\t\t Find Client UI : \t") ;

                    let AccountNumber = clsInputValidate.ReadString(
                         "Please Enter Your Account Number ? "
                       );



                       while (!( isAccountNumbeFind = await clsFindClientController.IsExistClient(AccountNumber) )) {
                         AccountNumber = clsInputValidate.ReadString(
                              ` Enter Your Account_Number not found ${AccountNumber} , enter again ? `
                            );
                       }

                   let client :clsBankClientUseCase =    await clsFindClientController.find(AccountNumber)  ;

                       if(isAccountNumbeFind)
                       {
                         console.log("\n\n \t Client founded by ",AccountNumber)
                           await this._PrintClient(client)  ;

                       }else
                       {
                         console.log("Client not found sorry ")
                       }
               }
}