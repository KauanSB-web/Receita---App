const receitas = [
  {
    id: 1,
    nome: "Arroz com Frango",
    categoria: "Almoço",
    tempo: "40 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 xícaras de arroz",
      "500 g de peito de frango",
      "1 cebola média",
      "2 dentes de alho",
      "2 colheres de sopa de óleo",
      "Sal a gosto",
      "Pimenta-do-reino a gosto",
      "Cheiro-verde a gosto",
    ],
    preparo:
      "Tempere o frango com sal e pimenta. Em uma panela, aqueça o óleo e refogue a cebola e o alho. Acrescente o frango em cubos e cozinhe até dourar. Adicione o arroz, misture bem e cubra com água quente. Cozinhe em fogo médio até o arroz ficar macio e a água secar. Finalize com cheiro-verde.",
  },

  {
    id: 2,
    nome: "Macarrão ao Molho de Tomate",
    categoria: "Massas",
    tempo: "30 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de macarrão",
      "400 g de molho de tomate",
      "1 cebola",
      "2 dentes de alho",
      "2 colheres de sopa de azeite",
      "Sal a gosto",
      "Queijo parmesão ralado",
    ],
    preparo:
      "Cozinhe o macarrão em água fervente com sal até ficar al dente. Enquanto isso, refogue a cebola e o alho no azeite. Acrescente o molho de tomate e cozinhe por alguns minutos. Escorra o macarrão e misture ao molho. Sirva com queijo parmesão.",
  },

  {
    id: 3,
    nome: "Panqueca de Carne",
    categoria: "Almoço",
    tempo: "45 min",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "1 xícara de farinha de trigo",
      "1 xícara de leite",
      "2 ovos",
      "300 g de carne moída",
      "1 cebola",
      "Molho de tomate",
      "Sal a gosto",
    ],
    preparo:
      "Bata a farinha, o leite e os ovos até formar uma massa lisa. Prepare as panquecas em uma frigideira antiaderente. Para o recheio, refogue a cebola e a carne moída até cozinhar completamente. Recheie as panquecas, cubra com molho de tomate e leve ao forno por alguns minutos.",
  },

  {
    id: 4,
    nome: "Bolo de Chocolate",
    categoria: "Sobremesa",
    tempo: "50 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 xícaras de farinha de trigo",
      "1 xícara de chocolate em pó",
      "3 ovos",
      "1 xícara de açúcar",
      "1 xícara de leite",
      "1/2 xícara de óleo",
      "1 colher de sopa de fermento",
    ],
    preparo:
      "Misture os ovos, o açúcar, o óleo e o leite. Acrescente a farinha e o chocolate em pó e misture até ficar homogêneo. Por último, coloque o fermento. Despeje em uma forma untada e asse em forno preaquecido a 180°C por aproximadamente 40 minutos.",
  },

  {
    id: 5,
    nome: "Pizza Caseira",
    categoria: "Massas",
    tempo: "1h",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de farinha de trigo",
      "10 g de fermento biológico seco",
      "300 ml de água morna",
      "2 colheres de sopa de azeite",
      "1 colher de chá de sal",
      "Molho de tomate",
      "300 g de queijo",
      "Recheio a gosto",
    ],
    preparo:
      "Misture a farinha, o fermento e o sal. Acrescente a água morna e o azeite e sove até formar uma massa lisa. Deixe descansar por aproximadamente 40 minutos. Abra a massa, coloque o molho, o queijo e o recheio escolhido. Asse em forno bem quente até a massa dourar.",
  },

  {
    id: 6,
    nome: "Hambúrguer Artesanal",
    categoria: "Lanches",
    tempo: "35 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de carne moída",
      "4 pães de hambúrguer",
      "4 fatias de queijo",
      "Alface",
      "Tomate",
      "Cebola",
      "Sal e pimenta",
    ],
    preparo:
      "Tempere a carne com sal e pimenta. Divida em quatro partes e modele os hambúrgueres. Grelhe em uma frigideira ou chapa quente até atingir o ponto desejado. Coloque o queijo sobre a carne ainda quente. Monte o sanduíche com pão, carne, queijo, alface, tomate e cebola.",
  },

  {
    id: 7,
    nome: "Salada Tropical",
    categoria: "Saudável",
    tempo: "15 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "Alface",
      "Tomate",
      "Manga",
      "Abacaxi",
      "Cenoura ralada",
      "Azeite",
      "Limão",
      "Sal",
    ],
    preparo:
      "Lave e higienize as folhas e os vegetais. Corte a manga, o abacaxi e o tomate. Misture todos os ingredientes em uma tigela. Tempere com azeite, limão e sal e sirva imediatamente.",
  },

  {
    id: 8,
    nome: "Frango Grelhado",
    categoria: "Saudável",
    tempo: "25 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 filés de peito de frango",
      "Suco de 1 limão",
      "2 dentes de alho",
      "Sal",
      "Pimenta-do-reino",
      "1 colher de sopa de azeite",
    ],
    preparo:
      "Tempere os filés com limão, alho, sal e pimenta. Deixe descansar por alguns minutos. Aqueça uma frigideira com azeite e grelhe os filés dos dois lados até ficarem dourados e completamente cozidos.",
  },

  {
    id: 9,
    nome: "Strogonoff de Frango",
    categoria: "Almoço",
    tempo: "40 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de peito de frango",
      "1 cebola",
      "2 dentes de alho",
      "200 g de creme de leite",
      "3 colheres de sopa de molho de tomate",
      "1 colher de sopa de mostarda",
      "Sal e pimenta",
    ],
    preparo:
      "Corte o frango em cubos e tempere. Refogue a cebola e o alho e acrescente o frango. Cozinhe até dourar. Adicione o molho de tomate e a mostarda. Abaixe o fogo e acrescente o creme de leite. Misture bem e cozinhe por mais alguns minutos.",
  },

  {
    id: 10,
    nome: "Brigadeiro",
    categoria: "Sobremesa",
    tempo: "20 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "1 lata de leite condensado",
      "4 colheres de sopa de chocolate em pó",
      "1 colher de sopa de manteiga",
      "Chocolate granulado",
    ],
    preparo:
      "Coloque o leite condensado, o chocolate em pó e a manteiga em uma panela. Cozinhe em fogo baixo, mexendo sempre, até a mistura desgrudar do fundo. Transfira para um prato untado e deixe esfriar. Faça pequenas bolinhas e passe no chocolate granulado.",
  },

  {
    id: 11,
    nome: "Torta de Frango",
    categoria: "Lanches",
    tempo: "1h",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 xícaras de farinha",
      "2 xícaras de leite",
      "3 ovos",
      "1/2 xícara de óleo",
      "1 colher de sopa de fermento",
      "400 g de frango desfiado",
      "Milho",
      "Ervilha",
      "Molho de tomate",
    ],
    preparo:
      "Bata os ingredientes da massa até obter uma mistura homogênea. Prepare o recheio refogando o frango desfiado com milho, ervilha e molho de tomate. Coloque metade da massa em uma forma, espalhe o recheio e cubra com o restante. Asse a 180°C até dourar.",
  },

  {
    id: 12,
    nome: "Coxinha",
    categoria: "Lanches",
    tempo: "1h30",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1627054249508-7f4e9f8f1f5f?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de farinha de trigo",
      "500 ml de caldo de frango",
      "2 colheres de sopa de manteiga",
      "400 g de frango desfiado",
      "Requeijão",
      "Farinha de rosca",
      "Óleo para fritar",
    ],
    preparo:
      "Aqueça o caldo de frango com a manteiga. Acrescente a farinha de uma vez e mexa vigorosamente até formar uma massa que desgrude da panela. Deixe esfriar. Abra pequenas porções da massa, coloque frango e requeijão no centro e modele as coxinhas. Passe na farinha de rosca e frite em óleo quente.",
  },

  {
    id: 13,
    nome: "Feijoada",
    categoria: "Almoço",
    tempo: "2h30",
    dificuldade: "Difícil",
    imagem:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de feijão preto",
      "300 g de carne seca",
      "200 g de linguiça calabresa",
      "200 g de costelinha suína",
      "100 g de bacon",
      "1 cebola",
      "4 dentes de alho",
      "Folhas de louro",
      "Sal a gosto",
    ],
    preparo:
      "Deixe o feijão de molho conforme a orientação da embalagem. Cozinhe o feijão com as carnes até tudo ficar macio. Em outra panela, refogue o bacon, a cebola e o alho. Misture ao feijão e cozinhe em fogo baixo até o caldo engrossar. Ajuste o sal e sirva com arroz, couve e farofa.",
  },

  {
    id: 14,
    nome: "Lasanha",
    categoria: "Massas",
    tempo: "1h20",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1574868234756-9a5c0d8b2a7f?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de massa para lasanha",
      "500 g de carne moída",
      "500 g de molho de tomate",
      "300 g de muçarela",
      "200 g de presunto",
      "Parmesão ralado",
      "1 cebola",
    ],
    preparo:
      "Prepare o molho refogando a cebola e a carne moída. Acrescente o molho de tomate e cozinhe. Em um refratário, faça camadas de molho, massa, presunto e queijo. Repita até terminar os ingredientes. Finalize com queijo e parmesão. Leve ao forno a 200°C até gratinar.",
  },

  {
    id: 15,
    nome: "Sopa de Legumes",
    categoria: "Saudável",
    tempo: "40 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 batatas",
      "2 cenouras",
      "1 abobrinha",
      "1 cebola",
      "2 dentes de alho",
      "1 litro de água",
      "Sal",
      "Cheiro-verde",
    ],
    preparo:
      "Corte os legumes em pedaços. Refogue a cebola e o alho. Acrescente os legumes e a água. Cozinhe até que todos estejam macios. Tempere com sal e finalize com cheiro-verde.",
  },

  {
    id: 16,
    nome: "Omelete",
    categoria: "Café da manhã",
    tempo: "10 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "3 ovos",
      "2 colheres de sopa de leite",
      "Queijo",
      "Tomate",
      "Orégano",
      "Sal",
      "Pimenta",
    ],
    preparo:
      "Bata os ovos com o leite, sal e pimenta. Aqueça uma frigideira antiaderente. Despeje os ovos e acrescente o queijo e o tomate. Cozinhe em fogo baixo até firmar e dobre ao meio.",
  },

  {
    id: 17,
    nome: "Pão de Queijo",
    categoria: "Café da manhã",
    tempo: "35 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1629832726549-8f0c8c6a0e8f?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de polvilho doce",
      "250 ml de leite",
      "100 ml de óleo",
      "2 ovos",
      "200 g de queijo meia-cura ou parmesão",
      "1 colher de chá de sal",
    ],
    preparo:
      "Aqueça o leite com o óleo e o sal. Despeje sobre o polvilho e misture. Quando amornar, acrescente os ovos e o queijo. Misture até formar uma massa. Faça pequenas bolinhas e coloque em uma assadeira. Asse a 200°C por aproximadamente 25 minutos.",
  },

  {
    id: 18,
    nome: "Açaí com Frutas",
    categoria: "Sobremesa",
    tempo: "10 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "300 g de polpa de açaí",
      "1 banana",
      "Morangos",
      "Granola",
      "Mel a gosto",
    ],
    preparo:
      "Coloque a polpa de açaí em uma tigela. Corte a banana e os morangos. Cubra o açaí com as frutas e acrescente granola. Finalize com mel, se desejar.",
  },

  {
    id: 19,
    nome: "Mousse de Maracujá",
    categoria: "Sobremesa",
    tempo: "20 min + geladeira",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "1 lata de leite condensado",
      "1 caixa de creme de leite",
      "200 ml de suco concentrado de maracujá",
      "Polpa de maracujá para decorar",
    ],
    preparo:
      "Bata o leite condensado, o creme de leite e o suco de maracujá no liquidificador por alguns minutos. Distribua em potes ou em uma travessa. Leve à geladeira por pelo menos 3 horas. Decore com polpa de maracujá antes de servir.",
  },

  {
    id: 20,
    nome: "Panqueca Doce",
    categoria: "Café da manhã",
    tempo: "20 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "1 xícara de farinha",
      "1 ovo",
      "1 xícara de leite",
      "1 colher de sopa de açúcar",
      "1 colher de chá de fermento",
      "Banana ou morangos",
      "Mel",
    ],
    preparo:
      "Misture a farinha, o ovo, o leite, o açúcar e o fermento. Aqueça uma frigideira e coloque pequenas porções da massa. Doure dos dois lados. Sirva com frutas e mel.",
  },

  {
    id: 21,
    nome: "Risoto de Queijo",
    categoria: "Almoço",
    tempo: "45 min",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 xícaras de arroz arbóreo",
      "1 litro de caldo de legumes",
      "1 cebola",
      "1/2 xícara de vinho branco",
      "150 g de queijo parmesão",
      "2 colheres de sopa de manteiga",
      "Sal e pimenta",
    ],
    preparo:
      "Refogue a cebola na manteiga. Acrescente o arroz e mexa por alguns minutos. Adicione o vinho e deixe evaporar. Vá acrescentando o caldo quente aos poucos, mexendo sempre. Quando o arroz estiver cremoso e al dente, desligue o fogo e misture o queijo e mais um pouco de manteiga.",
  },

  {
    id: 22,
    nome: "Escondidinho de Carne",
    categoria: "Almoço",
    tempo: "1h10",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "500 g de carne moída",
      "1 kg de mandioca",
      "1 cebola",
      "2 dentes de alho",
      "200 g de muçarela",
      "2 colheres de sopa de manteiga",
      "1/2 xícara de leite",
      "Sal",
    ],
    preparo:
      "Cozinhe a mandioca até ficar macia e amasse formando um purê. Misture manteiga e leite. Prepare a carne refogando cebola, alho e carne moída. Em um refratário, coloque uma camada de purê, depois a carne e finalize com outra camada de purê. Cubra com queijo e leve ao forno até gratinar.",
  },

  {
    id: 23,
    nome: "Yakissoba",
    categoria: "Massas",
    tempo: "40 min",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "300 g de macarrão para yakissoba",
      "300 g de frango ou carne",
      "1 cenoura",
      "1/2 repolho",
      "1 cebola",
      "Molho shoyu",
      "Óleo de gergelim",
    ],
    preparo:
      "Cozinhe o macarrão conforme as instruções da embalagem. Corte as carnes e os legumes. Em uma panela grande, doure a carne e depois acrescente os legumes. Adicione o macarrão, o shoyu e o óleo de gergelim. Misture bem e cozinhe por alguns minutos.",
  },

  {
    id: 24,
    nome: "Crepioca",
    categoria: "Saudável",
    tempo: "15 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 ovos",
      "2 colheres de sopa de tapioca",
      "1 pitada de sal",
      "Queijo",
      "Tomate",
      "Orégano",
    ],
    preparo:
      "Misture os ovos com a tapioca e o sal. Aqueça uma frigideira antiaderente e despeje a mistura. Cozinhe em fogo baixo até firmar. Acrescente queijo e tomate, dobre ao meio e deixe o queijo derreter.",
  },

  {
    id: 25,
    nome: "Vitamina de Banana",
    categoria: "Bebidas",
    tempo: "5 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 bananas maduras",
      "300 ml de leite",
      "1 colher de sopa de aveia",
      "Mel ou açúcar a gosto",
      "Canela a gosto",
    ],
    preparo:
      "Descasque as bananas e coloque todos os ingredientes no liquidificador. Bata por aproximadamente 1 minuto, até ficar cremoso. Sirva imediatamente.",
  },

  {
    id: 26,
    nome: "Suco Natural",
    categoria: "Bebidas",
    tempo: "5 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 laranjas",
      "200 ml de água",
      "Gelo",
      "Açúcar a gosto",
    ],
    preparo:
      "Esprema as laranjas. Misture o suco com a água e o gelo. Adoce se desejar e sirva imediatamente.",
  },

  {
    id: 27,
    nome: "Cookie Caseiro",
    categoria: "Sobremesa",
    tempo: "30 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "2 xícaras de farinha",
      "100 g de manteiga",
      "1/2 xícara de açúcar",
      "1 ovo",
      "1 colher de chá de fermento",
      "150 g de chocolate picado",
    ],
    preparo:
      "Misture a manteiga e o açúcar. Acrescente o ovo e misture. Adicione a farinha e o fermento. Por último, coloque o chocolate. Faça pequenas bolas de massa e coloque em uma assadeira. Asse a 180°C por aproximadamente 15 minutos.",
  },

  {
    id: 28,
    nome: "Pudim de Leite Condensado",
    categoria: "Sobremesa",
    tempo: "1h30 + geladeira",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "1 lata de leite condensado",
      "2 medidas de leite",
      "3 ovos",
      "1 xícara de açúcar",
    ],
    preparo:
      "Derreta o açúcar em uma forma até formar um caramelo. Espalhe pela forma. Bata o leite condensado, o leite e os ovos no liquidificador. Despeje na forma caramelizada. Cubra com papel-alumínio e asse em banho-maria por aproximadamente 1 hora. Deixe esfriar e leve à geladeira antes de desenformar.",
  },

  {
    id: 29,
    nome: "Churrasco",
    categoria: "Almoço",
    tempo: "1h30",
    dificuldade: "Médio",
    imagem:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "1 kg de carne bovina",
      "500 g de linguiça",
      "Sal grosso",
      "Carvão",
      "Farofa para acompanhar",
      "Vinagrete",
    ],
    preparo:
      "Acenda a churrasqueira e aguarde formar uma brasa uniforme. Tempere as carnes com sal grosso. Coloque as carnes na grelha e asse, virando de tempos em tempos, até atingir o ponto desejado. Sirva com farofa e vinagrete.",
  },

  {
    id: 30,
    nome: "Bolo de Cenoura",
    categoria: "Sobremesa",
    tempo: "50 min",
    dificuldade: "Fácil",
    imagem:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=80",
    ingredientes: [
      "3 cenouras médias",
      "3 ovos",
      "1 xícara de óleo",
      "2 xícaras de açúcar",
      "2 e 1/2 xícaras de farinha",
      "1 colher de sopa de fermento",
      "Chocolate para a cobertura",
    ],
    preparo:
      "Bata as cenouras, os ovos e o óleo no liquidificador. Transfira para uma tigela e misture o açúcar e a farinha. Acrescente o fermento por último. Coloque em uma forma untada e asse a 180°C por aproximadamente 40 minutos. Cubra com chocolate derretido ou calda de chocolate.",
  },
];

/*
  EXPORTA DOS DOIS JEITOS.

  Assim funciona tanto:
  
  import receitas from "../data/receitas";

  quanto:

  import { receitas } from "../data/receitas";
*/

export { receitas };

export default receitas;