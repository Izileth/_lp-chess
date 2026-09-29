Crie uma experiência web experimental de altíssimo nível utilizando
React + TypeScript + GSAP.

OBJETIVO:
Levar o GSAP ao limite dentro de uma aplicação React moderna,
criando uma experiência visual que pareça uma mistura de:

- Awwwards
- motion design cinematográfico
- luxury technology
- editorial design
- automotive cinematography
- interfaces experimentais
- sci-fi minimalista

NÃO quero um site cheio de animações aleatórias.

Quero um SISTEMA DE MOTION DESIGN COESO, onde cada interação tenha
peso, física, continuidade e intenção.

==================================================
STACK
==================================================

React
TypeScript
GSAP
GSAP ScrollTrigger
GSAP Observer
GSAP Draggable quando fizer sentido

Não utilizar bibliotecas pagas de animação.

Evitar Framer Motion/Motion, Anime.js ou outras bibliotecas
de animação.

Toda a lógica de movimento deve ser construída prioritariamente
com GSAP.

==================================================
ARQUITETURA
==================================================

Organize o projeto de maneira profissional:

src/
  components/
  animations/
    hero.ts
    text.ts
    cards.ts
    cursor.ts
    magnetic.ts
    scroll.ts
    horizontal.ts
    svg.ts
    transitions.ts
    navigation.ts
    physics.ts
  hooks/
    useGsap.ts
    useMousePosition.ts
    useScrollVelocity.ts
  utils/

Utilize:

gsap.context()
useLayoutEffect()
gsap.matchMedia()

Garanta cleanup completo das animações.

Nenhum ScrollTrigger deve permanecer ativo depois que
o componente for desmontado.

==================================================
1. HERO CINEMATOGRÁFICO
==================================================

Crie um Hero extremamente sofisticado.

Sequência inicial:

1. Background começa completamente oculto.
2. Uma máscara vertical abre lentamente.
3. Imagem principal aparece através de clip-path.
4. Imagem realiza um pequeno scale de 1.15 → 1.
5. Headline aparece palavra por palavra.
6. Algumas palavras entram de direções diferentes.
7. Linha decorativa atravessa a tela.
8. Subheadline aparece posteriormente.
9. CTA aparece por último.
10. Elementos secundários continuam se movimentando
    lentamente depois da sequência principal.

Use uma timeline mestre:

const intro = gsap.timeline()

A entrada deve parecer uma sequência cinematográfica,
não vários elementos fazendo fade-in simultaneamente.

==================================================
2. SISTEMA DE PROFUNDIDADE
==================================================

Crie múltiplas camadas:

background
midground
foreground
UI

Cada camada deve possuir uma velocidade diferente.

Durante o movimento do mouse:

background → movimento quase imperceptível
midground → movimento moderado
foreground → movimento mais perceptível
UI → resposta mínima

Crie uma sensação de câmera 3D utilizando apenas
transformações 2D.

Não utilize WebGL.

==================================================
3. MOUSE PHYSICS
==================================================

Crie um sistema global de mouse interaction.

O cursor deve possuir:

- cursor principal
- trailing cursor
- ponto interno
- halo
- estado de hover
- estado de click

Utilize gsap.quickTo() para suavizar os movimentos.

O cursor nunca deve copiar diretamente a posição do mouse.

Deve existir:

inércia
atraso
aceleração
desaceleração

Quando passar sobre:

BUTTON
→ cursor aumenta.

LINK
→ cursor muda de escala.

IMAGE
→ cursor muda de forma.

DRAGGABLE
→ cursor assume estado de interação.

==================================================
4. MAGNETIC UI
==================================================

Transforme determinados botões em elementos magnéticos.

Quando o mouse se aproxima:

- botão começa a seguir o cursor;
- intensidade depende da distância;
- texto interno pode deslocar-se em direção oposta;
- ícone reage independentemente.

Não faça simplesmente:

x = mouseX

Crie uma função baseada na distância do cursor.

O movimento deve possuir resistência e retorno elástico.

==================================================
5. SCROLL VELOCITY
==================================================

Crie um sistema que detecte velocidade do scroll.

Quando o usuário scrollar lentamente:

movimentos normais.

Quando o usuário acelerar:

- textos podem aumentar levemente sua velocidade;
- imagens podem sofrer skew;
- elementos decorativos podem reagir;
- determinadas palavras podem deslocar-se horizontalmente.

Quando o scroll parar:

tudo retorna suavemente ao estado original.

Não deixe o skew permanente.

Use GSAP para calcular e suavizar os valores.

==================================================
6. HORIZONTAL SCROLL
==================================================

Crie uma seção horizontal controlada pelo scroll vertical.

A seção deve conter grandes cards.

Enquanto o usuário scrolla:

o conteúdo se move horizontalmente.

Cada card deve possuir:

- parallax interno;
- imagem com scale;
- título independente;
- indicador de progresso;
- pequenas animações internas.

A seção deve ser pinned utilizando ScrollTrigger.

O progresso da seção deve controlar diretamente
as animações internas.

==================================================
7. TEXT DISTORTION
==================================================

Criar títulos experimentais.

Algumas palavras devem possuir:

- reveal por máscara;
- clip-path;
- deslocamento;
- blur inicial;
- scale;
- tracking;
- scramble effect.

Durante o scroll:

determinadas palavras podem deslocar-se horizontalmente
em velocidades diferentes.

Criar sensação de typography motion design.

Não destruir a legibilidade.

==================================================
8. IMAGE REVEAL
==================================================

Criar diferentes técnicas de revelação:

A:
clip-path polygon()

B:
scale + overflow hidden

C:
máscara horizontal

D:
máscara vertical

E:
imagem começa ampliada e retorna ao tamanho normal

F:
imagem aparece enquanto uma camada preta desaparece.

Cada seção deve possuir uma técnica diferente.

==================================================
9. 3D CARD INTERACTION
==================================================

Criar cards que respondam à posição do mouse.

Ao mover o cursor:

rotationX
rotationY
translateX
translateY

devem responder proporcionalmente.

Criar também:

- brilho especular falso;
- camada de highlight;
- imagem interna;
- parallax do conteúdo;
- sombra dinâmica.

Não utilizar CSS transition.

Controle o movimento através do GSAP.

Limitar rotação para evitar efeitos exagerados.

==================================================
10. SVG MORPHING
==================================================

Criar elementos SVG animados.

Utilizar GSAP para:

- strokeDasharray;
- strokeDashoffset;
- scale;
- rotation;
- opacity;
- path animation.

Criar uma linha SVG que percorre visualmente
a página durante o scroll.

Ela deve funcionar como um elemento narrativo
conectando diferentes seções.

==================================================
11. PINNED STORYTELLING
==================================================

Criar uma seção narrativa pinned.

Enquanto a seção permanece fixa:

FASE 1:
texto aparece.

FASE 2:
imagem surge.

FASE 3:
imagem aumenta.

FASE 4:
texto desaparece.

FASE 5:
novo texto aparece.

FASE 6:
imagem desloca-se.

FASE 7:
elementos secundários aparecem.

FASE 8:
a seção libera o scroll.

Tudo deve ser controlado por uma única timeline
ligada ao progresso do ScrollTrigger.

==================================================
12. DRAG INTERACTION
==================================================

Criar elementos arrastáveis.

Ao arrastar:

- elemento acompanha o cursor;
- rotação depende da velocidade;
- quando soltar, retorna suavemente;
- criar sensação de massa.

Se apropriado, utilizar Draggable.

Adicionar limites de movimentação.

==================================================
13. VELOCITY-BASED MOTION
==================================================

Crie um sistema onde a velocidade do usuário
afeta diretamente a animação.

Exemplo:

scrollVelocity = velocidade atual

Esse valor controla:

skew
scale
translation
rotation

Mas utilize damping para evitar movimentos bruscos.

O resultado deve parecer físico.

==================================================
14. PAGE TRANSITION
==================================================

Criar uma transição experimental de página.

Ao navegar:

1. conteúdo atual é congelado;
2. overlay entra;
3. overlay cobre a tela;
4. conteúdo muda;
5. overlay revela a nova página;
6. elementos da nova página começam sua animação.

A transição deve ser controlada por uma timeline.

Criar arquitetura reutilizável para React Router.

==================================================
15. NAVIGATION
==================================================

Navbar inicialmente minimalista.

Ao scroll:

- alterar altura;
- modificar background;
- aplicar blur;
- modificar opacity;
- alterar posição;
- esconder ao descer;
- revelar ao subir.

A transição deve ser imperceptível e elegante.

==================================================
16. MICROINTERAÇÕES
==================================================

Todos os elementos interativos devem possuir motion.

Buttons:
hover → scale + magnetic movement

Links:
hover → underline animado

Icons:
hover → rotation / translation

Cards:
hover → depth

Images:
hover → zoom

Menus:
entrada → stagger

Counters:
entrada → números animados

==================================================
17. RANDOMIZED MOTION
==================================================

Criar pequenos elementos decorativos.

Eles devem possuir movimentos aparentemente orgânicos.

Utilizar:

gsap.utils.random()

mas com seed/comportamento controlado quando necessário.

Nenhum movimento deve parecer completamente aleatório.

==================================================
18. RESPONSIVIDADE
==================================================

Desktop:
experiência completa.

Tablet:
reduzir complexidade.

Mobile:
manter apenas os movimentos essenciais.

Utilizar:

gsap.matchMedia()

Nunca simplesmente reduzir tudo através de CSS.

Algumas animações devem possuir versões próprias
para mobile.

==================================================
19. ACCESSIBILITY
==================================================

Implementar:

prefers-reduced-motion

Quando ativado:

- desabilitar parallax intenso;
- remover efeitos de cursor;
- reduzir transformações;
- manter apenas transições essenciais.

Nunca sacrificar acessibilidade pela animação.

==================================================
20. PERFORMANCE
==================================================

O sistema deve priorizar:

transform
opacity

Evitar layout thrashing.

Evitar manipulação excessiva de:

width
height
top
left

Utilizar:

x
y
scale
rotation
opacity

quando possível.

Não criar centenas de ScrollTriggers independentes
sem necessidade.

Utilizar timelines reutilizáveis.

==================================================
21. GSAP ADVANCED
==================================================

Explore recursos avançados do GSAP quando fizer sentido:

gsap.timeline()
ScrollTrigger
Observer
Draggable
gsap.quickTo()
gsap.quickSetter()
gsap.context()
gsap.matchMedia()
gsap.utils.mapRange()
gsap.utils.clamp()
gsap.utils.interpolate()
gsap.utils.pipe()
modifiers
snap
callbacks
labels
nested timelines

Não utilize uma API apenas para demonstrar conhecimento.

Cada recurso deve resolver um problema visual ou de interação.

==================================================
22. MOTION LANGUAGE
==================================================

Defina uma linguagem de movimento consistente.

Movimentos rápidos:
microinterações.

Movimentos médios:
UI.

Movimentos lentos:
background e storytelling.

Movimentos muito lentos:
elementos atmosféricos.

Use diferentes easings de acordo com o contexto.

Evite usar o mesmo easing em todo o projeto.

==================================================
23. "SIGNATURE EFFECT"
==================================================

Crie pelo menos UM efeito visual exclusivo.

Não quero apenas combinações de efeitos conhecidos.

Crie uma interação onde:

SCROLL + MOUSE + VELOCITY + TYPOGRAPHY + IMAGE

respondam uns aos outros.

Exemplo conceitual:

O usuário acelera o scroll.

↓ 

A tipografia sofre um deslocamento.

↓

A imagem responde com parallax.

↓

O cursor influencia um elemento próximo.

↓

A velocidade diminui.

↓

Todos os elementos retornam gradualmente ao equilíbrio.

O resultado deve parecer um sistema físico.

==================================================
24. CÓDIGO
==================================================

Escreva código real, funcional e tipado.

Não entregue pseudocódigo.

Não esconda partes importantes com:

// etc
// implementation here
// omitted

Cada animação deve estar implementada.

Use TypeScript corretamente.

Evite:

any

quando não for absolutamente necessário.

Comentários devem explicar decisões importantes,
não descrever código óbvio.

==================================================
RESULTADO FINAL
==================================================

O resultado deve parecer uma experiência digital
experimental e premium.

Não quero:

"fade in"
"slide in"
"scale in"

repetidos em todas as seções.

Quero:

ritmo
profundidade
física
continuidade
hierarquia
surpresa
precisão
cinematografia

A animação deve complementar o design.

O usuário deve sentir que a interface possui
massa, velocidade e profundidade.

IMPORTANTE:

Antes de escrever o código, analise toda a arquitetura
e defina como as animações irão conversar entre si.

Depois implemente o sistema completo em React + TypeScript.

Entregue também uma explicação de:

1. arquitetura;
2. gerenciamento de contexto GSAP;
3. ScrollTrigger;
4. mouse physics;
5. velocity system;
6. performance;
7. responsive motion;
8. accessibility;
9. cleanup;
10. como adicionar novas animações sem criar
   código duplicado.