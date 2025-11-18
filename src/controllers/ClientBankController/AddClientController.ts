import { promises } from "dns";
import clsHandleFile, { TypeResultSave } from "../../filesystem/clsHandleFile";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import {
  clsBankClientUseCase,
  enMode,
} from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsUpdateClientController from "./updateClientController";

export default class clsAddClientController extends clsBankClientUseCase {
  public static async FindAccountNumberInFile(
    accountNumber: string
  ): Promise<boolean> {
    try {
      let vClients: clsBankClientUseCase[] =
        await clsHandleFile.LoadDataFromFile();

      for (const ele of vClients) {
        if (ele.getAccountNumber === accountNumber) {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  private static async _Save1(
    client: clsBankClientUseCase
  ): Promise<TypeResultSave> {
    let SaveResult: TypeResultSave;
    SaveResult = await clsUpdateClientController.Save(client);

    // switch (SaveResult) {
    //   case TypeResultSave.Success:
    //     client.Print();
    //     console.log("Add New Client with Succes oky");
    //     break;
    //   case TypeResultSave.Success:
    //     console.log("Failed For New Added ");
    //     break;
    //   default:
    //     break;
    // }

    return TypeResultSave.Success;
  }

  public static async SaveNewClient(client :clsBankClientUseCase): Promise<void> {
   
    let SaveResult: TypeResultSave;
    SaveResult = await clsUpdateClientController.Save(client);





        switch (SaveResult) {
      case TypeResultSave.Success:
        console.log("Add New Client with Succes oky");
        break;
      case TypeResultSave.Success:
        console.log("Failed For New Added ");
        break;
      default:
        break;
    }
  }
}
