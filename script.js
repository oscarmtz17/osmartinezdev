/* ============================================================
   osmartinez.dev — script
   Tema · paleta · idioma (ES/EN) · scroll suave · reveal
   Preferencias persistidas en localStorage (con try/catch).
   ============================================================ */

const store = {
  get(k){ try{ return localStorage.getItem(k) }catch(e){ return null } },
  set(k,v){ try{ localStorage.setItem(k,v) }catch(e){} }
};
const root = document.documentElement;

/* THEME */
const savedTheme = store.get('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
document.getElementById('theme').addEventListener('click', () => {
  const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', t); store.set('theme', t);
});

/* PALETA */
const PALS = ['indigo','cobalto','esmeralda','amber'];
const palBtn = document.getElementById('palBtn'), palMenu = document.getElementById('palMenu');
function setPalette(p){
  if(!PALS.includes(p)) p = 'indigo';
  root.setAttribute('data-palette', p); store.set('palette', p);
  palMenu.querySelectorAll('.pal-opt').forEach(o => o.setAttribute('aria-checked', o.dataset.pal === p));
}
setPalette(store.get('palette') || 'indigo');
palBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = palMenu.classList.toggle('open');
  palBtn.setAttribute('aria-expanded', open);
});
palMenu.querySelectorAll('.pal-opt').forEach(o => o.addEventListener('click', () => {
  setPalette(o.dataset.pal);
  palMenu.classList.remove('open'); palBtn.setAttribute('aria-expanded', false);
}));
document.addEventListener('click', (e) => {
  if(!palMenu.contains(e.target) && e.target !== palBtn){ palMenu.classList.remove('open'); palBtn.setAttribute('aria-expanded', false) }
});
document.addEventListener('keydown', (e) => { if(e.key === 'Escape'){ palMenu.classList.remove('open'); palBtn.setAttribute('aria-expanded', false) } });

/* I18N */
const dict = {
  es:{nav_xp:"Experiencia",nav_serv:"Servicios",nav_about:"Sobre mí",nav_cta:"Hablemos",pal_title:"// paleta",
    aria_pal:"Cambiar paleta de color",aria_theme:"Cambiar tema claro u oscuro",aria_menu:"Abrir menú",
    meta_desc:"Ingeniero de software senior con más de 8 años construyendo apps móviles y web de alto tráfico. React Native, React, Node.js y .NET. Disponible para proyectos freelance.",
    hero_status:"Disponible para nuevos proyectos",
    hero_h1:"Construyo apps que usan <em>millones</em> de personas.",
    hero_lead:"Soy Oscar Martínez, ingeniero de software senior con más de 8 años construyendo aplicaciones móviles y web de alto tráfico — de Spin by OXXO a Aeroméxico. Especializado en React Native, React, Node.js y .NET.",
    hero_cta1:"Hablemos de tu proyecto →",hero_cta2:"Ver experiencia",
    meta1:"años de experiencia",meta2b:"Millones",meta2:"de usuarios alcanzados",meta3:"móvil · web · cloud",
    exp_eyebrow:"// he trabajado con",exp_head:"Ocho años entregando productos que usan millones.",xp_via:"vía",
    xp1_when:"2025 — actualidad",xp1_desc:"Desarrollo de pantallas y componentes reutilizables para la nueva app móvil de Aeroméxico, que atiende a millones de pasajeros en México y LATAM. Integración de microservicios y arquitectura limpia de nivel enterprise.",
    xp2_when:"2025 · Freelance",xp2_desc:"Diseñé y construí de punta a punta un ERP para contratistas eléctricos: backend .NET 7 con SQL Server y frontend React (PWA mobile-first). Autenticación JWT, almacenamiento en AWS S3 y despliegue con CI/CD en Ubuntu/Nginx.",
    xp3_when:"2023 — 2025",xp3_desc:"Desarrollo y mantenimiento de las apps B2C Spin Premia y Spin by OXXO, usadas por millones en México y LATAM. TDD con Jest (85%+ de cobertura por pull request) y despliegues con Firebase bajo SCRUM.",
    xp4_when:"2021 — 2023",xp4_desc:"Aplicaciones web enterprise para Sumitomo Corporation en equipos 100% remotos y en inglés. React, Redux y TypeScript, servicios en SQL Server, TDD con Jest y despliegue en Microsoft Azure.",
    xp5_when:"2019 — 2021",xp5_desc:"Soluciones logísticas de alto volumen con React, React Native, Node.js y C#/.NET. Gestión de bases de datos SQL Server y MongoDB para operaciones de alto throughput.",
    serv_eyebrow:"// qué construyo",serv_head:"Del problema al producto que aguanta producción.",
    serv1_t:"Apps móviles",serv1_d:"Apps iOS y Android con React Native, del prototipo a la tienda. La misma base con la que construí productos usados por millones.",
    serv2_t:"Aplicaciones web full-stack",serv2_d:"Front y back a medida con React/Next.js y Node.js o .NET. Arquitectura limpia y código con pruebas, no prototipos frágiles.",
    serv3_t:"Sistemas a medida y ERPs",serv3_d:"Sistemas internos, ERPs y paneles que automatizan tu operación — como el ERP que construí de cero, punta a punta, para un cliente.",
    serv4_t:"APIs, integraciones y cloud",serv4_d:"APIs REST, integraciones con terceros y despliegue en AWS o Azure con CI/CD. Todo entregado listo para producción.",
    about_eyebrow:"// sobre mí",about_head:"No solo escribo código. Entrego productos que funcionan.",
    about_p1:"Soy ingeniero de software senior con más de <strong>8 años construyendo aplicaciones móviles y web de alto tráfico</strong>. He entregado productos usados por millones de personas —Spin by OXXO, Aeroméxico— y sistemas a medida de punta a punta como freelance.",
    about_p2:"Trabajo con <strong>TDD (85%+ de cobertura)</strong>, arquitectura limpia y flujos de desarrollo aumentados con IA. Llevo más de dos años colaborando a diario con equipos de EE.UU. en entornos 100% remotos y en inglés.",
    about_p3:"Si necesitas una app, un sistema a medida o mejorar un producto existente, puedo ayudarte de principio a fin.",
    contact_eyebrow:"// contacto",contact_head:"¿Construimos <em>algo?</em>",
    contact_p:"Cuéntame qué tienes en mente. Respondo a todos los mensajes y, si no soy la persona indicada para tu proyecto, te lo diré con honestidad.",
    contact_loc:"Monterrey, México · Disponible en remoto"},
  en:{nav_xp:"Experience",nav_serv:"Services",nav_about:"About",nav_cta:"Let's talk",pal_title:"// palette",
    aria_pal:"Change color palette",aria_theme:"Toggle light or dark theme",aria_menu:"Open menu",
    meta_desc:"Senior software engineer with 8+ years building high-traffic mobile and web apps. React Native, React, Node.js and .NET. Available for freelance projects.",
    hero_status:"Available for new projects",
    hero_h1:"I build apps used by <em>millions</em>.",
    hero_lead:"I'm Oscar Martínez, a senior software engineer with 8+ years building high-traffic mobile and web applications — from Spin by OXXO to Aeroméxico. Specialized in React Native, React, Node.js and .NET.",
    hero_cta1:"Let's talk about your project →",hero_cta2:"See experience",
    meta1:"years of experience",meta2b:"Millions",meta2:"of users reached",meta3:"mobile · web · cloud",
    exp_eyebrow:"// I've worked with",exp_head:"Eight years shipping products used by millions.",xp_via:"via",
    xp1_when:"2025 — present",xp1_desc:"Building screens and reusable components for Aeroméxico's new mobile app, serving millions of passengers across Mexico and LATAM. Microservice integration and enterprise-grade clean architecture.",
    xp2_when:"2025 · Freelance",xp2_desc:"Designed and built a custom ERP for electrical contractors end-to-end: .NET 7 backend with SQL Server and a React frontend (mobile-first PWA). JWT auth, AWS S3 storage and CI/CD deployment on Ubuntu/Nginx.",
    xp3_when:"2023 — 2025",xp3_desc:"Built and maintained the B2C apps Spin Premia and Spin by OXXO, used by millions across Mexico and LATAM. TDD with Jest (85%+ coverage per pull request) and Firebase deployments under SCRUM.",
    xp4_when:"2021 — 2023",xp4_desc:"Enterprise web apps for Sumitomo Corporation in fully remote, English-speaking teams. React, Redux and TypeScript, SQL Server services, TDD with Jest and deployment to Microsoft Azure.",
    xp5_when:"2019 — 2021",xp5_desc:"High-volume logistics solutions with React, React Native, Node.js and C#/.NET. Managed SQL Server and MongoDB databases for high-throughput operations.",
    serv_eyebrow:"// what I build",serv_head:"From the problem to a product that survives production.",
    serv1_t:"Mobile apps",serv1_d:"iOS and Android apps with React Native, from prototype to store. The same foundation I used to build products used by millions.",
    serv2_t:"Full-stack web apps",serv2_d:"Custom front and back with React/Next.js and Node.js or .NET. Clean architecture and tested code, not fragile prototypes.",
    serv3_t:"Custom systems & ERPs",serv3_d:"Internal systems, ERPs and dashboards that automate your operation — like the ERP I built from scratch, end-to-end, for a client.",
    serv4_t:"APIs, integrations & cloud",serv4_d:"REST APIs, third-party integrations and deployment on AWS or Azure with CI/CD. Everything delivered production-ready.",
    about_eyebrow:"// about me",about_head:"I don't just write code. I ship products that work.",
    about_p1:"I'm a senior software engineer with <strong>8+ years building high-traffic mobile and web applications</strong>. I've shipped products used by millions —Spin by OXXO, Aeroméxico— and delivered custom systems end-to-end as a freelancer.",
    about_p2:"I work with <strong>TDD (85%+ coverage)</strong>, clean architecture and AI-augmented development workflows. For 2+ years I've collaborated daily with US teams in fully remote, English-speaking environments.",
    about_p3:"If you need an app, a custom system or to improve an existing product, I can help you end to end.",
    contact_eyebrow:"// contact",contact_head:"Let's build <em>something?</em>",
    contact_p:"Tell me what you have in mind. I reply to every message and, if I'm not the right person for your project, I'll tell you honestly.",
    contact_loc:"Monterrey, Mexico · Available remotely"}
};

function applyLang(l){
  root.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if(dict[l][k] != null) el.textContent = dict[l][k] });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { const k = el.getAttribute('data-i18n-html'); if(dict[l][k] != null) el.innerHTML = dict[l][k] });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { const k = el.getAttribute('data-i18n-aria'); if(dict[l][k] != null) el.setAttribute('aria-label', dict[l][k]) });
  const md = document.querySelector('meta[name="description"]'); if(md && dict[l].meta_desc) md.setAttribute('content', dict[l].meta_desc);
  document.getElementById('lang').textContent = (l === 'es' ? 'EN' : 'ES');
  document.title = (l === 'es' ? "Oscar Martínez — Ingeniero de Software Senior" : "Oscar Martínez — Senior Mobile & Fullstack Engineer");
}
let lang = store.get('lang') || 'en'; applyLang(lang);
document.getElementById('lang').addEventListener('click', () => { lang = lang === 'es' ? 'en' : 'es'; store.set('lang', lang); applyLang(lang) });

/* MISC */
document.getElementById('year').textContent = new Date().getFullYear();
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12); onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

const burger = document.getElementById('burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.classList.toggle('open', o); burger.setAttribute('aria-expanded', o) });
function closeMenu(){ menu.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', false) }

const rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href');
  const target = id.length > 1 ? document.querySelector(id) : null;
  if(target){ e.preventDefault(); const y = target.getBoundingClientRect().top + window.pageYOffset - 76; window.scrollTo({top:Math.max(0,y), behavior: rm ? 'auto' : 'smooth'}) }
  closeMenu();
}));

const io = new IntersectionObserver((ents) => { ents.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target) } }) }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
