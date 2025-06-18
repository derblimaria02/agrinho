let vacaImg, galinhaImg, porcoImg, cavaloImg, abelhaImg;
let leiteImg, ovosImg, frutasImg, vegetaisImg, melImg;

// Variáveis para animação
let caminhadaCaminhao = 0;
let velocidadeCaminhao = 0.5;

function preload() {
  // --- INSTRUÇÕES IMPORTANTES ---
  // Para que o projeto funcione visualmente, você precisará carregar suas próprias imagens aqui.
  // Baixe ou crie pequenas imagens (PNGs com fundo transparente são ideais!) para cada item.
  // Exemplos de nomes de arquivo: 'vaca.png', 'leite.png', etc.
  // No p5.js Web Editor: clique na seta ao lado do nome do seu sketch, depois "Upload file".

  // Para fins de demonstração e para evitar erros sem as imagens, usaremos placeholders.
  // Se você tiver as imagens, descomente as linhas abaixo e substitua pelos seus caminhos:

  /*
  vacaImg = loadImage('vaca.png');
  galinhaImg = loadImage('galinha.png');
  porcoImg = loadImage('');
  porcoImg = loadI');
  cavaloImg = loadImage('cavalo.png');
  abelhaImg = loadImage('abelha.png');

  leiteImg = loadImage('leite.png');
  ovosImg = loadImage('ovos.png');
  frutasImg = loadImage('frutas.png');
  vegetaisImg = loadImage('vegetais.png');
  melImg = loadImage('mel.png');
  */
}

function setup() {
  createCanvas(900, 600); // Um canvas um pouco maior
  imageMode(CENTER); // Facilita o posicionamento de imagens
}

function draw() {
  // --- Cenário Campo-Cidade ---
  // Gradiente do Campo (esquerda) para a Cidade (direita)
  for (let x = 0; x < width; x++) {
    let inter = map(x, 0, width, 0, 1);
    let c1 = color(150, 220, 150); // Verde claro do campo
    let c2 = color(100, 100, 120); // Azul acinzentado da cidade
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, 0, x, height);
  }

  // Chão do Campo
  fill(80, 150, 80);
  rect(0, height * 0.7, width * 0.5, height * 0.3);

  // Chão da Cidade (asfalto)
  fill(70);
  rect(width * 0.5, height * 0.7, width * 0.5, height * 0.3);

  // --- Elementos do Campo ---
  desenhaFazenda(width * 0.2, height * 0.65); // Casa da fazenda
  desenhaArvores(width * 0.1, height * 0.4, 3);
  desenhaArvores(width * 0.3, height * 0.5, 2);

  // Animais no Campo
  desenhaAnimal(vacaImg, "🐄", width * 0.15, height * 0.75, color(180, 120, 80)); // Posição e placeholder para Vaca
  desenhaAnimal(galinhaImg, "🐓", width * 0.25, height * 0.85, color(255, 200, 0)); // Posição e placeholder para Galinha
  desenhaAnimal(porcoImg, "🐖", width * 0.35, height * 0.78, color(255, 180, 200)); // Posição e placeholder para Porco
  desenhaAnimal(cavaloImg, "🐎", width * 0.45, height * 0.7, color(139, 69, 19)); // Posição e placeholder para Cavalo
  desenhaAnimal(abelhaImg, "🐝", width * 0.05 + sin(frameCount * 0.05) * 20, height * 0.5 + cos(frameCount * 0.05) * 15, color(255, 255, 0)); // Abelha voando

  // Alimentos no Campo (próximos aos animais ou em plantações)
  desenhaAlimento(frutasImg, "🍌", width * 0.1, height * 0.9, color(255, 100, 100)); // Frutas
  desenhaAlimento(vegetaisImg, "🥦", width * 0.2, height * 0.95, color(100, 200, 100)); // Vegetais

  // --- Elementos da Cidade ---
  desenhaPredio(width * 0.6, height * 0.7, 150, 200);
  desenhaPredio(width * 0.75, height * 0.7, 100, 250);
  desenhaPredio(width * 0.88, height * 0.7, 120, 180);

  // Mercado na Cidade
  fill(200, 150, 100); // Cor do mercado
  rect(width * 0.7, height * 0.7 - 70, 100, 70);
  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Mercado", width * 0.75, height * 0.7 - 35);

  // Alimentos na Cidade (próximos ao mercado)
  desenhaAlimento(leiteImg, "Leite", width * 0.68, height * 0.75, color(255, 255, 255)); // Leite
  desenhaAlimento(ovosImg, "Ovos", width * 0.75, height * 0.78, color(255, 255, 150)); // Ovos
  desenhaAlimento(melImg, "Mel", width * 0.82, height * 0.75, color(255, 200, 0)); // Mel

  // --- Conexão Campo-Cidade ---
  // Estrada
  fill(50);
  rect(0, height * 0.6, width, 50); // Estrada horizontal
  // Linhas da estrada
  for (let i = 0; i < width; i += 40) {
    fill(255, 255, 0);
    rect(i + 10, height * 0.6 + 22, 20, 6);
  }

  // Caminhão de Transporte
  desenhaCaminhao(caminhadaCaminhao, height * 0.6 + 25);
  caminhadaCaminhao += velocidadeCaminhao;
  if (caminhadaCaminhao > width + 100) {
    caminhadaCaminhao = -100; // Reinicia o caminhão quando sai da tela
  }

  // --- Título do Projeto ---
  fill(0);
  textSize(36);
  textAlign(CENTER, TOP);
  text("Conexão Campo-Cidade: Animais e Alimentos", width / 2, 20);

  // Subtítulo / Dica
  textSize(16);
  fill(50);
  text("Agrinho 2025", width / 2, 60);
}

// --- Funções de Desenho ---

function desenhaAnimal(img, nome, x, y, corPlaceholder) {
  if (img) {
    image(img, x, y, 60, 60); // Ajuste o tamanho conforme suas imagens
  } else {
    // Placeholder para o animal
    fill(corPlaceholder);
    ellipse(x, y, 50, 40); // Corpo genérico
    fill(0);
    textSize(12);
    text(nome, x, y + 40); // Nome do animal
  }
}

function desenhaAlimento(img, nome, x, y, corPlaceholder) {
  if (img) {
    image(img, x, y, 40, 40); // Ajuste o tamanho
  } else {
    // Placeholder para o alimento
    fill(corPlaceholder);
    rect(x - 20, y - 20, 40, 40); // Caixa genérica
    fill(0);
    textSize(10);
    text(nome, x, y + 25); // Nome do alimento
  }
}

function desenhaFazenda(x, y) {
  fill(180, 120, 80); // Marrom da fazenda
  rect(x, y - 80, 120, 80); // Corpo da casa
  fill(150, 80, 50); // Telhado
  triangle(x - 20, y - 80, x + 60, y - 150, x + 140, y - 80);
  fill(100);
  rect(x + 45, y - 40, 30, 40); // Porta
}

function desenhaArvores(x, y, numArvores) {
  for (let i = 0; i < numArvores; i++) {
    fill(139, 69, 19); // Tronco
    rect(x + i * 30, y, 10, 40);
    fill(50, 150, 50); // Folhas
    ellipse(x + 5 + i * 30, y - 20, 40, 40);
  }
}

function desenhaPredio(xBase, yBase, largura, altura) {
  fill(150, 150, 170); // Cor do prédio
  rect(xBase - largura / 2, yBase - altura, largura, altura);
  // Janelas
  fill(200, 200, 0, 150); // Amarelo para luzes
  for (let i = 0; i < altura / 30; i++) {
    for (let j = 0; j < largura / 30; j++) {
      if (random(1) > 0.3) { // Algumas janelas acesas
        rect(xBase - largura / 2 + 10 + j * 25, yBase - altura + 10 + i * 25, 15, 15);
      }
    }
  }
}

function desenhaCaminhao(x, y) {
  // Cabine
  fill(200, 50, 50); // Vermelho
  rect(x + 50, y - 30, 60, 40);
  rect(x + 40, y, 80, 30); // Base da cabine

  // Carroceria
  fill(150); // Cinza
  rect(x - 50, y, 100, 30); // Carroceria

  // Rodas
  fill(30);
  ellipse(x, y + 30, 20, 20);
  ellipse(x + 80, y + 30, 20, 20);
  ellipse(x + 30, y + 30, 20, 20); // Roda extra na carroceria
}