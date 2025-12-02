
export default class clsLogUser {


       private cureentDateTime :string  ="" ;
         private userName  :string = "" ;
            private password  :string = "" ;
            private endPermission  :number = 0 ;
            private _logUser :clsLogUser  | null = null  ;

//date time  userName and password  and end permission GlobalCurrentUser

         constructor(cureentDateTime:string,userName:string,password:string,endPermission:number)
         {
               this.cureentDateTime  = cureentDateTime  ;
                 this.userName  = userName  ;
                   this.password  = password  ;
                   this.endPermission  = endPermission  ;
         }


         public get getCureentUserLog():clsLogUser
         {
                return this  ;
         }  

         public set setCureentUserLog(value:clsLogUser)
         {
                 this._logUser  = value  ;
         }
}