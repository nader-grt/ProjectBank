import clsFindClientController from "../../controllers/ClientBankController/FindClientController";
import clsUpdateClientController from "../../controllers/ClientBankController/updateClientController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { clsBankClientUseCase } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsBaseScreenUI from "../clsBaseScreenUI";



export default class clsUpdateCLientScreenUI  extends clsBaseScreenUI
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


                public static async UpdateClient():Promise<void>
                {
                    clsBaseScreenUI._DrawScreenHeader("\t\tUpdate Client")
                    let AccountNumber: string = "";
                    let isAccountNumber: boolean;
                
                   
                    AccountNumber = clsInputValidate.ReadString(
                      "Please Enter Your Account Number Do you updated ? \n"
                    );
                
                  
                    while (
                      !(isAccountNumber =
                        await clsFindClientController.IsExistClient(AccountNumber))
                    ) {
                      AccountNumber = clsInputValidate.ReadString(
                        "Account Number is not found, enter again ? \n"
                      );
                    }
                
                    const client: clsBankClientUseCase =
                      await clsFindClientController.find(AccountNumber);
                
                    console.log("Client Info: \t \n");
                    console.log(
                      "-----------------------------------------------------------------\n"
                    );
                        this._PrintClient(client)

                        this._ReadClient(client)

                      await  clsUpdateClientController.UpdateCLient(client)



                 
                }
}                   