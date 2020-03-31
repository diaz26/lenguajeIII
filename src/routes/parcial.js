const express = require('express')
const router = express.Router()



router.get('/triangulo', (req, res) => {
    res.render('parcial/triangulo', {layout: 'main' });

});
router.post('/triangulo', (req, res) => {
    const numero = Number(req.body.numero)
    let mitad;
    if (numero % 2 == 0 ) {
        mitad = numero / 2
    } else {
        mitad = (numero + 1) / 2

    }
    for (let i = 1; i <= numero; i++ ) {
        let text = '';
        let text2 = '';

        if (i <= mitad) {
            for (let k = 1; k <= i; k++) {
                text += 'x';
            }
    
            for (let l = 0; l < mitad-i; l++) {
                text2 += ' '
            }
        } else {
            let nn = numero - i +1 ;
            for (let k = 1; k <= nn; k++) {
                text += 'x';
            }
    
            for (let l = 0; l < mitad-nn; l++) {
                text2 += ' '
            }
        }
        console.log(text2 + text);
        
    }

    res.render('parcial/triangulo', {layout: 'main' });
    
});

router.get('/tabla', (req, res) => {
    res.render('parcial/tabla',  {layout: 'main' });

});
router.post('/tabla', (req, res) => {

    const desde = Number (req.body.desde);
    const hasta = Number (req.body.hasta);
    const tabla = Number (req.body.tabla);
    const salto = Number (req.body.salto);

    for (let i = desde; i <= hasta; i += salto) {
    
        for (let j = 1 ; j <= tabla; j++) {
            console.log(`${ i } x ${ j } = ${ i * j }`)
        }
    }

    res.render('parcial/tabla',  {layout: 'main' });
    
});

module.exports = router;

/** 
 * 
 * En el capitulo uno habla de las historia de la programación y de los primeros programadores
 * Cada uno de estos grandes "artistas" nos brindan una definición de lo que para ellos es código limpio
 * Una de las frases que más me marcó decia "el código limpio es aquel que haces de corazón"
 * 
 * También nos hablan de las consecuencias de nuestro código y su relación con la empresa
 * 
 * Algunas empresas quieren un trabajo rápido, sin importar la calidad del código, algo que los desarrolladores no deberiamos aceptar
 * pues en un futuro no muy lejano este fallará, bien sea por algún caso que omitimos o porque el proceso de las funciones sea demasiado lento
 * 
 * Es conveniente hacer código limpio desde su primer desarrollo, para que este no tenga que pasar por correcciones desde otras manos,
 * ya que la persona encargada de hacer correcciones posiblemente encuentre mas casos de prueba y esto implica cambios en los requerimientos, 
 * en la documentación, dinero y tiempo perdido
 * 
 */