Agora adicione uma camada avançada de motion design.

Utilize GSAP para criar uma sensação de "physical interface".

Os elementos devem parecer possuir:
- massa;
- inércia;
- aceleração;
- desaceleração;
- profundidade;
- resistência;
- continuidade.

Utilize:
- gsap.timeline()
- ScrollTrigger
- gsap.quickTo()
- gsap.matchMedia()
- gsap.context()
- modifiers quando necessário
- CustomEase quando disponível
- Observer para interações de gesto quando apropriado

Crie movimentos com diferentes curvas de velocidade.

Não utilize apenas:
ease: "power2.out"

Varie entre:
power2
power3
power4
expo
circ
back
elastic

Use elastic e back apenas em situações onde façam sentido.

Crie relações entre elementos.

Exemplo:
quando o usuário move o mouse sobre uma imagem,
o título, imagem, sombra e elemento decorativo devem responder
com pequenas diferenças de velocidade.

Isso deve criar uma sensação de profundidade parallax.

Para elementos que seguem o mouse:
não faça o elemento simplesmente copiar mouseX/mouseY.

Utilize interpolação e atraso para criar sensação física.

Para transições de seção:
o elemento que sai deve possuir uma trajetória diferente
do elemento que entra.

Evite simplesmente:

opacity: 0 → 1
y: 50 → 0

Combine propriedades de forma mais sofisticada:

opacity
y
x
scale
rotation
clipPath
filter

mas mantenha cada composição visualmente controlada.