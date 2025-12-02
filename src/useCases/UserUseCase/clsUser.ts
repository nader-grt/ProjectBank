
import clsHandleFileUser from "../../filesystem/clsHandleFileUser";
import { GlobalCurrentUser } from "../../infra/currentUser";
import { enMode } from "../ClientBankUseCase/clsBankClientUseCase";
import clsPersonUseCase from "../PersonUseCase/clsPersonUseCase";



export enum enPermission
{
   
        eAll = -1, pListClients = 1, pAddNewClient = 2, pDeleteClient = 4,
        pUpdateClients = 8, pFindClient = 16, pTranactions = 32, pManageUsers = 64,pUserLog=128
    
}





export default class clsUser extends clsPersonUseCase
{

            private _ModeUser:enMode = enMode.EmptyMode ;
            private _enPermission :enPermission = enPermission.eAll ;

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

            public  async _DeleteUser(user:clsUser):Promise<void>
            {

                await clsHandleFileUser._DeleteUserFromFile(user)

            }

            public static async _FindUserByUserName(userName:string):Promise<clsUser>
            {

                const listUser:clsUser[] = await clsHandleFileUser.loadUsersFromFileUser() ;
                          
                for(const user of listUser)
                {
                     if(user.getUserName === userName)
                     {
                         return user as clsUser ;
                     }
                }
                return new clsUser(enMode.EmptyMode,"","","","", "", "",-1) ;
            }

            public static async _FindUserByUserNameAndPassword(userName:string,password:string):Promise<clsUser>
            {

                const listUser:clsUser[] = await clsHandleFileUser.loadUsersFromFileUser() ;
                          
                for(const user of listUser)
                {
                     if(user.getUserName === userName && user.getPassword === password)
                     {
                         return user as clsUser ;
                     }
                }
                return new clsUser(enMode.EmptyMode,"","","","", "", "",-1) ;
            }


            public static async _updateUserFromFile(newUser:clsUser,oldUser : clsUser):Promise<void>
            {
              let listUsers :clsUser[]  =       await clsHandleFileUser.loadUsersFromFileUser()  ;
  
                                 await clsHandleFileUser._DeleteUserFromFile(oldUser)  ;
                                      await clsHandleFileUser.SaveUserToFile(newUser)  ;
  
            }



            public static async  isEmptyUser(userName:string,Password:string):Promise<boolean>
            {
                    
                let isValid :boolean = (await clsUser._FindUserByUserNameAndPassword(userName,Password)).getUserName != "" && (await clsUser._FindUserByUserNameAndPassword(userName,Password)).getPassword != "" ;
                  

               // console.log("object************************ \t " , isValid)  ;
                
                
                if(isValid)
                   {
                        return true ;
                   }

                return false ;
            }

            public  getEmptyUser():clsUser
            {
        
                return new clsUser(enMode.EmptyMode,"","","","", "", "",-1) ;
            }

        public    checkAccessPermission(permission: enPermission): boolean {

               //(( GlobalCurrentUser.CurrentUser.getPermission === enPermission.pUserLog) ===   ( enPermission.pUserLog  ===permission))
            

              // console.log("object************************ \t " , (( GlobalCurrentUser.CurrentUser.getPermission === enPermission.pUserLog) ===   ( enPermission.pUserLog  ===permission)) )  ;
                
                if ((GlobalCurrentUser.CurrentUser.getPermission & permission) === permission || ( ( enPermission.pUserLog  === permission)))
                {
                    return true ;
                }else
                    return false ;
              }

}