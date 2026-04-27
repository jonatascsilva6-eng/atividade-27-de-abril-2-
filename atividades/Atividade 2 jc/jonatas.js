var dado = [1,2,3,4,5,6,7,8,9,10]
var par = []
var impar = []

par.push(2,4,6,8)
impar.push(1,3,5,7,9)

dado.map(e=>{
    if(e%2 ==0) {
        par.push(e)
    }else{
        impar.push(e)
    }
    })

    var tarefas=[
        {"id":0, nome: "estudarJavascript", concluido: true},
        {"id":1,nome: "Treinar Logica", concluido: false}, 
        { "id":2, nome: "treinar frontend", concluido: false},
    ]
