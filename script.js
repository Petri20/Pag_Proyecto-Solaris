// Menú Móvil
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconBars = document.getElementById('menu-icon-bars');
    const iconClose = document.getElementById('menu-icon-close');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      iconBars.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconBars.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });

    // Simulador Interactivo
    function setSimMode(mode) {
      const btnSol = document.getElementById('btn-mode-sol');
      const btnCorte = document.getElementById('btn-mode-corte');
      const btnNoche = document.getElementById('btn-mode-noche');
      
      const nodePaneles = document.getElementById('node-paneles');
      const nodeRegulador = document.getElementById('node-regulador');
      const nodeBateria = document.getElementById('node-bateria');
      const nodeHogar = document.getElementById('node-hogar');

      const descPaneles = document.getElementById('desc-paneles');
      const descRegulador = document.getElementById('desc-regulador');
      const descBateria = document.getElementById('desc-bateria');
      const descHogar = document.getElementById('desc-hogar');

      // Reset styles
      [btnSol, btnCorte, btnNoche].forEach(b => {
        b.className = "hover-lift-sm px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-solaris-blue border border-slate-300 cursor-pointer transition";
      });

      if (mode === 'sol') {
        btnSol.className = "hover-lift-sm px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#48D448] text-white shadow-xs cursor-pointer transition";
        descPaneles.textContent = "Generando potencia máxima en corriente continua (DC).";
        descRegulador.textContent = "Convierte y regula con eficiencia óptima hacia la vivienda.";
        descBateria.textContent = "Cargándose con el excedente energético limpio.";
        descHogar.textContent = "Alimentado por solar directa con red estable.";
      } else if (mode === 'corte') {
        btnCorte.className = "hover-lift-sm px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#48D448] text-white shadow-xs cursor-pointer transition";
        descPaneles.textContent = "Generando normalmente desde los módulos solares.";
        descRegulador.textContent = "Detecta el corte de red y activa el modo Back-Up en 0ms.";
        descBateria.textContent = "Sosteniendo los consumos críticos del hogar al instante.";
        descHogar.textContent = "Cero cortes: heladera y luces operando con normalidad.";
      } else {
        btnNoche.className = "hover-lift-sm px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#48D448] text-white shadow-xs cursor-pointer transition";
        descPaneles.textContent = "Sin radiación solar nocturna (Descanso).";
        descRegulador.textContent = "Inversor en modo inversor puro desde acumulación.";
        descBateria.textContent = "Entregando la energía almacenada durante el día.";
        descHogar.textContent = "Iluminación, heladera y confort nocturno asegurados.";
      }
    }

    // Carrito y Presupuesto
    let cart = [];
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCounter = document.getElementById('cart-counter');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');

    document.getElementById('cart-open-btn').addEventListener('click', () => toggleCart(true));

    function toggleCart(open) {
      if (open) {
        cartDrawer.classList.remove('hidden');
      } else {
        cartDrawer.classList.add('hidden');
      }
    }

    function addToCart(name, price, code) {
      const existing = cart.find(i => i.code === code);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, code, qty: 1 });
      }
      updateCartUI();
      toggleCart(true);
    }

    function removeFromCart(code) {
      cart = cart.filter(i => i.code !== code);
      updateCartUI();
    }

    function updateCartUI() {
      const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
      cartCounter.textContent = totalItems;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-slate-400 text-xs italic text-center py-8">Tu presupuesto está vacío. Agrega equipos desde el catálogo.</p>';
        cartTotalPrice.textContent = 'U$S 0';
        return;
      }

      let html = '';
      let total = 0;
      cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        html += `
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <h5 class="font-bold text-solaris-blue text-xs uppercase">${item.name}</h5>
              <span class="text-[11px] text-slate-500">Cód: ${item.code} &bull; U$S ${item.price} c/u</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200">x${item.qty}</span>
              <button onclick="removeFromCart('${item.code}')" class="text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer">✕</button>
            </div>
          </div>
        `;
      });

      cartItemsContainer.innerHTML = html;
      cartTotalPrice.textContent = `U$S ${total.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    function checkoutWhatsApp() {
      if (cart.length === 0) return;
      let text = "Hola Proyecto Solaris, quisiera solicitar un presupuesto formal con los siguientes equipos:\n\n";
      let total = 0;
      cart.forEach(item => {
        const sub = item.price * item.qty;
        total += sub;
        text += `- ${item.qty}x ${item.name} (Cód: ${item.code}) - Subtotal: U$S ${sub.toFixed(2)}\n`;
      });
      text += `\n*Total Estimado Presupuesto: U$S ${total.toFixed(2)}*\nQuedo a la espera de coordinar detalles e instalación.`;
      
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/5492227563370?text=${encoded}`, '_blank');
    }

    // Filtros de Catálogo
    function filterCatalog(category) {
      document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.getAttribute('data-cat') === category) {
          btn.className = "cat-btn px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-solaris-blue text-white shadow-xs transition cursor-pointer";
        } else {
          btn.className = "cat-btn px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition cursor-pointer";
        }
      });

      document.querySelectorAll('.product-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        if (category === 'todos' || cat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Acordeón FAQ
    function toggleFaq(id) {
      const body = document.getElementById(`faq-body-${id}`);
      const icon = document.getElementById(`faq-icon-${id}`);
      body.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
    }

    // === SISTEMA DE ANIMACIÓN AL HACER SCROLL (SEGURO, ROBUSTO Y FLUIDO) ===
    function triggerReveal(element) {
      element.classList.add('is-revealed');
      const children = element.querySelectorAll('.split-line-child');
      children.forEach(c => {
        c.style.transform = 'translateY(0)';
        c.style.opacity = '1';
      });
    }

    function initScrollAnimations() {
      const revealElements = document.querySelectorAll('.reveal-item, .split-line-mask');

      // 1. REVELACIÓN INMEDIATA DE ELEMENTOS VISIBLES EN PANTALLA INICIAL (ABOVE-THE-FOLD)
      const vh = window.innerHeight || document.documentElement.clientHeight;
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.92) {
          triggerReveal(el);
        }
      });

      // 2. INTERSECTION OBSERVER CON UMBRAL ÁGIL (threshold: 0.05)
      if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              triggerReveal(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          root: null,
          rootMargin: '0px 0px -20px 0px',
          threshold: 0.05
        });

        revealElements.forEach(el => {
          if (!el.classList.contains('is-revealed')) {
            revealObserver.observe(el);
          }
        });
      }

      // 3. RESPALDO DIRECTO POR EVENTO SCROLL
      function handleScrollCheck() {
        const currentVh = window.innerHeight || document.documentElement.clientHeight;
        revealElements.forEach(el => {
          if (!el.classList.contains('is-revealed')) {
            const rect = el.getBoundingClientRect();
            if (rect.top < currentVh * 0.95) {
              triggerReveal(el);
            }
          }
        });
      }
      window.addEventListener('scroll', handleScrollCheck, { passive: true });

      // 4. TIMEOUT DE SEGURIDAD: Garantiza que nada quede oculto si el visor demora el render
      setTimeout(() => {
        revealElements.forEach(el => {
          if (!el.classList.contains('is-revealed')) {
            triggerReveal(el);
          }
        });
      }, 1200);

      // === EFECTO PARALLAX SUTIL (GPU-ACCELERATED) ===
      const heroParallax = document.getElementById('hero-parallax-img');
      const simParallax = document.getElementById('sim-parallax-video');
      const systemsParallax = document.getElementById('systems-parallax-img');
      const bombeoParallax = document.getElementById('bombeo-parallax-img');

      if (simParallax) {
        simParallax.muted = true;
        simParallax.defaultMuted = true;
        const ensureVideoPlaying = () => {
          const promise = simParallax.play();
          if (promise !== undefined) {
            promise.catch(() => {
              const resume = () => {
                simParallax.play();
                window.removeEventListener('click', resume);
                window.removeEventListener('scroll', resume);
              };
              window.addEventListener('click', resume, { once: true });
              window.addEventListener('scroll', resume, { once: true });
            });
          }
        };
        ensureVideoPlaying();
      }

      let ticking = false;

      function updateParallax() {
        const viewHeight = window.innerHeight;

        // Hero Parallax
        if (heroParallax) {
          const heroSec = document.getElementById('inicio');
          if (heroSec) {
            const rect = heroSec.getBoundingClientRect();
            if (rect.top <= viewHeight && rect.bottom >= 0) {
              const offset = Math.round(rect.top * -0.08);
              heroParallax.style.transform = `scale(1.22) translate3d(0, ${offset}px, 0)`;
            }
          }
        }

        // Simulador Video Parallax
        if (simParallax) {
          const simSec = document.getElementById('simulador');
          if (simSec) {
            const rect = simSec.getBoundingClientRect();
            if (rect.top <= viewHeight && rect.bottom >= 0) {
              const offset = Math.round((rect.top - viewHeight * 0.25) * -0.05);
              simParallax.style.transform = `scale(1.08) translate3d(0, ${offset}px, 0)`;
            }
          }
        }

        // Sistemas Parallax
        if (systemsParallax) {
          const sysSec = document.getElementById('sistemas');
          if (sysSec) {
            const rect = sysSec.getBoundingClientRect();
            if (rect.top <= viewHeight && rect.bottom >= 0) {
              const offset = Math.round((rect.top - viewHeight * 0.25) * -0.05);
              systemsParallax.style.transform = `scale(1.05) translate3d(0, ${offset}px, 0)`;
            }
          }
        }

        // Bombeo Parallax
        if (bombeoParallax) {
          const bomSec = document.getElementById('campo-bombeo');
          if (bomSec) {
            const rect = bomSec.getBoundingClientRect();
            if (rect.top <= viewHeight && rect.bottom >= 0) {
              const offset = Math.round((rect.top - viewHeight * 0.25) * -0.05);
              bombeoParallax.style.transform = `scale(1.08) translate3d(0, ${offset}px, 0)`;
            }
          }
        }

        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });

      updateParallax();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
      initScrollAnimations();
    }