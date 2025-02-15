const MEMBROS =
{
    Setores:
    {
        "presidencia":
            [
                "Presidência",
                {
                    Imagem: "daniel.png",
                    Nome: "Daniel",
                    Cargo: "Presidente do GETZ",
                    Turma: "3º ano C.M. - T103"
                },
                {
                    Imagem: "taine.png",
                    Nome: "Taíne",
                    Cargo: "Vice-Presidente do GETZ",
                    Turma: "3º ano E.M. - T207"
                },
            ],
        "secretaria":
            [
                "Secretaria",
                {
                    Imagem: null,
                    Nome: "Uziel",
                    Cargo: "1º Secretário do GETZ",
                    Turma: "3º ano E.M. - T303"
                },
                {
                    Imagem: null,
                    Nome: "Gabriely",
                    Cargo: "2ª Secretária do GETZ",
                    Turma: "3º ano E.M. - T303"
                }
            ],
        "financeiro":
            [
                "Setor Financeiro",
                {
                    Imagem: null,
                    Nome: "Camille",
                    Cargo: "Coordenadora",
                    Turma: "2º ano E.M. - T204"
                },
                {
                    Imagem: null,
                    Nome: "Bárbara",
                    Cargo: "Integrante",
                    Turma: "2º ano E.M. - T204"
                },
                {
                    Imagem: null,
                    Nome: "Verônica",
                    Cargo: "Integrante",
                    Turma: "2º ano E.M. - T204"
                },
                {
                    Imagem: null,
                    Nome: "Luiz Otávio",
                    Cargo: "Integrante",
                    Turma: "2º no E.M. - T204"
                }
            ],
        "social":
            [
                "Departamento Social",
                {
                    Imagem: null,
                    Nome: "Maria Isabel",
                    Cargo: "Coordenadora",
                    Turma: "3º ano E.M. - T207"
                },
                {
                    Imagem: null,
                    Nome: "Ana Luiza",
                    Cargo: "Integrante",
                    Turma: "3º ano E.M. - T207"
                },
                {
                    Imagem: null,
                    Nome: "Thalini",
                    Cargo: "Integrante",
                    Turma: "3º ano E.M. - T207"
                }
            ],
        "esportes":
            [
                "Departamento de Esportes",
                {
                    Imagem: null,
                    Nome: "Luiz Eduardo",
                    Cargo: "Coordenador",
                    Turma: "3º ano E.M. - T207"
                },
                {
                    Imagem: null,
                    Nome: "Guilherme",
                    Cargo: "Integrante",
                    Turma: "3º ano E.M. - T207"
                },
                {
                    Imagem: null,
                    Nome: "Michelly",
                    Cargo: "Integrante",
                    Turma: "2º ano E.M. - T205"
                }
            ],
        "saude":
            [
                "Departamento de Saúde e Meio Ambiente",
                {
                    Imagem: null,
                    Nome: "Tobias",
                    Cargo: "Coordenador",
                    Turma: "2º ano E.M. - T204"
                },
                {
                    Imagem: null,
                    Nome: "Everlin",
                    Cargo: "Integrante",
                    Turma: "2º ano C.M. - T102"
                }
            ],
        "civico":
            [
                "Departamento Cívico e Cultural",
                {
                    Imagem: null,
                    Nome: "Artur",
                    Cargo: "Coordenador",
                    Turma: "2º ano E.M. - T204"
                },
                {
                    Imagem: null,
                    Nome: "Bianca",
                    Cargo: "Integrante",
                    Turma: "2º ano E.M. - T204"
                }
            ]
    },
    CriarSplashes: function ()
    {
        const CONTEUDO = document.getElementsByClassName("conteudo")[0];

        for (const [ID, SETOR] of Object.entries(MEMBROS.Setores))
        {
            const SPLASH = document.createElement("div");
            SPLASH.classList.add("splash");
            SPLASH.id = ID;

            const LEGENDA = document.createElement("h1");
            LEGENDA.innerText = SETOR[0];
            SPLASH.appendChild(LEGENDA);

            for (const MEMBRO of SETOR.slice(1))
            {
                SPLASH.appendChild(MEMBROS.CriarFicha(MEMBRO));
            }

            const QUEBRA = document.createElement("br");

            CONTEUDO.append(SPLASH, QUEBRA);
        }
    },
    CriarFicha: function (MEMBRO)
    {
        const DIV_MEMBRO = document.createElement("div");
        DIV_MEMBRO.classList.add("membro");

        const DIV_IMAGEM = document.createElement("div");
        DIV_IMAGEM.classList.add("membro-imagem");
        const IMAGEM = document.createElement("img");
        IMAGEM.src = "images/membros/" + (MEMBRO.Imagem ?? "generic.png");
        DIV_IMAGEM.replaceChildren(IMAGEM);

        const DIV_DADOS = document.createElement("div");
        DIV_DADOS.classList.add("membro-dados");

        const DIV_NOME = document.createElement("div");
        DIV_NOME.classList.add("membro-nome");
        DIV_NOME.textContent = MEMBRO.Nome;

        const DIV_CARGO = document.createElement("div");
        DIV_CARGO.classList.add("membro-cargo");
        DIV_CARGO.textContent = MEMBRO.Cargo;

        const DIV_TURMA = document.createElement("div");
        DIV_TURMA.classList.add("membro-turma");
        DIV_TURMA.textContent = MEMBRO.Turma;

        DIV_DADOS.replaceChildren(DIV_NOME, DIV_CARGO, DIV_TURMA);

        DIV_MEMBRO.replaceChildren(DIV_IMAGEM, DIV_DADOS);

        return DIV_MEMBRO;
    }
};

MEMBROS.CriarSplashes();
