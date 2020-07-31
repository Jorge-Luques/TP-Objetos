import * as rs from 'readline-sync';
import * as fs from 'fs';
import * as bcr from 'bcryptjs';

//------------------------ CLASE ADMIN -----------------------------------
class Admin{
    private usuarios: string[];
    private cuentas: Cuenta[];
    
    constructor (){
        this.usuarios = [];
        this.cargarUsuarios();
        this.cuentas = [];
        this.cargarCuentas();
    }

    private addUsuario(user: string):void{
        this.usuarios.push(user);
    }

    /**
     * con este metodo se puede eliminar un usuario que tiene una cuenta creada
     * buscando su nickname para la eliminación, borrando también su cuenta.
     * Se elimina del arreglo usuarios[] y del arreglo cuentas[]
     * @param user 
     */
    public quitarUsuario(user: string): void{
        let userAux: string;
        let indexAux: number;
        for (let i=0; i < this.usuarios.length; i++){
            userAux = this.usuarios[i];
            if(userAux === user){
                for(indexAux = i; indexAux < this.usuarios.length-1;indexAux++){
                    this.usuarios[indexAux] = this.usuarios[indexAux+1];
                    this.cuentas[indexAux] = this.cuentas[indexAux+1];
                }
                this.usuarios.pop();
                this.cuentas.pop();
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

    /**
     * se utiliza para crear una cuenta por cada usuario que ya se cargó desde archivo 
     * y guardarla en el arreglo de objetos Cuenta con una contraseña designada al azar
     * (se diferencia de el metodo addCuenta(newCuenta: Cuenta) porque no parte desde 
     * una instancia de Cuenta, sino desde usuarios cargados sin su cuenta creada)
     */
    private cargarCuentas():void{
        let cta:Cuenta;
        let i:number;
        let pwd: string;
        for (i=0; i < this.usuarios.length; i++){
            pwd = Math.random().toString(36).substring(2); //a cada usuario se le carga una contraseña al azar
            // console.log("password: ",pwd);
            cta = new Cuenta(this.usuarios[i], pwd);
            this.cuentas.push(cta);
        }
    }

    /**
     * se utiliza para mostrar un listado de todas las cuentas administradas
     */
    public verCtas(){
        let i:number;
        let cta: Cuenta;
        console.log(" HAY ",this.cuentas.length," CUENTAS");
        for (i = 0; i < this.cuentas.length; i++){
            cta = this.cuentas[i];
            console.log(i,") Usuario: ",cta.getUsuario()," pwd: ",cta.getPassword());
        }
    }

}

//------------------------ CLASE USUARIO -----------------------------------
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

    public login(cuenta: Cuenta):void{
        let user: string;
        let pass: string;
        user = rs.question("ingresar usuario: ");
        pass = rs.question("ingresar la contrasena: ");
        if (user == cuenta.getUsuario() && bcr.compare(pass,bcr.hashSync(cuenta.getPassword()))){
            console.log('ingreso a la cuenta...');
        }
        else{
            console.log('nombre de usuario y/o contrasena incorrectos');
        }
    }

}

//------------------------ CLASE CUENTA -----------------------------------
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
        pass2 = rs.question("ingresar la nueva contrasenia: ");
        if (bcr.compare(passAux,bcr.hashSync(this.getPassword()))){
            this.password = bcr.hashSync(pass2);
            console.log("contraseña cambiada con exito");
        }
        else{
            console.log("NO se ha podido cambiar la contraseña");
        }

    }

    public getPassword():string{
            return this.password;
    }
}

//------------------------ (MAIN) -----------------------------------
let admin:Admin = new Admin();
let miUser: Usuario = new Usuario("jorge","pass01");
let miCta: Cuenta = new Cuenta(miUser.get_nickName(),miUser.getContraseña());

admin.addcuenta(miCta);

console.log(admin);
console.log(miUser);
console.log(miCta);
console.log("PROBANDO INGRESAR A LA CUENTA")
miUser.login(miCta);
console.log("PROBANDO CAMBIAR CONTRASEÑA");
miCta.setPassword();
console.log(miCta);
console.log("PROBANDO ELIMINAR USUARIO")
admin.quitarUsuario('soyUser2020');
console.log(admin);
admin.verCtas();