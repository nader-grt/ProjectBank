import { promises as fs } from "fs";
import path from "path";
import { enMode } from "../useCases/ClientBankUseCase/clsBankClientUseCase";
import { fileURLToPath } from "url";
import { clsBankClientUseCase } from "../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsStringLibrary from "../packageUsing/StringLibrary";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export enum TypeResultSave {
  Success = 0,
  Failed = 1,
}

export default class clsHandleFile {
  // private  _ResultSave :TypeResultSave ;

  public static async readFromFileClientList(): Promise<string[]> {
    let lines: string[] = [];
    let fileHandle: any;

    try {
      const filePath = path.join(__dirname, "clientList.txt"); // Correct path

      fileHandle = await fs.open(filePath, "r");

      const data = await fs.readFile(filePath, "utf8");

      lines = data.split(/\r?\n/);
    } catch (err) {
      console.error("Error reading file:", err);
    } finally {
      if (fileHandle) await fileHandle.close();
    }

    return lines.map((line) => line.trim()).filter((line) => line.length > 0);
  }

  public static async convertLineClientToObject(
    line: string
  ): Promise<clsBankClientUseCase> {
    const data = clsStringLibrary.SplitString(line, "#//#");

    if (data.length < 7) {
      throw new Error("Invalid client format");
    }

    return new clsBankClientUseCase(
      enMode.UpdateMode,
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
      parseFloat(data[6])
    );
  }


  public static async convertObjectToLineInFile(
    client: clsBankClientUseCase
  ): Promise<string> {
    const sep = "#//#";

    return (
      client.getFirstName +
      sep +
      client.getLastName +
      sep +
      client.getEmail +
      sep +
      client.getPhone +
      sep +
      client.getAccountNumber +
      sep +
      client.getPinCode +
      sep +
      String(client.getBalanceAccount)
    );
  }

  public static async LoadDataFromFile(): Promise<clsBankClientUseCase[]> {
    const vClients: clsBankClientUseCase[] = [];

    const dataFileLines: string[] =
      await clsHandleFile.readFromFileClientList();

    for (const line of dataFileLines) {
      const client: clsBankClientUseCase =
        await clsHandleFile.convertLineClientToObject(line);

      vClients.push(client);
    }

    return vClients;
  }
 
  public static async SaveDataToFile(
    listClients: clsBankClientUseCase[]
  ): Promise<void> {
    try {
      const filePath = path.join(__dirname, "clientList.txt");

      const fileHandle = await fs.open(filePath, "w"); // "w" = write

      for (const el of listClients) {
        let line = await this.convertObjectToLineInFile(el);
        await fileHandle.writeFile(`${line}\n`, "utf8");
      }

      await fileHandle.close();

    //  console.log("File saved successfully.");

      
    } catch (err) {
      console.error("Error writing file:", err);
     
    }
  }





  public static async Save(client: clsBankClientUseCase): Promise<void> {
    let vClients: clsBankClientUseCase[] = [];
    vClients = await clsHandleFile.LoadDataFromFile();

    //  console.log("first get client for updated",client,"acc updated" ,client.getAccountNumber  ,  "updateeeeeeeeeee vclients ******** \t",vClients)
    for (let i = 0; i < vClients.length; i++) {
      if (vClients[i].getAccountNumber === client.getAccountNumber) {
   

        vClients[i] = client;

        break;
      }
    }
    await clsHandleFile.SaveDataToFile(vClients);
  }
}
