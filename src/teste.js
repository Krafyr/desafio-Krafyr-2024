import { Dunno } from "./dunno.js";

class Teste {    



    informacoesEspecie(especie) {
        const especies = {
            LEAO: { dieta: "carnivoro", tamanho: 3, biomasPossiveis: ["savana"] },
            LEOPARDO: { dieta: "carnivoro", tamanho: 2, biomasPossiveis: ["savana"] },
            CROCODILO: { dieta: "carnivoro", tamanho: 3, biomasPossiveis: ["rio"] },
            MACACO: { dieta: "onivoro", tamanho: 1, biomasPossiveis: ["savana", "floresta"] },
            GAZELA: { dieta: "herbivoro", tamanho: 3, biomasPossiveis: ["savana"] },
            HIPOPOTAMO: { dieta: "herbivoro", tamanho: 3, biomasPossiveis: ["savana", "rio"] }
        };

        return especies[especie] || null;
    }


}

let variavel = [1, 2, 3];
let variavel2 = [4, 5, 6];
variavel.push(...Array(3).fill("teste"));
console.log(variavel);



