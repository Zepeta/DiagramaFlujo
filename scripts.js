contadorImg = 0;
dato = "";   
condicion = "";
verdadero = "";
verdadero2 = ""
falso = "";
inicializacion = "";
var listaVariables = [];
var mostrarVar  = false
function eliminar(){
    alert("Seleccione el elemento que desee borrar")
    var lienzo = document.getElementById("lienzo")
    lienzo.setAttribute("onclick","removerElemento(event)")  
}
function removerElemento(event){
    var elemento = event.target;
    if(elemento.nodeName == "IMG"){
        if(confirm("¿Desea borrar este elemento")){   
            //var idImg = elemento.id.split(/_/)[1];
            var idImg = elemento.id
            var cod = document.getElementById("ID-"+idImg)
            console.log(idImg);
            if(elemento.nextSibling == null){
                cod.remove();
                elemento.remove();
            }else{
                cod.remove();
                elemento.nextSibling.nextSibling.remove();
                elemento.remove(); 
            }
        }
    } 
    document.getElementById("lienzo").removeAttribute("onclick")
} 
function establecerTexto(id,idImagen){
    switch(id){
        case "DecVar":
            dato = prompt("Ingrese la variable a declarar con su tipo de dato")
            listaVariables.push(dato)
        break;
        case "entrada":
            mostrarVar = confirm("¿Va a imprimir el valor de alguna variable. Presione cancelar si no")
            if(mostrarVar) dato = prompt("Ingrese el texto. El nombre y tipo de la variable a mostrar hasta el final de la cadena")
            else dato = prompt("Ingrese el texto a mostrar")
        break;
        case "salida":
            dato = prompt("Ingrese la variable a escanear, con su tipo de dato")
        break;
        case "sentencia":
            dato = prompt("Ingrese la sentencia para el programa")
        break;
        case "condIF":
            condicion = prompt("Ingrese la condición para el if");
            verdadero = prompt("Ingrese la intrucción en caso verdadero");
            falso = prompt("Ingrese la intrucción en caso falso");
        break;
        case "sentRept":
            inicializacion = prompt("Ingrese la variable a inicializar")
            condicion = prompt("Ingrese la condición");
            verdadero = prompt("Ingrese la primera intrucción en caso verdadero");
            verdadero2 = prompt("Ingrese la segunda intrucción en caso verdadero");
            falso = prompt("Ingrese la intrucción en caso falso");
        break;
        default:
            alert("Este es un valor inválido")
        break;
    }
    if(dato==null) dato=""
    var imagen = document.getElementById(idImagen);
    var canvas = document.getElementById("canvas");
    if(id=="condIF"){ 
        try {
            var ctx = canvas.getContext("2d")
            canvas.setAttribute("width",imagen.getAttribute("width"))
            canvas.setAttribute("height",imagen.getAttribute("height"))
            ctx.font = "17px Arial"
            ctx.drawImage(imagen,0,0,imagen.getAttribute("width"),imagen.getAttribute("height"))
            ctx.fillText(condicion,28,50)
            ctx.fillText(verdadero,50,175)
            ctx.fillText(falso,200,160)        
            return imagen.src = canvas.toDataURL('image/png') 
        } catch (error) {
            return imagen.src
        }   
        
    }
    else if(id=="sentRept"){
        try {
            var ctx = canvas.getContext("2d")
            canvas.setAttribute("width",imagen.getAttribute("width"))
            canvas.setAttribute("height",imagen.getAttribute("height"))
            ctx.font = "17px Arial"
            ctx.drawImage(imagen,0,0,imagen.getAttribute("width"),imagen.getAttribute("height"))
            ctx.fillText(inicializacion,150, 45)
            ctx.fillText(condicion,150,160)
            ctx.fillText(verdadero,152,290)
            ctx.fillText(verdadero2,150,400)
            ctx.fillText(falso,250,520)        
            return imagen.src = canvas.toDataURL("image/png")
        } catch (error) {
            return imagen.src
        }
       
    }else{
        try {
            var ctx = canvas.getContext("2d");
            canvas.setAttribute("width","160")
            canvas.setAttribute("height","90");
            ctx.textAlign = "center"
            ctx.font = "13px Arial" 
            ctx.drawImage(imagen,0,0,imagen.getAttribute("width"),imagen.getAttribute("height"))
            ctx.fillText(dato,canvas.getAttribute("width")/2,canvas.getAttribute("height")/2)
            return imagen.src = canvas.toDataURL("image/png");
        } catch (error) {
            return imagen.src
        }
        
    }
}
function onDragStart(event){
    event.dataTransfer.setData('text/plain',event.target.id);
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
    event.preventDefault(); 
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    
    var flecha = document.createElement("img");
    flecha.setAttribute("src","Simbolos/flecha.png");
    flecha.setAttribute("width","30");
    flecha.setAttribute("height","50");
    flecha.setAttribute("draggable","false")

    if(id=="condIF"){
        var condicionIF = document.importNode(draggableElement,true);
        condicionIF.setAttribute("width","290");
        condicionIF.setAttribute("height","280"); 
        condicionIF.setAttribute("id","id_"+contadorImg++)
        dropzone.appendChild(condicionIF)
        condicionIF.setAttribute("src",establecerTexto(id,condicionIF.getAttribute("id")))
        condicionIF.setAttribute("draggable","false")
        condicionIF.setAttribute("name",id)
        dropzone.appendChild(condicionIF)
        dropzone.appendChild(document.createElement("br"));
        dropzone.appendChild(flecha);
        dropzone.appendChild(document.createElement("br"));
        construirCodigo(dato, id,condicion, verdadero, falso )
    }else if(id==="sentRept"){
        var sentRept = document.importNode(draggableElement,true)
        sentRept.setAttribute("width","350")
        sentRept.setAttribute("height","550")
        sentRept.setAttribute("id","id_"+contadorImg++)
        dropzone.appendChild(sentRept)
        sentRept.setAttribute("src",establecerTexto(id,sentRept.getAttribute('id')))
        sentRept.setAttribute("draggable","false")
        sentRept.setAttribute("name",id)
        dropzone.appendChild(sentRept)
        dropzone.appendChild(document.createElement("br"))
        dropzone.appendChild(flecha)
        dropzone.appendChild(document.createElement("br"))    
        construirCodigo(dato, id,condicion, verdadero, falso )    
    }else if(id=="inicio"){
        var nuevoInicio = draggableElement
        nuevoInicio.setAttribute("id","id_"+contadorImg++);
        nuevoInicio.setAttribute("width","140");
        nuevoInicio.setAttribute("height","70");
        nuevoInicio.setAttribute("draggable","false")
        dropzone.appendChild(nuevoInicio);
        dropzone.appendChild(document.createElement("br"));
        dropzone.appendChild(flecha);
        dropzone.appendChild(document.createElement("br"));
        construirCodigo(dato,id,condicion,verdadero,falso)
    } 
    else if(id=="fin"){
        var nuevoFin = draggableElement//document.importNode(draggableElement,true);
        nuevoFin.setAttribute("width","140");
        nuevoFin.setAttribute("height","70");
        nuevoFin.setAttribute("id","id_"+contadorImg++)
        dropzone.appendChild(nuevoFin);        
        draggableElement.setAttribute("draggable","false");
        construirCodigo(dato,id,condicion,verdadero,falso)
    }
    else{  
        var nuevoNodo = document.importNode(draggableElement,true);
        nuevoNodo.setAttribute("id","id_"+contadorImg++);
        nuevoNodo.setAttribute("width","160");
        nuevoNodo.setAttribute("height","90");
        nuevoNodo.setAttribute("name",id)
        dropzone.appendChild(nuevoNodo)
        nuevoNodo.setAttribute("src", establecerTexto(id,nuevoNodo.getAttribute("id")))
        nuevoNodo.setAttribute("draggable","false")
        dropzone.appendChild(nuevoNodo)
        dropzone.appendChild(document.createElement("br"));  
        dropzone.appendChild(flecha);
        dropzone.appendChild(document.createElement("br"));
        construirCodigo(dato, id,condicion, verdadero, falso )
    } 
    event.dataTransfer.clearData();
    
}

function construirCodigo(dato, id,condicion, verdadero, falso){    
    var panelCod = document.getElementById("panelCod")
    switch(id){
        case "inicio":
            panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">void main(){</div>"
        break;
        case "fin":
            panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">}</div>"    
        break;
        case "DecVar":
            panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">"+dato+";</div>"
        break;
        case "entrada":
            var listaPartida = []
            if(mostrarVar && listaVariables.length != 0){  
                listaVariables.forEach(elemento=> elemento.split(/ /).forEach(elemPart => listaPartida.push(elemPart)) )
                for(i in listaPartida){
                    var regex =  new RegExp(listaPartida[i]+"$")
                    if(regex.test(dato)){
                        var nuevaSentencia = dato.replace(regex,"")
                        panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">printf(\""+nuevaSentencia+"\","+listaPartida[i]+");</div>";        
                        break;                
                    }                
                }
                //alert("Su variable no esta declarada")
            }else{
                panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">printf(\""+dato+"\");</div>";
            }
        break;
        case "salida":
            var datoPartido  = []
            datoPartido = dato.split(/\s/);
            switch(datoPartido[0]){
                case "char":
                    panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">scanf(\"%s\","+"&"+datoPartido[1]+");</div>";
                break;
                case "int":
                    panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">scanf(\"%d\","+"&"+datoPartido[1]+");</div>";
                break;
                case "float":
                    panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">scanf(\"%f\","+"&"+datoPartido[1]+");</div>";
                break;
                default:
                    alert("Dato no valido, complete la informacion")
                break;
            }
        break;
        case "sentencia":
            panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">"+dato+";</div>"
        break;
        case "condIF":
            panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">"+
                                "if("+condicion+"){ <br>"+
                                "&nbsp;&nbsp;&nbsp;"+verdadero+"; <br>"+
                                "}else{<br>"+
                                "&nbsp;&nbsp;&nbsp;"+falso+"; <br>"+
                                "} </div>"
        break;
        case "sentRept":
            var inicPart = inicializacion.split(/\s/) 
            panelCod.innerHTML += "<div id=ID-"+(document.getElementById("id_"+(contadorImg-1)).getAttribute("id"))+">"+
                                "for("+inicializacion+";"+condicion+";"+inicPart[1]+"++){ <br>"+
                                "&nbsp;&nbsp;&nbsp;"+verdadero+"; <br>"+
                                "&nbsp;&nbsp;&nbsp;"+verdadero2+"; <br>"+
                                "}<br>"+
                                ""+falso+";"+
                                "</div>"
        break;
        default:
            alert("Este es un valor inválido")
        break;
    }
}

function guardar(){
    var nomDoc = document.createTextNode(prompt("Nombre del documento"))
    var divTitulo = document.getElementById("tituloDoc")    
    divTitulo.replaceChild(nomDoc,divTitulo.childNodes[0])
    var xmlSerializer = new XMLSerializer()
    var documento = document.getElementById("descargable")
    var docXML = xmlSerializer.serializeToString(documento)
    var blob = new Blob([docXML], {type: 'text/xml'})    
    var url = window.URL.createObjectURL(blob)
    var a = document.createElement('a');
    a.setAttribute("href",url)
    a.setAttribute("download",nomDoc.textContent+".xml")
    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);    
}
function cargar(){
    var inputFile = document.createElement("input")
    inputFile.setAttribute("type","file")
    inputFile.setAttribute("accept","text/xml")
    document.body.appendChild(inputFile)
    inputFile.click();
    inputFile.addEventListener('change',function(){
        const archivo = this.files[0]
        var fr = new FileReader();
        fr.onload = function(){
            document.getElementById("descargable").innerHTML = fr.result;            
        }
        fr.readAsText(archivo)
    },false)
    document.body.removeChild(inputFile)
}
function modificar(){
    alert("Seleccione el elemento que desee modificar su contenido")
    document.getElementById("lienzo").setAttribute("onclick","modificarElemento(event)")
}
function modificarElemento(event){
    var elemento = event.target
    if(elemento.nodeName == "IMG"){
        elemento.setAttribute("src","Simbolos/"+elemento.name+".png")
        establecerTexto(elemento.name,elemento.id)
        modificarCod(elemento.id,elemento.name)
        contadorImg = contadorImg-1
        document.getElementById("lienzo").removeAttribute("onclick")
    }
}
function modificarCod(id,nombreImg){
    console.log(verdadero,verdadero2);
    var nId = "ID-"+id;
    var cod = document.getElementById(nId)
    switch(nombreImg){
        case "DecVar":
            cod.textContent = dato+";"
        break;
        case "entrada":
            var listaPartida = []
            if(mostrarVar && listaVariables.length != 0){  
                listaVariables.forEach(elemento=> elemento.split(/ /).forEach(elemPart => listaPartida.push(elemPart)) )
                for(i in listaPartida){
                    var regex =  new RegExp(listaPartida[i]+"$")
                    if(regex.test(dato)){
                        var nuevaSentencia = dato.replace(regex,"")
                        cod.textContent = "printf(\""+nuevaSentencia+"\","+listaPartida[i]+");"                        
                        break;                
                    }                
                }
                alert("Su variable no esta declarada")
            }else{
                cod.textContent = "printf(\""+dato+"\");"
            }
        break;
        case "salida":
            var datoPartido  = []
            datoPartido = dato.split(/\s/);
            switch(datoPartido[0]){
                case "char":
                    cod.textContent = "scanf(\"%s\","+"&"+datoPartido[1]+");"
                break;
                case "int":
                    cod.textContent = "scanf(\"%d\","+"&"+datoPartido[1]+");"
                break;
                case "float":
                    cod.textContent = "scanf(\"%f\","+"&"+datoPartido[1]+");"                    
                break;
                default:
                    alert("Dato no valido, complete la informacion")
                break;
            }
        break;
        case "sentencia":
            cod.textContent = dato+";"
        break;
        case "condIF":
            cod.setAttribute("style",'white-space: pre;')
            cod.textContent = "if("+condicion+"){ \r\n"
            cod.textContent += "    "+verdadero+"; \r\n"
            cod.textContent += "}else{ \r\n"
            cod.textContent += "    "+falso+"; \r\n"                            
            cod.textContent += "}" 
        break;
        case "sentRept":
            cod.setAttribute("style",'white-space: pre;')
            var inicPart = inicializacion.split(/\s/) 
            cod.textContent = "for("+inicializacion+";"+condicion+";"+inicPart[1]+"++){ \r\n"
            cod.textContent += "    "+verdadero+"; \r\n"
            cod.textContent += "    "+verdadero2+"; \r\n"
            cod.textContent += "}\r\n"
            cod.textContent += ""+falso+"; \r\n"                            
        break;
        default:
            alert("Este es un valor inválido")
        break;
    }
}