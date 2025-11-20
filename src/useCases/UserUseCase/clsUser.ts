import clsHandleFileUser from "../../filesystem/clsHandleFileUser";
import { enMode } from "../ClientBankUseCase/clsBankClientUseCase";
import clsPersonUseCase from "../PersonUseCase/clsPersonUseCase";

export enum enPermissionUser
{
    enAllPermissionUser = -1 ,
    enAddPermissionUser = 1,
    enUPdatePermissionUser = 2,
    enDeletePermissionUser = 4,
    enShowPermissionUser = 8,
    enFindPermissionUser = 16 ,
    enListPermissionUser =32,


} ;


/**
 
  
 */


export default class clsUser extends clsPersonUseCase
{

            private _ModeUser:enMode = enMode.EmptyMode ;
            private _enPermission :enPermissionUser = enPermissionUser.enAllPermissionUser ;

            private _UserName :string = "" ;
            private  _Password :string = "";
            private  _Permission : number = 0 ;

            constructor(mode:enMode,firstName:string,lastName:string,email:string,phone:string,userName:string,password:string,permission:number)
            {        super(firstName,lastName,email,phone)
                    this._ModeUser = mode ;
                    this._UserName = userName ;
                    this._Password = password ;
                    this._Permission = permission ;
            }




            public get getUserName():string
            {
                return this._UserName ;
            }

            public set setUserName(userName:string)
            {
                 this._UserName = userName;
            }

            // read only 
            public get getPassword():string
            {
                return this._Password ;
            }

            public set setPassword(password:string)
            {
                 this._Password = password  ;
            }

            public get getPermission():number
            {
                return this._Permission;
            }

            public set setPermission(permission:number)
            {
                 this._Permission  = permission;
            }


            public static async SaveUser(user:clsUser):Promise<void>
            {

                await clsHandleFileUser.SaveUserToFile(user)
            }

}