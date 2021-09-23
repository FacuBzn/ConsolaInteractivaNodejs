require('colors');

const   {   guardarDB,
            leerDB

        } = require('./helpers/guardarArchivo');

const   {   inquirerMenu, 
            pause,
            leerInput,  
            listadoTareasBorrar,
            confirmar,
            mostrarListadoCheckList
        } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');



const main = async  ()=>{
   /*  console.log('hola mundo'); */
    let opt = '';
    const tareas = new Tareas ();

    const tareasDB = leerDB ();

    if (tareasDB) { // cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        //imprime un menu y retorna una opcion
        opt = await inquirerMenu();
        
        switch (opt) {
                case '1':
                    // crea una opcion
                    const desc = await leerInput(' Descripcion: ');
                    tareas.crearTareas( desc );
                break;

                case '2':
                    tareas.listadoCompleto();
                break;
                case '3':
                    //listar las tareas completadas
                    tareas.listarPendientesCompleadas(true);
                break;
                case '4':
                    //listar las tareas pendientes
                    tareas.listarPendientesCompleadas(false);
                break;
                case '5':
                    //completado o pendiente
                    const ids = await mostrarListadoCheckList( tareas.listadoArr );
                    tareas.toggleCompletadas(ids);
                    
                break;
                case '6':
                    //borrar tareas
                    const id = await listadoTareasBorrar( tareas.listadoArr );
                    if (id !== '0') {
                        const ok = await confirmar ('¿Estas seguro que deseas borrar ?');
                        if ( ok ) {
                            tareas.borrarTarea( id );
                            console.log(' Tareas borrada de forma exitosa ');
                        }   
                    }
                break;
        }

        guardarDB( tareas.listadoArr );

        await pause();

    } while (opt !== '0');
   
}

main();





