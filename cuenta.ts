import * as rs from 'readline-sync';
import * as fs from 'fs';
import * as bcr from 'bcryptjs';

class Admin{
    private usuarios: string[];
    private cuentas: Cuenta[];
    
    constructor (){
        this.usuarios = [];
        this.cargarUsuarios();
        this.cuentas = []
    }

    private addUsuario(user: string):void{
        this.usuarios.push(user);
    }

    public quitarUsuario(user: Usuario): void{
        let userAux: string;
        let indexAux: number;
        for (let i=0; i < this.usuarios.length; i++){
            userAux = this.usuarios[i];
            if(userAux === user.get_nickName()){
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

    private cargarUsuarios():void{
        let texto: string = fs.readFileSync('usuarios.txt','utf-8');
        this.usuarios = texto.split('\r\n');
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

    public login(cuenta: Cuenta){
        let user: string;
        let pass: string;
        user = rs.question("ingresar usuario: ");
        pass = rs.question("ingresar la contrasena: ");
        if (user == cuenta.getUsuario() && bcr.compare(pass,bcr.hashSync(cuenta.getPassword()))){
            console.log('ingreso a la cuenta...');
        }
        else{
            console.log('nombre de usuario y/o contraseña incorrectos');
        }

    }

}

class Cuenta{
    private user: Usuario;
    private password: string;


    constructor (nick:string, password: string){
        this.user = new Usuario(nick, bcr.hashSync(password));
        this.password = bcr.hashSync(password);
       
    }

    public getUsuario():string{
        return this.user.get_nickName();
    }

    public setPassword():void{
        let passAux:string, pass2:string;
        passAux = rs.question("ingresar la actual contrasenia: ");
        pass2 = rs.question("ingresar la nueva contrasenia: ")
        if (passAux == this.password){
            this.password = pass2;
            bcr.hashSync(pass2);
        } 
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
miCta.setPassword();
console.log(miCta);
miUser.login(miCta);

// admin.quitarUsuario(miUser);
// console.log(admin);

