class Admin{
    private usuarios: Usuario[];
    private cuentas: Cuenta[];
    
    constructor (){
        this.usuarios = [];
        this.cuentas = []
    }

    private addUsuario(user: Usuario):void{
        this.usuarios.push(user);
    }

    public quitarUsuario(user: Usuario): void{
        let userAux: Usuario;
        let indexAux: number;
        for (let i=0; i < this.usuarios.length; i++){
            userAux = this.usuarios[i];
            if(userAux.get_nickName === user.get_nickName){
                for(indexAux = i; indexAux < this.usuarios.length-1;indexAux++){
                    this.usuarios[indexAux] = this.usuarios[indexAux+1];
                }
                this.usuarios.pop();
            }
        }
    }

    public addcuenta(newCuenta: Cuenta):void{
        this.cuentas.push(newCuenta);
        this.addUsuario(newCuenta.getUsuario());
    }

}

class Usuario{
    private nickName: string;
    private contrasena: string;
    
    constructor (nickname: string, contrasena:string){
        this.nickName = nickname;
        this.contrasena = contrasena
    }

    public get_nickName():string{
        return this.nickName;
    }

    public getContraseña():string{
        return this.contrasena;
    }

    public cambiarContraseña(password:string):void{
        this.contrasena = password;
    }

    // public login(cuenta: Cuenta){

    // }


}

class Cuenta{
    private user: Usuario;
    private password: string;

    constructor (nick:string, password: string){
        this.user = new Usuario(nick, password);
        this.password = password;
    }

    public getUsuario():Usuario{
        return this.user;
    }

    public setPassword(pass2: string):void{
        this.password = pass2;
    }

    public getPassword():string{
        return this.password;
    }
}

let admin:Admin = new Admin();
let miUser: Usuario = new Usuario("jorge","pass01");
let miCta: Cuenta = new Cuenta(miUser.get_nickName(),miUser.getContraseña());
admin.addcuenta(miCta);

console.log(admin);
console.log(miUser);
console.log(miCta);