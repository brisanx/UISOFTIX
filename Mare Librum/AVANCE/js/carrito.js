var carro = document.getElementById("carrito")
var elementos = document.getElementById("contador-elem")
var nelem = parseInt(elementos.innerHTML)
var nelemcar = document.getElementById("nelem")

function addLibro(libro){
    const miLibro = libro

    nelem++
    elementos.innerHTML=nelem
    nelemcar.innerHTML = "Hay "+nelem+" elementos en el carrito"

    turnGreen(libro)
    setTimeout(() => {
        returnNormal(libro)
    }, 1000);

    var newLibro = document.createElement("div")
    newLibro.className = "container"

    var newRow = document.createElement("div")
    newRow.className = "row"

    var newCol = document.createElement("div")
    newCol.className = "col-sm"

    var newImg = document.createElement("img")
    newImg.src = miLibro.querySelector('div').querySelector('img').src
    newImg.width = "110"
    newCol.appendChild(newImg)

    var newInfo = document.createElement("div")
    newInfo.className = "container col-sm"

    var newInfoRow1 = document.createElement("div")
    newInfoRow1.className="row"

    var newTitulo = document.createElement("h3")
    newTitulo.className="fs-5"
    newTitulo.innerHTML= miLibro.querySelector('div').querySelector('div').querySelector('h5').innerHTML
    newInfoRow1.append(newTitulo)
    newInfo.append(newInfoRow1)

    var newInfoRow2 = document.createElement("div")
    newInfoRow2.className="row"

    var newAutor = document.createElement("h5")
    newAutor.className="fs-6"
    newAutor.innerHTML= miLibro.querySelector('div').querySelector('div').querySelector('p').innerHTML
    newInfoRow2.append(newAutor)
    newInfo.append(newInfoRow2)

    newRow.append(newCol)
    newRow.append(newInfo)
    newLibro.append(newRow)

    var newRow2 = document.createElement("div")
    newRow2.className = "row mt-2"

    var newCol2 = document.createElement("div")
    newCol2.className = "col-sm"

    var eliminar = document.createElement("button")
    eliminar.type="button"
    eliminar.className = "btn btn-danger"
    eliminar.innerHTML = "Eliminar"
    newCol2.append(eliminar)
    eliminar.addEventListener("click", removeLibro, false)

    var newCol3 = document.createElement("div")
    newCol3.className = "col-sm"

    var newPrecio = document.createElement("h5")
    newPrecio.innerHTML= miLibro.querySelector('div').querySelector('div').querySelector('h4').innerHTML
    sumarPrecio(newPrecio.innerHTML)
    newCol3.append(newPrecio)

    newRow2.append(newCol2)
    newRow2.append(newCol3)
    newLibro.append(newRow2)
    newLibro.append(document.createElement("hr"))
    
    carro.querySelectorAll('div')[1].appendChild(newLibro)

    function removeLibro(){
        restarPrecio(newPrecio.innerHTML)
        newLibro.parentNode.removeChild(newLibro) 
        nelem--
        elementos.innerHTML=nelem  
        nelemcar.innerHTML = "Hay "+nelem+" elementos en el carrito"

    }
    
}

function turnGreen(libro){
    var miLibro = libro
    var boton = miLibro.querySelector('div').querySelectorAll('div')[1].querySelector('a')
    boton.className="btn btn-success"
    boton.innerHTML = "¡Añadido al carrito!"
}

function returnNormal(libro){
    var miLibro = libro
    var boton = miLibro.querySelector('div').querySelectorAll('div')[1].querySelector('a')
    boton.className="btn btn-dark"
    boton.innerHTML = "Añadir al carrito"
}

function sumarPrecio(precio){
    var pActualStr = document.getElementById("total").innerHTML
    pActualStr = pActualStr.slice(0, pActualStr.length - 1)
    var pActual = parseFloat(pActualStr.replace("," , "."))

    var pSumar = precio.slice(0, precio.length -1)

    var pFinal = parseFloat(pSumar.replace(",", "."))+pActual

    var pFinalStr = pFinal.toFixed(2).toString()
    pFinalStr = pFinalStr.replace(".", ",")+"€"

    document.getElementById("total").innerHTML = pFinalStr
}

function restarPrecio(precio){
    var pActualStr = document.getElementById("total").innerHTML
    pActualStr = pActualStr.slice(0, pActualStr.length - 1)
    var pActual = parseFloat(pActualStr.replace("," , "."))

    var pRestar = precio.slice(0, precio.length -1)
    pRestar =parseFloat(pRestar.replace(",", "."))
    console.log(pActual)
    console.log(pRestar)
    var pFinal = pActual - pRestar

    var pFinalStr = pFinal.toFixed(2).toString()
    pFinalStr = pFinalStr.replace(".", ",")+"€"

    document.getElementById("total").innerHTML = pFinalStr
}