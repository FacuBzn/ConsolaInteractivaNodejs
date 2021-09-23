const inquirer = require ('inquirer');
const { pausa } = require('./mensajes');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿ que desea hacer ?',
        choices: [
            {
                value: '1',
                name: `${' 1. '.green} Crear Tareas`
            },
            {
                value: '2',
                name: `${' 2. '.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${' 3. '.green} Listar Tareas completadas`
            },
            {
                value: '4',
                name: `${' 4. '.green} Listar Tareas pendientes`
            },
            {
                value: '5',
                name: `${' 5. '.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${' 6. '.green} Borrar Tareas`
            },
            {
                value: '0',
                name: `${' 0. '.green} Salir \n`
            }
        ]
    }
];


const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.rainbow);
    console.log(' seleccione  una opcion '.blue);
    console.log('=========================\n'.rainbow); 

    const {opcion } = await inquirer.prompt(preguntas);
    
    return opcion; 
}

const pause = async () => {
    
    const question = [
        {
            type: 'input',
            name: 'ENTER',
            message: `Presione ${ 'ENTER'.red } para continuar `
        }
    ];
    console.log('\n');
    await inquirer.prompt(question); 
}

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return ' Por favor ingrese un valor ';
                }
                return true;
            }
        }
    ];

    const { desc } =  await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) =>{
    const choices = tareas.map( (tarea , i ) => {
        const  idx = `${i + 1}`.green;
        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value:'0',
        name: '0'.green + 'cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt( preguntas );
    return id;
}

const confirmar = async ( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }

    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
}


const mostrarListadoCheckList = async( tareas = [] ) =>{

    const choices = tareas.map( (tarea , i ) => {
        const  idx = `${i + 1}`.green;
        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt( pregunta );
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}



