
function incrustaElemento (nodo) {
    nodo.innerHTML = `
                    <button type="button" href="#" name="numero" class="boton boton-info"></button>
                    `;
    return nodo;
}

function generaTablero ($j, $fila, $control) {
    const tablero = document.querySelector ('#tablero');

    if ($control === undefined) {
        const nuevo = document.createElement ('td');
        var elemento = incrustaElemento (nuevo);

        const fila1 = document.createElement ('tr');

        fila1.appendChild (elemento);
        tablero.appendChild (fila1);

        var con = 1;
        $j++;
        generaTablero ($j, fila1, con);
    }
    else {
            if ((($j+1) % 3 === 0)) {
                    
                const nuevo = document.createElement ('td');
                var elemento = incrustaElemento (nuevo);

                $fila.appendChild (elemento);

                tablero.appendChild ($fila);
                var aux = $j + 1;
                if ($j < 8) {
                    generaTablero (aux, $fila, undefined);
                }
            }        
            else {
                const nuevo = document.createElement ('td');
                var aux = $j + 1;
                var elemento = incrustaElemento (nuevo);

                $fila.appendChild (elemento);
                tablero.appendChild ($fila);
                var con = 1;
                generaTablero (aux, $fila, con);
            }
    }
}

function comprueba (btns, turno) { // Función que comprueba si un jugador tiene tres en raya
    var tres = false;
    if (turno === 1) {
        var color = `boton boton-danger`;
    }
    else var color = `boton boton-primary`;

    for (var i = 0; i < btns.length; i++) {
        // Casilla superior izquierda
        if ((btns [0].className === color) && (btns [1].className === color) && (btns [2].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }
        if ((btns [0].className === color) && (btns [3].className === color) && (btns [6].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }
        if ((btns [0].className === color) && (btns [4].className === color) && (btns [8].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }

        // Casilla superior central
        if ((btns [1].className === color) && (btns [4].className === color) && (btns [7].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }
        
        // Casilla superior derecha
        if ((btns [2].className === color) && (btns [5].className === color) && (btns [8].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }
        if ((btns [2].className === color) && (btns [4].className === color) && (btns [6].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }

        // Casilla central izquierda
        if ((btns [3].className === color) && (btns [4].className === color) && (btns [5].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }
        
        // Casilla inferior izquierda
        if ((btns [6].className === color) && (btns [7].className === color) && (btns [8].className === color)) {   // Tres en raya
            console.log ('El jugador ' + turno + ' ha hecho tres en raya ');
            tres = true;
            return tres;
        }
    }
    return tres;
}

function FatalError(){
    Error.apply(this, arguments); this.name = "FatalError";
}

FatalError.prototype = Object.create(Error.prototype);

function partida () {
    console.clear ();

    var turno = 0 || 1 || 2;

    generaTablero (0, undefined, undefined);

    var fichas = [0, 0];

    turno = 1;

    const lista = document.querySelector ('#tablero');

    lista.addEventListener ('click', (e) => {
        e.preventDefault ();
        var btns = document.getElementsByClassName ("boton");
        
        
        for (var i = 0; i < btns.length; i++) {
                 
            btns [i].onclick = function () {
                if (turno !== 0) {
                    if (turno === 1) {
                        if (fichas [0] < 3) {               
                            if ((this.className === `boton boton-info`)) {
                                this.className = `boton boton-danger`;
                                fichas [0]++;
                                if (comprueba (btns, turno) === true) {
                                    console.log ('ENHORABUENA');
                                    turno = 0;
                                }
                                else {
                                    turno = 2;
                                }
                            }
                        }
                        else if (fichas [0] === 3) {
                            
                            if ((this.className === `boton boton-danger`)) {
                                this.className = `boton boton-info`;
                                turno = 1;
                                fichas [0]--;
                            }
                        }
                    }
                    else {
                        if (fichas [1] < 3) {               
                            if ((this.className === `boton boton-info`)) {
                                this.className = `boton boton-primary`;
                                fichas [1]++;
                                if (comprueba (btns, turno) === true) {
                                    console.log ('ENHORABUENA');
                                    turno = 0;
                                }
                                else {
                                    turno = 1;
                                }
                            }
                        }
                        else if (fichas [1] === 3) {
                            if ((this.className === `boton boton-primary`)) {
                                this.className = `boton boton-info`;
                                turno = 2;
                                fichas [1]--;
                            }
                        }
                    }
                }
            }
        }
    },true);
}