import { Dexie } from "./dexie.mjs";

const MATRIZ_CURRICULAR = {
    Componentes: [],
    Inicializar: function ()
    {
        const BOTAO_ADICIONAR = document.getElementsByClassName("adicionar-componente")[0].children[0];
        BOTAO_ADICIONAR.addEventListener("click", () =>
        {
            MATRIZ_CURRICULAR.AdicionarComponente("Novo componente");
        });

        let db = new Dexie("lista-componentes");
        db.version(1).stores({componentes: 'Nome, Aproveitamentos, Aprovacao'});
        db.open().then(function (database)
        {
            database.componentes.each(componente =>
            {
                MATRIZ_CURRICULAR.AdicionarComponente(componente.Nome, componente.Aproveitamentos, componente.Aprovacao);
            });
        }).catch("NoSuchDatabaseError", function (e) 
        {
            console.error("db não encontrada.", e);
        });

        if (MATRIZ_CURRICULAR.Componentes.length === 0) MATRIZ_CURRICULAR.CriarComponentesBase();
    },
    CriarComponentesBase: function ()
    {
        0;
    },
    AdicionarComponente: function (nome, aproveitamentos = null, aprovacao = null)
    {
        const OBJETO =
        {
            Nome: nome,
            Aproveitamentos: aproveitamentos ?? new Array(7).fill(null).map(() => "0.0"),
            Aprovacao: aprovacao ?? false
        }
        MATRIZ_CURRICULAR.Componentes.push(OBJETO);

        MATRIZ_CURRICULAR.CriarLinha(MATRIZ_CURRICULAR.Componentes.length-1);
    },
    CriarLinha: function (componenteIndex)
    {
        const COMPONENTE = MATRIZ_CURRICULAR.Componentes[componenteIndex];
        const TABELA = document.getElementsByClassName("lista-componentes")[0];

        const TR = document.createElement("tr");

        const TD_NUMERO = document.createElement("td");
        TD_NUMERO.textContent = (parseInt(componenteIndex) + 1).toString();
        TR.appendChild(TD_NUMERO);

        const TD_NOME = document.createElement("td");
        TD_NOME.colSpan = "2";
        TD_NOME.textContent = COMPONENTE.Nome;
        TR.appendChild(TD_NOME);

        for (let aproveitamento of COMPONENTE.Aproveitamentos)
        {
            let TD_APROVEITAMENTO = document.createElement("td");
            TD_APROVEITAMENTO.textContent = aproveitamento;
            TR.appendChild(TD_APROVEITAMENTO);
        }

        const TD_APROVACAO = document.createElement("td");
        TD_APROVACAO.textContent = "N";
        TR.appendChild(TD_APROVACAO);

        const TD_EDITAR = document.createElement("td");
        TD_EDITAR.classList.add("editar");

        const TD_EDITAR_BOTAO = document.createElement("button");
        TD_EDITAR_BOTAO.addEventListener("click", evt => 
        {
            MATRIZ_CURRICULAR.EditarComponente(evt.target.parentElement.parentElement);
        });

        TD_EDITAR.replaceChildren(TD_EDITAR_BOTAO);
        TR.appendChild(TD_EDITAR);

        TABELA.children[1].insertBefore(TR, TABELA.children[1].lastElementChild);
    },
    EditarComponente: function (linha)
    {
        linha.children[10].classList.remove("editar");
        linha.children[10].classList.add("alterar");
        const INDEX_COMPONENTE = parseInt(linha.children[0].textContent) - 1;
        
        const INPUT_COMPONENTE = document.createElement("input");
        INPUT_COMPONENTE.type = "text";
        INPUT_COMPONENTE.value = linha.children[1].textContent;
        linha.children[1].replaceChildren(INPUT_COMPONENTE);

        const BOTAO_EXCLUIR = document.createElement("button");
        BOTAO_EXCLUIR.classList.add("excluir-componente");
        BOTAO_EXCLUIR.addEventListener("click", () => {MATRIZ_CURRICULAR.ExcluirComponente(INDEX_COMPONENTE);});
        const BOTAO_SALVAR = document.createElement("button");
        BOTAO_SALVAR.classList.add("salvar-componente");
        BOTAO_SALVAR.addEventListener("click", () => {MATRIZ_CURRICULAR.SalvarComponente(linha);});
        linha.children[10].replaceChildren(BOTAO_EXCLUIR, BOTAO_SALVAR);

        for (let i = 0; i < 6; i++)
        {
            const INPUT_NOTA = document.createElement("input");
            INPUT_NOTA.type = "text";
            INPUT_NOTA.classList.add("campo-nota");
            INPUT_NOTA.value = linha.children[2+i].textContent;
            linha.children[2+i].replaceChildren(INPUT_NOTA);
            INPUT_NOTA.addEventListener("input", evt =>
            {
                if (isNaN(evt.data) || evt.data === null) evt.target.value = "0.0";
                
                let numeros = evt.target.value.match(/\d/g).join("");
                if (numeros.length === 1) numeros = "0" + numeros;
                while (numeros.length > 2 && numeros.startsWith("0")) numeros = numeros.slice(1);
                evt.target.value = numeros.slice(0, -1) + "." + numeros.slice(-1);
            });
        }
    },
    ExcluirComponente: function (index)
    {
        MATRIZ_CURRICULAR.Componentes.splice(index, 1);
        const TABELA = document.getElementsByClassName("lista-componentes")[0];

        TABELA.children[1].children[index].remove();
        for (let i = index; i < (TABELA.children[1].children.length-1); i++)
        {
            TABELA.children[1].children[i].children[0].textContent = (parseInt(TABELA.children[1].children[i].children[0].textContent) - 1).toString();
        }

        MATRIZ_CURRICULAR.SalvarLista();
    },
    SalvarComponente: function (linha)
    {
        const INDEX_COMPONENTE = parseInt(linha.children[0].textContent) - 1;
        
        linha.children[10].classList.remove("alterar");
        linha.children[10].classList.add("editar");
        linha.children[10].children[1].remove();

        const NOME = linha.children[1].children[0].value;
        linha.children[1].replaceChildren(NOME);
        MATRIZ_CURRICULAR.Componentes[INDEX_COMPONENTE].Nome = NOME;

        for (let i = 0; i < 6; i++)
        {
            const NOTA = linha.children[2+i].children[0].value;
            linha.children[2+i].replaceChildren(NOTA);

            MATRIZ_CURRICULAR.Componentes[INDEX_COMPONENTE].Aproveitamentos[i] = NOTA;
        }

        const MAIOR_1 = Math.max(parseInt(linha.children[2].textContent.match(/\d/g).join("")), parseInt(linha.children[3].textContent.match(/\d/g).join("")));
        const MAIOR_2 = Math.max(parseInt(linha.children[4].textContent.match(/\d/g).join("")), parseInt(linha.children[5].textContent.match(/\d/g).join("")));
        const MAIOR_3 = Math.max(parseInt(linha.children[6].textContent.match(/\d/g).join("")), parseInt(linha.children[7].textContent.match(/\d/g).join("")));
        const FINAL_NUMERO = (3 * (MAIOR_1 + MAIOR_2) + 4 * MAIOR_3).toString();
        const FINAL_STRING = FINAL_NUMERO.slice(0, -2) + "." + FINAL_NUMERO.slice(-2);

        linha.children[8].textContent = FINAL_STRING.padStart(4, "0");
        linha.children[9].textContent = parseInt(FINAL_NUMERO) >= 600 ? "S" : "N";

        MATRIZ_CURRICULAR.Componentes[INDEX_COMPONENTE].Aprovacao = parseInt(FINAL_NUMERO) >= 600;

        MATRIZ_CURRICULAR.SalvarLista();
    },
    SalvarLista: function ()
    {
        let db = new Dexie("lista-componentes");
        db.version(1).stores({componentes: 'Nome, Aproveitamentos, Aprovacao'});
        db.open().then(function (database)
        {
            database.componentes.clear();
            database.componentes.bulkAdd(MATRIZ_CURRICULAR.Componentes);
        });
    }
}

MATRIZ_CURRICULAR.Inicializar();