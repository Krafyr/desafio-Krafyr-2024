import { Animais } from "./animais.js";

class RecintosZoo {

    recintosBase() {
        let recintos = 
            [{numero:1, bioma: ["savana"], tamanhoTotal: 10, animaisExistentes: ["MACACO", "MACACO", "MACACO"]}, 
                {numero:2, bioma: ["floresta"], tamanhoTotal: 5, animaisExistentes: []},
                {numero:3, bioma: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: ["GAZELA"]},
                {numero:4, bioma: ["rio"], tamanhoTotal: 8, animaisExistentes: []},
                {numero:5, bioma: ["savana"], tamanhoTotal: 9, animaisExistentes: ["LEAO"]}];
        
        return recintos;
    }

    analisaRecintos(animal, quantidade) {
        let recintos = this.recintosBase();
        return this.verificarAdicionarAnimalAoRecinto(animal, quantidade, recintos);
    }

    adicionarAnimaisAoRecinto(animal, quantidade, recinto) {
        recinto.animaisExistentes.push(...Array(quantidade).fill(animal));
    }

    espacosQuantidadeDeAnimais(animais) {
        const quantidadeAnimaisDiferentes = new Set(animais).size - 1;
        return quantidadeAnimaisDiferentes;
    }

    saidaRecintosViaveis(recintos, tamanhoRestante) {
        let saidaRecintos = {recintosViaveis: []};
        for (let i = 0; i < recintos.length; i++) {
            saidaRecintos.recintosViaveis.push(`Recinto ${recintos[i].numero} (espaço livre: ${tamanhoRestante[i]} total: ${recintos[i].tamanhoTotal})`)
        }

        recintos.forEach(recinto => {
            
        });
        return saidaRecintos;
    }

    verificarAdicionarAnimalAoRecinto(animal, quantidade, recintos) {


        const especieParaAdicionar = new Animais().informacoesEspecie(animal);

        let recintosViaveis = [];
        let tamanhoRestanteArray = [];

        if (especieParaAdicionar == null) {
            return {erro: "Animal inválido"}
        }

        if (quantidade < 1) {
            return {erro: "Quantidade inválida"}
        }



        recintos.forEach(recinto => {
            let tamanhoRestante = recinto.tamanhoTotal;
            let temCarnivoro;
            let temHerbivoro;

            recinto.animaisExistentes.forEach(animalExistente => {
                const animalInfo = new Animais().informacoesEspecie(animalExistente);
                tamanhoRestante = tamanhoRestante - animalInfo.tamanho;
                if (animalInfo.dieta === "carnivoro") {
                    temCarnivoro = true;
                } else if (animalInfo.dieta === "herbivoro") {
                    temHerbivoro = true;
                }
            });


            const dietaConflitante = (temCarnivoro && especieParaAdicionar.dieta === "herbivoro") || 
                                    (temHerbivoro && especieParaAdicionar.dieta === "carnivoro");


            if (dietaConflitante) {
                
                return;
            }

            const biomaCompativel = recinto.bioma.some(bioma => 
                especieParaAdicionar.biomasPossiveis.includes(bioma)
            );
            
            const temEspaçoDisponivel = tamanhoRestante >= especieParaAdicionar.tamanho * quantidade;
            const recintoVazio = tamanhoRestante == recinto.tamanhoTotal;
            const recintoVazioECompativel = recintoVazio && biomaCompativel && temEspaçoDisponivel;

            const recintoOcupadoECompativel = !recintoVazio && biomaCompativel && temEspaçoDisponivel;

            const temHipopotamo = recinto.animaisExistentes.includes("HIPOPOTAMO");
            const hipopotamoEOutrosAnimais = temHipopotamo && recinto.bioma.includes("rio") && recinto.bioma.includes("savana");
            
            
            //Diminui a quantidade restante de acordo com animais diferentes
            if (recintoOcupadoECompativel && this.espacosQuantidadeDeAnimais(recinto.animaisExistentes) > 1) {
                tamanhoRestante -= this.espacosQuantidadeDeAnimais(recinto.animaisExistentes);
            }

            //Diminui a quantidade restante caso o animal adicionado for diferente dos existentes
            if (!recinto.animaisExistentes.includes(animal) && !recintoVazio) {
                tamanhoRestante -= this.espacosQuantidadeDeAnimais([animal]);
            }

            //Macaco apenas é adicionado caso tenha outro animal, mesmo que outro macaco
            if (recintoVazioECompativel && ((animal !== "MACACO") || (animal == "MACACO" && quantidade > 1))) {
                this.adicionarAnimaisAoRecinto(animal, quantidade, recinto);
                tamanhoRestante -= especieParaAdicionar.tamanho * quantidade;
                recintosViaveis.push(recinto);
                tamanhoRestanteArray.push(tamanhoRestante);
            }

            //Adiciona animal caso haja espaço e não há hipopotamo, ou se é possível convivência
            if (((recintoOcupadoECompativel && !temCarnivoro) && animal.dieta !== "carnivoro") && (!temHipopotamo || hipopotamoEOutrosAnimais)) {
                this.adicionarAnimaisAoRecinto(animal, quantidade, recinto); 
                tamanhoRestante -= especieParaAdicionar.tamanho * quantidade;
                recintosViaveis.push(recinto);
                tamanhoRestanteArray.push(tamanhoRestante);
            }

            //Adiciona animal caso haja espaço e existe o mesmo carnivoro
            if (recintoOcupadoECompativel && temCarnivoro && recinto.animaisExistentes.includes(animal)) {
                this.adicionarAnimaisAoRecinto(animal, quantidade, recinto);
                tamanhoRestante -= especieParaAdicionar.tamanho * quantidade;
                recintosViaveis.push(recinto);
                tamanhoRestanteArray.push(tamanhoRestante);
            }

        });

        if (recintosViaveis.length > 0) {
            const recintosViaveisResultado = this.saidaRecintosViaveis(recintosViaveis, tamanhoRestanteArray);
            return recintosViaveisResultado;
        } else {
            return {erro: "Não há recinto viável"};
        }
        
    }

}

export { RecintosZoo as RecintosZoo };
