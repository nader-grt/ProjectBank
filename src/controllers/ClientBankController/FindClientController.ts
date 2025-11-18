import clsHandleFile from "../../filesystem/clsHandleFile";
//import clsStringLibrary from "../packageUsing/StringLibrary";
import {
  clsBankClientUseCase,
  enMode,
} from "../../useCases/ClientBankUseCase/clsBankClientUseCase";

export default class clsFindClientController extends clsBankClientUseCase {
  private _mode2: enMode = enMode.EmptyMode;
  private static GetEmptyClientObject2(): clsBankClientUseCase {
    return new clsBankClientUseCase(
      enMode.EmptyMode,
      "",
      "",
      "",
      "",
      "",
      "",
      0
    );
  }

  constructor(
    mode2: enMode,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    accountNumber: string,
    pinCode: string,
    balanceAccount: number
  ) {
    super(
      mode2,
      firstName,
      lastName,
      email,
      phone,
      accountNumber,
      pinCode,
      balanceAccount
    ); //base class
  }

  public static async find(
    accountNumber: string
  ): Promise<clsBankClientUseCase> {
    const listClient: clsBankClientUseCase[] = [];

    const dataFileLines: any = await clsHandleFile.readFromFileClientList();

    for (const line of dataFileLines) {
      const client: clsBankClientUseCase =
        await clsHandleFile.convertLineClientToObject(line);
      if (client.getAccountNumber === accountNumber) {
        return client;
      }

      listClient.push(client);
    }
    return clsFindClientController.GetEmptyClientObject2();
  }

  public static async IsExistClient(accountNumber: string): Promise<boolean> {
    const client: clsBankClientUseCase = await clsFindClientController.find(
      accountNumber
    );

    return !client.IsEmpty();
  }
}
