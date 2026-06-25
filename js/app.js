/* TimeTravel Agency - logique de l'application */
(function () {
  'use strict';

  /* ===== Galerie des destinations ===== */
  var grid = document.getElementById('destGrid');
  DESTINATIONS.forEach(function (d) {
    grid.insertAdjacentHTML('beforeend',
      '<article class="dest-card reveal group rounded-2xl overflow-hidden border border-cream/10 bg-panel/60 hover:border-gold/40 transition">'
      + '<div class="relative h-64 overflow-hidden">'
      +   '<img src="' + d.img + '" alt="' + d.name + '" loading="lazy" class="card-img w-full h-full object-cover">'
      +   '<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"></div>'
      +   '<span class="absolute top-4 left-4 text-[11px] tracking-widest uppercase bg-ink/70 text-gold px-3 py-1 rounded-full border border-gold/30">' + d.tag + '</span>'
      + '</div>'
      + '<div class="p-6">'
      +   '<div class="flex items-baseline justify-between"><h3 class="font-serif text-2xl font-bold">' + d.name + '</h3><span class="text-gold/80 text-sm">' + d.year + '</span></div>'
      +   '<p class="text-cream/70 text-sm mt-3 font-light leading-relaxed">' + d.short + '</p>'
      +   '<div class="flex items-center justify-between mt-6"><span class="text-sm text-muted">des <span class="text-cream font-semibold">' + d.price + ' &euro;</span></span>'
      +   '<button data-dest="' + d.id + '" class="openModal px-4 py-2 rounded-full border border-gold/50 text-gold text-sm hover:bg-gold hover:text-ink transition">Decouvrir</button></div>'
      + '</div></article>');
  });

  /* ===== Fenetre detaillee (modale) ===== */
  var modal = document.createElement('div');
  modal.id = 'destModal';
  modal.className = 'fixed inset-0 z-[60] hidden items-center justify-center p-4 bg-ink/80 backdrop-blur-sm';
  modal.innerHTML =
    '<div class="relative glass max-w-2xl w-full rounded-2xl border border-gold/30 overflow-hidden max-h-[90vh] overflow-y-auto chat-scroll">'
    + '<button id="closeModal" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink/70 text-cream hover:text-gold">&times;</button>'
    + '<img id="mImg" class="w-full h-56 object-cover" alt="">'
    + '<div class="p-7">'
    +   '<div class="flex items-baseline justify-between"><h3 id="mTitle" class="font-serif text-3xl font-bold"></h3><span id="mYear" class="text-gold"></span></div>'
    +   '<p id="mLong" class="text-cream/75 mt-4 font-light leading-relaxed"></p>'
    +   '<h4 class="mt-6 mb-3 text-gold text-sm tracking-widest uppercase">Temps forts</h4>'
    +   '<ul id="mHigh" class="grid sm:grid-cols-2 gap-2 text-sm text-cream/80"></ul>'
    +   '<div class="mt-7 flex items-center justify-between"><span class="text-muted text-sm">A partir de <span id="mPrice" class="text-cream font-semibold"></span></span>'
    +   '<a href="#reserver" id="mBook" class="px-6 py-2 rounded-full bg-gradient-to-r from-goldlight to-gold text-ink font-semibold">Reserver cette epoque</a></div>'
    + '</div></div>';
  document.body.appendChild(modal);

  function openModal(id) {
    var d = DESTINATIONS.find(function (x) { return x.id === id; });
    document.getElementById('mImg').src = d.img;
    document.getElementById('mImg').alt = d.name;
    document.getElementById('mTitle').textContent = d.name;
    document.getElementById('mYear').textContent = d.year;
    document.getElementById('mLong').textContent = d.long;
    document.getElementById('mPrice').textContent = d.price + ' euros';
    document.getElementById('mHigh').innerHTML = d.highlights.map(function (h) {
      return '<li class="flex gap-2"><span class="text-gold">&#10022;</span>' + h + '</li>';
    }).join('');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  function closeModal() { modal.classList.add('hidden'); modal.classList.remove('flex'); }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('openModal')) openModal(e.target.getAttribute('data-dest'));
    if (e.target.id === 'closeModal' || e.target === modal) closeModal();
    if (e.target.id === 'mBook') closeModal();
  });

  /* ===== Quiz de recommandation ===== */
  var qi = 0, scores = { alexandrie: 0, kyoto: 0, tikal: 0 };
  var quizBox = document.getElementById('quizBox');

  function renderQuiz() {
    if (qi < QUIZ.length) {
      var item = QUIZ[qi];
      quizBox.innerHTML =
        '<div class="mb-5 flex items-center justify-between text-xs text-muted tracking-widest"><span>QUESTION ' + (qi + 1) + ' / ' + QUIZ.length + '</span></div>'
        + '<div class="w-full h-1 bg-cream/10 rounded mb-7"><div class="h-1 bg-gradient-to-r from-goldlight to-gold rounded" style="width:' + ((qi / QUIZ.length) * 100) + '%"></div></div>'
        + '<h3 class="font-serif text-2xl mb-6">' + item.q + '</h3>'
        + '<div class="grid gap-3">' + item.a.map(function (o) {
            return '<button data-k="' + o[1] + '" class="qopt text-left px-5 py-4 rounded-xl border border-cream/15 hover:border-gold hover:bg-gold/5 transition">' + o[0] + '</button>';
          }).join('') + '</div>';
    } else {
      var entries = Object.keys(scores).map(function (k) { return [k, scores[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
      var d = DESTINATIONS.find(function (x) { return x.id === entries[0][0]; });
      quizBox.innerHTML =
        '<div class="text-center">'
        + '<p class="text-gold tracking-widest text-xs uppercase mb-3">Votre destination ideale</p>'
        + '<h3 class="font-serif text-4xl font-bold mb-2">' + d.name + '</h3><p class="text-gold/80 mb-5">' + d.year + '</p>'
        + '<img src="' + d.img + '" class="rounded-xl mx-auto mb-5 h-44 w-full object-cover" alt="' + d.name + '">'
        + '<p class="text-cream/75 font-light mb-7">' + d.short + '</p>'
        + '<div class="flex flex-col sm:flex-row gap-3 justify-center">'
        +   '<button data-dest="' + d.id + '" class="openModal px-6 py-3 rounded-full bg-gradient-to-r from-goldlight to-gold text-ink font-semibold">En savoir plus</button>'
        +   '<button id="quizRestart" class="px-6 py-3 rounded-full border border-cream/30 hover:border-gold hover:text-gold transition">Refaire le quiz</button>'
        + '</div></div>';
    }
  }
  quizBox.addEventListener('click', function (e) {
    if (e.target.classList.contains('qopt')) { scores[e.target.getAttribute('data-k')]++; qi++; renderQuiz(); }
    if (e.target.id === 'quizRestart') { qi = 0; scores = { alexandrie: 0, kyoto: 0, tikal: 0 }; renderQuiz(); }
  });
  renderQuiz();

  /* ===== Formulaire de reservation (validation) ===== */
  var form = document.getElementById('resaForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var f = form.elements;
    function setErr(el, cond) {
      var p = el.parentElement.querySelector('.err');
      if (p) { p.classList.toggle('hidden', !cond); }
      if (cond) ok = false;
    }
    setErr(f.nom, f.nom.value.trim().length < 2);
    setErr(f.email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value));
    setErr(f.dest, f.dest.value === '');
    setErr(f.date, f.date.value === '');
    var okBox = document.getElementById('resaOk');
    if (ok) {
      okBox.textContent = 'Merci ' + f.nom.value.split(' ')[0] + ' ! Votre demande pour ' + f.dest.value + ' (' + f.pax.value + ' voyageur(s)) est enregistree. Un conseiller TimeTravel vous recontacte sous 24h.';
      okBox.classList.remove('hidden');
      form.reset();
    } else { okBox.classList.add('hidden'); }
  });

  /* ===== Chatbot Chronos (vraie IA Groq via proxy, avec repli local) ===== */
  var chatWin = document.getElementById('chatWin');
  var chatBody = document.getElementById('chatBody');
  var chatChips = document.getElementById('chatChips');
  var chatHistory = [];
  var CHAT_API = (window.TIMETRAVEL_CONFIG && window.TIMETRAVEL_CONFIG.chatApiUrl) || '';

  function toggleChat() {
    var willOpen = chatWin.classList.contains('hidden');
    if (willOpen) {
      chatWin.classList.remove('hidden');
      chatWin.classList.add('flex');
      if (chatBody.children.length === 0) botStart();
      document.getElementById('chatInput').focus();
    } else {
      chatWin.classList.add('hidden');
      chatWin.classList.remove('flex');
    }
  }
  document.getElementById('chatToggle').addEventListener('click', toggleChat);

  function addMsg(txt, who) {
    var wrap = document.createElement('div');
    wrap.className = who === 'bot' ? 'flex gap-2' : 'flex justify-end';
    wrap.innerHTML = who === 'bot'
      ? '<div class="w-7 h-7 rounded-full bg-gradient-to-br from-goldlight to-gold text-ink text-xs font-bold flex items-center justify-center shrink-0">T</div><div class="bg-panel/80 border border-cream/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[78%] text-cream/90">' + txt + '</div>'
      : '<div class="bg-gradient-to-br from-goldlight to-gold text-ink rounded-2xl rounded-tr-sm px-4 py-2 max-w-[78%]">' + txt + '</div>';
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function showTyping() {
    var t = document.createElement('div');
    t.id = 'chatTyping';
    t.className = 'flex gap-2';
    t.innerHTML = '<div class="w-7 h-7 rounded-full bg-gradient-to-br from-goldlight to-gold text-ink text-xs font-bold flex items-center justify-center shrink-0">T</div>'
      + '<div class="bg-panel/80 border border-cream/10 rounded-2xl rounded-tl-sm px-4 py-3 text-cream/60">'
      + '<span class="inline-flex gap-1"><span class="w-1.5 h-1.5 bg-cream/60 rounded-full animate-bounce"></span>'
      + '<span class="w-1.5 h-1.5 bg-cream/60 rounded-full animate-bounce" style="animation-delay:.15s"></span>'
      + '<span class="w-1.5 h-1.5 bg-cream/60 rounded-full animate-bounce" style="animation-delay:.3s"></span></span></div>';
    chatBody.appendChild(t);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function hideTyping() {
    var t = document.getElementById('chatTyping');
    if (t) t.remove();
  }
  function chips(arr) {
    chatChips.innerHTML = arr.map(function (c) {
      return '<button class="chip text-xs border border-gold/40 text-gold/90 rounded-full px-3 py-1 hover:bg-gold hover:text-ink transition">' + c + '</button>';
    }).join('');
  }
  function botStart() {
    addMsg("Bonjour et bienvenue chez TimeTravel Agency. Je suis Chronos, votre conseiller. Quelle epoque vous fait rever ?", 'bot');
    chips(['Vos destinations', 'Les prix', 'Conseille-moi', 'Comment ca marche ?']);
  }

  function localReply(msg) {
    var m = msg.toLowerCase();
    var best = null, score = 0;
    CHAT_KB.forEach(function (e) {
      var s = e.k.filter(function (k) { return m.indexOf(k) !== -1; }).length;
      if (s > score) { score = s; best = e; }
    });
    return best ? best.r : "Excellente question ! Je peux vous renseigner sur nos trois destinations (Alexandrie, Kyoto, Tikal), les prix, la securite du voyage ou la reservation. Que souhaitez-vous savoir ?";
  }

  function aiReply() {
    return fetch(CHAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory.slice(-12) })
    }).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function (data) {
      if (!data.reply) throw new Error('no reply');
      return data.reply;
    });
  }

  function handleUser(text) {
    text = (text || '').trim();
    if (!text) return;
    addMsg(text, 'me');
    chatHistory.push({ role: 'user', content: text });
    chatChips.innerHTML = '';
    showTyping();

    function finish(reply) {
      hideTyping();
      addMsg(reply, 'bot');
      chatHistory.push({ role: 'assistant', content: reply });
      chips(['Vos destinations', 'Les prix', 'Reserver']);
    }

    if (CHAT_API) {
      aiReply().then(finish).catch(function () { finish(localReply(text)); });
    } else {
      setTimeout(function () { finish(localReply(text)); }, 450);
    }
  }

  document.getElementById('chatForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inp = document.getElementById('chatInput');
    var v = inp.value;
    inp.value = '';
    handleUser(v);
  });
  chatChips.addEventListener('click', function (e) {
    if (e.target.classList.contains('chip')) handleUser(e.target.textContent);
  });

  /* ===== Navigation, menu mobile, animations au scroll ===== */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) { nav.classList.add('glass', 'shadow-lg', 'shadow-ink/40'); }
    else { nav.classList.remove('glass', 'shadow-lg', 'shadow-ink/40'); }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  document.getElementById('burger').addEventListener('click', function () {
    var m = document.getElementById('mobileMenu');
    m.classList.toggle('hidden');
    m.classList.toggle('flex');
  });
  document.querySelectorAll('#mobileMenu a').forEach(function (a) {
    a.addEventListener('click', function () {
      var m = document.getElementById('mobileMenu');
      m.classList.add('hidden');
      m.classList.remove('flex');
    });
  });

  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
