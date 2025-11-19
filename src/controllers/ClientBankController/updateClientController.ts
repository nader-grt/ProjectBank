import {
  clsBankClientUseCase,
  enMode,
} from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsHandleFile, { TypeResultSave } from "../../filesystem/clsHandleFile";


export default class clsUpdateClientController extends clsBankClientUseCase {


  public static async UpdateCLient(client:clsBankClientUseCase) {
  

    let SaveResult: TypeResultSave;
    SaveResult = await clsUpdateClientController.Save(client);

    switch (SaveResult) {
      case TypeResultSave.Success:
        console.log("Succes oky");
        break;
      case TypeResultSave.Success:
        console.log("Failed bad updated");
        break;
      default:
        break;
    }
  }

  private static async _update(client: clsBankClientUseCase): Promise<void> {
    let vClients: clsBankClientUseCase[] = [];
    vClients = await clsHandleFile.LoadDataFromFile();

    //  console.log("first get client for updated",client,"acc updated" ,client.getAccountNumber  ,  "updateeeeeeeeeee vclients ******** \t",vClients)
    for (let i = 0; i < vClients.length; i++) {
      if (vClients[i].getAccountNumber === client.getAccountNumber) {
        console.log("Found client to update:", vClients[i].getAccountNumber);

        vClients[i] = client;

        break;
      }
    }
    await clsHandleFile.SaveDataToFile(vClients);
  }

  private static async _AddNewClient(client:clsBankClientUseCase):Promise<void>
  {          

   

    let vClients: clsBankClientUseCase[] = [];
    vClients = await clsHandleFile.LoadDataFromFile();

           

               vClients.push(client)
           
              
               await clsHandleFile.SaveDataToFile(vClients);

  }

   private static async _DeleteClient(client:clsBankClientUseCase):Promise<void>
    {
      let vClients: clsBankClientUseCase[] = [];
      vClients = await clsHandleFile.LoadDataFromFile();
                 
      const updatedClients = vClients.filter(
        (ele) => ele.getAccountNumber !== client.getAccountNumber
      );

                   await clsHandleFile.SaveDataToFile(updatedClients);
    }


  public static async Save(
    client: clsBankClientUseCase
  ): Promise<TypeResultSave> {
    switch (client.getMode) {
      case enMode.EmptyMode:
        return TypeResultSave.Failed;

      case enMode.UpdateMode:
       await  this._update(client);
        return TypeResultSave.Success;


      case enMode.NewAddMode:
       
      await  this._AddNewClient(client);
        client.setMode = enMode.UpdateMode ;
        return TypeResultSave.Success;

        case enMode.DeleteMode:
         await this._DeleteClient(client);
          client.setMode = enMode.EmptyMode ;
          return TypeResultSave.Success;
      default:
        break;
    }
    return TypeResultSave.Success;
  }
}
