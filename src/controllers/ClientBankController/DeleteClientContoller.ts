import { TypeResultSave } from "../../filesystem/clsHandleFile";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { clsBankClientUseCase, enMode } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsAddClientController from "./AddClientController";
import clsUpdateClientController from "./updateClientController";

export default class clsDeleteClientController extends clsBankClientUseCase {



          public static async DeleteClient():Promise<void>
          {

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



                  let SaveResult: TypeResultSave;
                  SaveResult = await clsUpdateClientController.Save(client);
              
                  switch (SaveResult) {
                    case TypeResultSave.Success:
                      console.log("Result Mode of client :\t",client.IsEmpty())
                      client.Print() ;
                      console.log("Delete Client with Succes oky");
                      break;
                    case TypeResultSave.Success:
                      console.log("Failed For Deleted! ");
                      break;
                    default:
                      break;
                  }
              
          }
}
