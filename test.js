/**
 * Información general e introductoria.
 */
function info() {
  let cad =
    'Bienvenido al sistema de gestión de cuentas bancarias\nLa base de datos se encuentra pre-cargada por lo tanto puede empezar a realizar operaciones bancarias.'
  alert(cad)
}


/**
 * Muestra el menú de opciones del script principal.
 * 
 * @return {number} Opción validada.
 */
function menu() {
  let mensaje = '-----------------------------------------\n\t\t\tMenu de opciones\n1) Alta de clientes\n2) Baja de clientes\n3) Modificación de clientes\n4) Listar clientes\n5) Ordenar el listado de clientes según parametro a definir\n6) Filtrar cuentas\n7) Salir\n-----------------------------------------\nElija una opción: '
  return validarMayorQue(0, mensaje);
  }


/**
 * Elije un elemento del vector o arreglo.
 *
 * @param {Array} listado - Vector/arreglo/array.
 * @return {string|number} Un elemento aleatorio del arreglo/vector/array.
 */
function elegirAleatorioDe(listado) {
  let index = Math.floor(Math.random() * listado.length);
  return listado[index];
}


/**
 * Valida un número que sea mayor a un valor mínimo pasado como parámetro.
 *
 * @param {number} min - Valor mínimo con el cual se compara el numero a validar.
 * @param {string} mensaje - Mensaje salida de interfaz para el usuario.
 * @return {number} Número validado.
 */
function validarMayorQue(min, mensaje) {
  let op = parseInt(prompt(mensaje))
  while (op <= min) {
    alert('Error... se pidió mayor a' + min)
    op = parseInt(prompt(mensaje))
  }
  return op
}


/**
 * Elije un número aleatorio entre 2 valores pasados como parámetro.
 * 
 * @param {number} min - Valor mínimo del intervalo.
 * @param {number} max - Valor máximo del intervalo.
 * @return {number} Numero aleatorio.
 */
function numeroAleatorioEntre(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}


/**
 * Carga un vector/arreglo/array con objetos de datos aleatorios instanciados.
 *
 * @param {Array} vector - Vector/arreglo/array a procesar.
 */
function cargar(vector) {
  const baseDatosNombres = ['Carlos', 'Manuel', 'Javier', 'Esteban', 'Arturo', 'Marcos', 
  'Emilia', 'Ximena', 'Tamara', 'Oriana', 'Sergio', 'Nahuel', 'Ramiro',
  'Salomé', 'Dayana', 'Nahuel', 'Samuel', 'Evelyn', 'Brenda', 'Noelia', 'Martín', 'Daniel', 'Matías']
  
  const baseDatosApellidos = ['Abréu', 'Acuña', 'Canal', 'Godoy', 'Oliva', 'Salas', 'Busto', 'Calvo',
  'Bazán', 'Lemos', 'Leiva', 'Rivas', 'Rosas', 'Lagos', 'Arcos', 'Durán', 'Llano', 'Ojeda', 'Nieto', 'Casas']

  const n = 20

  for (let i=0; i<n; i++) {
    let nombre = elegirAleatorioDe(baseDatosNombres)
    let apellido = elegirAleatorioDe(baseDatosApellidos)
    let dni = numeroAleatorioEntre(20000000, 40000000)
    let saldo = numeroAleatorioEntre(50000, 90000)
    const obj = new Cuenta(nombre, apellido, dni, saldo)
    vector.push(obj)
  }
}


/**
 * Almacena los datos de un objeto instanciado en cadena de caracter.
 *
 * @param {object} objeto - Objeto a procesar.
 * @return {string} Variable de tipo cadena de caracter con los datos del objeto.
 */
function objToString(objeto) {
  let cad = `Nombre: ${objeto.nombre}  | Apellido: ${objeto.apellido} | DNI: ${objeto.dni.toString()} | Saldo: ${objeto.saldo.toString()} |`
  return cad
}


/**
 * Muestra un alert con el listado de datos de todos los objetos del vector/array/arreglo.
 *
 * @param {Array} vector - Vector/arreglo/array a procesar.
 */
function mostrar(vector) {
  const vectorString = vector.map((objeto) => objToString(objeto)).join('\n');
  alert(vectorString);
}


/**
 * Agrega un objeto instanciado de la clase Cuenta al vector de objetos.
 *
 * @param {Array} vector - Vector/arreglo/array a procesar.
 */
function altaDeCliente(vector) {
  let dni = validarMayorQue(0, 'Cargue el DNI del nuevo cliente (>0 y sin puntos ni comas por favor): ')
  if (vector.some(objeto => objeto.dni === dni)) {
    alert('El cliente ya existe en la base de datos... Puede elegir MODIFICARLO en la opción de menú')
  } else {
    let nombre = prompt('Cargue el nombre del nuevo cliente: ')
    let apellido = prompt('Cargue el apellido del nuevo cliente: ')
    let saldo = validarMayorQue(0, 'Cargue el saldo del nuevo cliente (>0 y sin puntos ni comas por favor): ')
    const obj = new Cuenta(nombre, apellido, dni, saldo)
    vector.push(obj)
  }
}


/**
 * Elimina un objeto instanciado de la clase Cuenta del vector de objetos en base a la propiedad DNI.
 *
 * @param {Array} vector - Vector/arreglo/array a procesar.
 */
function bajaDeCliente(vector) {
  let dni = validarMayorQue(0, 'Cargue el DNI del cliente a dar de baja (>0 y sin puntos ni comas por favor): ')
  let ind = vector.findIndex(objeto => objeto.dni === dni)
  if (ind != -1) {
    let resp = prompt(`Se encontró la cuenta del cliente:\n${objToString(vector[ind])}\n¿Está seguro de querer eliminarla (s/n)?`)
    if (resp.toLowerCase() === 's') {
      vector.splice(ind, 1)
      alert('La cuenta ha sido eliminada de la base de datos...')
    } else {
      alert('Operación cancelada...')
    }
  } else {
    alert('La cuenta del cliente no existe en la base de datos...')
  }
}


/**
 * Modifica los datos de un objeto instanciado de la clase Cuenta y las guarda en el vector.
 *
 * @param {Array} vector - Vector/arreglo/array a procesar.
 */
function modificacionDeCliente(vector) {
  let op = 0
  let seModifico = false
  let dni = validarMayorQue(0, 'Cargue el DNI del cliente a modificar (>0 y sin puntos ni comas por favor): ')
  let ind = vector.findIndex(objeto => objeto.dni === dni)
  if (ind != -1) {
    prompt(`Cuenta del cliente a modificar:\n${objToString(vector[ind])}\nPresione enter para continuar...`)
    do {
      mensaje = '1. Modificar nombre\n2. Modificar apellido\n3. Modificar saldo\n4. Terminar modificación\nIngrese una opción (>0 por favor): '
      op = validarMayorQue(0, mensaje)
      switch (op) {
        case 1:
          let nuevoNombre = prompt('Nuevo nombre: ')
          vector[ind].nombre = nuevoNombre
          seModifico = true
          break
        case 2:
          let nuevoApellido = prompt('Nuevo apellido: ')
          vector[ind].apellido = nuevoApellido
          seModifico = true
          break
        case 3:
          let nuevoSaldo = validarMayorQue(0, 'Nuevo saldo (>0 por favor): ')
          vector[ind].saldo = nuevoSaldo
          seModifico = true
          break
        case 4:
          alert('Operaciones finalizadas...')
          break
        default:
          alert('Opción incorrecta...')
          break
      }
    } while (op != 4)
    if (seModifico) {
      alert('Los datos de la cuenta se han actualizado...')
    } else {
      alert('No se realizaron modificaciones...')
    }
  } else {
    alert('La cuenta del cliente no existe en la base de datos...')
  }
}


/**
 * Pregunta al usuario que tipo de orden necesita ya sea ascendente o descendente.
 *
 * @return {boolean} Valor booleano que será utilizado por la función ordenarPor().
 */
function obtenerOrden() {
  let orden = 0
  do {
    orden = parseInt(prompt('Ingrese el tipo de orden en que desea ordenar - (1) para ascendente, (2) para descendente: '))
  } while (orden !== 1 && orden !== 2);
  return orden === 1
}


/**
 * Función reutilizable de ordenamiento, ya sea para ordenar cadena de caracteres o numeros.
 *
 * @param {string} propiedad - Proporciona la propiedad del objeto que será utilizada como parámetro para el ordenamiento.
 * @param {Array} vector - Vector/arreglo/array a procesar.
 * @param {boolean} [ascendente=true] - Indica el tipo de orden para el ordenamiento. Ascendente-Descendente.
 */
function ordenarPor(propiedad, vector, ascendente = true) {
  vector.sort(function(a, b) {
    let comparacion = 0
    if (a[propiedad] > b[propiedad]) {
      comparacion = 1
    } else if (a[propiedad] < b[propiedad]) {
      comparacion = -1
    }
    if (!ascendente) {
      comparacion *= -1
    }
    return comparacion
  })
}


/**
 * Permite elegir entre diferentes métodos de ordenamiento para el vector de objetos.
 * Incluye un menú de opciones para procesar los métodos.
 *
 * @param {Array} vector - Vector/arreglo/array a procesar.
 */
function ordenar(vector) {
  let tipoDeOrdenamiento
  let op = 0
  do {
    let mensaje = 'Seleccione el método de ordenamiento:\n1- Por nombre \n2- Por apellido\n3- Por dni\n4- Por saldo \n5- Terminar ordenamiento\nIngrese una opción (>0 por favor): '
    op = validarMayorQue(0, mensaje)
    
    switch (op) {
      case 1:
        tipoDeOrdenamiento = obtenerOrden()
        ordenarPor('nombre', vector, tipoDeOrdenamiento)
        alert('Se han ordenado los datos!')
        break
      case 2:
        tipoDeOrdenamiento = obtenerOrden()
        ordenarPor('apellido', vector, tipoDeOrdenamiento)
        alert('Se han ordenado los datos!')
        break
      case 3:
        tipoDeOrdenamiento = obtenerOrden()
        ordenarPor('dni', vector, tipoDeOrdenamiento)
        alert('Se han ordenado los datos!')
        break
      case 4:
        tipoDeOrdenamiento = obtenerOrden()
        ordenarPor('saldo', vector, tipoDeOrdenamiento)
        alert('Se han ordenado los datos!')
        break
      case 5:
        alert('Ordenamientos terminados...')
        break
      default:
        alert('Opción incorrecta...')
        break
    }
  } while (op != 5)
}


/**
 * Permite filtrar el vector/array/arreglo de objetos:
 * Primero de acuerdo a las propiedades elegidas por el usuario.
 * Segundo de acuerdo a casos predefinidos por el programador.
 *
 * @param {Array} vector - Vector/arreglo/array a procesar.
 */
function filtrar(vector) {
  let listaFiltrada = []
  let propiedad = prompt('Ingrese la caracteristica a filtrar (Nombre, Apellido, DNI, Saldo): ')
  propiedad = propiedad.toLowerCase()
  
  if (propiedad === 'nombre') {
    let letraBuscada = prompt('Ingrese la letra inicial del nombre para filtrar las cuentas: ')
    listaFiltrada = vector.filter(objeto => {
      let primeraLetra = objeto[propiedad].charAt(0)
      return primeraLetra.toLowerCase() === letraBuscada.toLowerCase()
    })
    
    if (listaFiltrada.length != 0) {
      alert('...Lista Filtrada')
      mostrar(listaFiltrada)
    } else {
      alert('No se encontraron elementos a filtrar...')
    }
  }

  if (propiedad === 'apellido') {
    let letraBuscada = prompt('Ingrese la letra inicial del apellido para filtrar las cuentas: ')
    listaFiltrada = vector.filter(objeto => {
      let primeraLetra = objeto[propiedad].charAt(0)
      return primeraLetra.toLowerCase() === letraBuscada.toLowerCase()
    })
    
    if (listaFiltrada.length != 0) {
      alert('...Lista Filtrada')
      mostrar(listaFiltrada)
    } else {
      alert('No se encontraron elementos a filtrar...')
    }
  }

  if (propiedad === 'dni') {
    let digitoBuscado = validarMayorQue(-1, 'Ingrese el último digito del DNI para filtrar las cuentas: ')
    listaFiltrada = vector.filter(objeto => {
      let ultimoDigito = parseInt(objeto[propiedad].toString().slice(-1))
      return ultimoDigito === digitoBuscado
    })

    if (listaFiltrada.length != 0) {
      alert('...Lista Filtrada')
      mostrar(listaFiltrada)
    } else {
      alert('No se encontraron elementos a filtrar...')
    }
  }

  if (propiedad === 'saldo') {
    let saldoMin = Number(prompt('Ingrese el salario minimo para filtrar las cuentas: '))
    listaFiltrada = vector.filter(objeto => objeto[propiedad] >= saldoMin)
  
    if (listaFiltrada.length != 0) {
      alert('...Lista Filtrada')
      mostrar(listaFiltrada)
    } else {
      alert('No se encontraron elementos a filtrar...')
    }
  }
}


/**
 * Script que contiene el programa principal.
 *
 */
function main() {
  info()
  const v = []
  let op = 0
  cargar(v)

  do {
    op = menu()
    switch (op) {
      case 1:
        altaDeCliente(v);
        break
      case 2:
        bajaDeCliente(v);
        break
      case 3:
        modificacionDeCliente(v);
        break
      case 4:
        mostrar(v);
        break
      case 5:
        ordenar(v);
        break
      case 6:
        filtrar(v);
        break
      case 7:
        alert('Programa terminado...\n...Que tenga una buena jornada');
        break
      default:
        alert('Opción incorrecta...');
    }
  } while (op != 7);
}

// Ejecutar el script principal
main()