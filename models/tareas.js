const Tarea = require ('./tarea');

class Tareas {
    // propiedad llamada listado
    _listado = {};
    // get para retornar un nuevo arreglo
    get listadoArr(){
        
        const listado = [];
        // funcion retorna todas las llaves que tenga ese objeto y crea un arreglo
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado [key];
            listado.push( tarea );
            //console.log(key);
        });

        return listado;
    }

    constructor () {
        this._listado= {};
    }

    borrarTarea( id = ''){
 
        if (this._listado[ id ]) {
            delete this._listado [ id ];
        } 
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado [ tarea.id ] = tarea;
        });
    }

    crearTareas ( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    listadoCompleto() {

        this.listadoArr.forEach( ( tarea, i ) => {

            const idx = `${ i + 1 }`.green;
            const { desc, completadoEn } = tarea ;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log (` ${ idx } ${ desc } :: ${ estado }`);

        });
        //1: en Verde
        //Completada: Verde
        //Pendiente: Rojo

        /*  1. tareaDeEjemplo1 :: Completada | Pendiente
            2. tareaDeEjemplo2 :: Completada | Pendiente
            3. tareaDeEjemplo3 :: Completada | Pendiente
            4. tareaDeEjemplo4 :: Completada | Pendiente */
    }

    listarPendientesCompleadas( completadas =  true ){
        
        console.log();
        let contador = 0
        this.listadoArr.forEach ( tarea => {

            const { desc, completadoEn } = tarea ;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            
            if ( completadas ) {
                //mostrar completadas
                if (completadoEn) {
                    contador+=1;
                    console.log (` ${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);  
                }
            } else {
                //mostrar las pendientes
                if ( !completadoEn ) {
                    contador+=1;
                    console.log (` ${ (contador + '.').red } ${ desc } :: ${ completadoEn }`);  
                }
            }
        });
    }

    toggleCompletadas( ids = []){

        ids.forEach( id =>{

            const tarea = this._listado[ id ];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes (tarea.id)){

                this._listado[tarea.id].completadoEn = null;

            }
        })
    }

}


    
module.exports = Tareas;


