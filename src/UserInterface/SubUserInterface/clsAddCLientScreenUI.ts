import clsAddClientController from "../../controllers/ClientBankController/AddClientController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { clsBankClientUseCase, enMode } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsBaseScreenUI from "../clsBaseScreenUI";

export default class clsAddClientScreenUI extends clsBaseScreenUI
{

            private static async _ReadClient(client:clsBankClientUseCase):Promise<void>
            {
                client.setFirstName = clsInputValidate.ReadString("Enter FirstName \n");
                client.setLastName = clsInputValidate.ReadString(" Enter lastName  \n");
                client.setEmail = clsInputValidate.ReadString("    Enter email \n");
                client.setPhone = clsInputValidate.ReadString("    Enter phone  \n");
                client.setPinCode = clsInputValidate.ReadString("  Enter  Code Pine  \n");
                let bAccount: string = clsInputValidate.ReadString(
                  "Enter  Balance Account  \n"
                );
                client.setBalanceAccount = parseFloat(bAccount);
            }



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



            public static async AddClient():Promise<void>
            {
                clsBaseScreenUI._DrawScreenHeader("\t\tAdd New Client") ;

                const AccountNumber = clsInputValidate.ReadString(
                    "Please Enter Your Account Number ? "
                  );
              
                  const exists: boolean =
                    await clsAddClientController.FindAccountNumberInFile(AccountNumber);
              
                  if (exists) {
                    console.log(
                      `Account Number ${AccountNumber} already exists. Try another one.`
                    );
                    return;
                  }
              
                  const client = new clsBankClientUseCase(
                    enMode.NewAddMode,
                    "",
                    "",
                    "",
                    "",
                    AccountNumber,
                    "",
                    0
                  );


                await  this._ReadClient(client)

                

                  await clsAddClientController.SaveNewClient(client)

                  await this._PrintClient(client)  ;
               
            }
}