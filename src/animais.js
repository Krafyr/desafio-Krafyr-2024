class Animais {    

    informacoesEspecie(especie) {
        const especies = {
            LEAO: { dieta: "carnivoro", tamanho: 3, biomasPossiveis: ["savana"] },
            LEOPARDO: { dieta: "carnivoro", tamanho: 2, biomasPossiveis: ["savana"] },
            CROCODILO: { dieta: "carnivoro", tamanho: 3, biomasPossiveis: ["rio"] },
            MACACO: { dieta: "herbivoro", tamanho: 1, biomasPossiveis: ["savana", "floresta"] },
            GAZELA: { dieta: "herbivoro", tamanho: 3, biomasPossiveis: ["savana"] },
            HIPOPOTAMO: { dieta: "herbivoro", tamanho: 3, biomasPossiveis: ["savana", "rio"] }
        };

        return especies[especie] || null;
    }
    
}

export { Animais as Animais }