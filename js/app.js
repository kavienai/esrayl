/* ══════════════════════════════════
   TAB LOGIC
══════════════════════════════════ */
function showTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  event.target.classList.add('active');
  if (tab === 'kavram') setTimeout(initKavramMap, 30);
  if (tab === 'kutuphane') setTimeout(renderKutuphane, 10);
  if (tab === 'dersler') setTimeout(renderDersler, 10);
}

/* ══════════════════════════════════
   PANEL 1: PROGRAMLAR
══════════════════════════════════ */
let currentProg = 'gsu-isletme';

function showProg(progId, btn) {
  currentProg = progId;
  document.querySelectorAll('.prog-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProg();
}

function renderProg() {
  const p = PROGRAMLAR[currentProg];
  const content = document.getElementById('prog-content');

  const hocaCards = p.hocalar.map(h => `
    <div class="hoca-card">
      <div class="hoca-unvan">${h.unvan}</div>
      <div class="hoca-ad">${h.ad}</div>
      <div class="hoca-alan">${h.alan}</div>
      <div class="hoca-sinerji">✦ ${h.sinerji}</div>
      <div class="hoca-links">
        <a class="hoca-link" href="${h.scholar}" target="_blank" rel="noopener">Scholar ↗</a>
        <a class="hoca-link" href="${h.avesis}" target="_blank" rel="noopener">Avesis ↗</a>
      </div>
    </div>
  `).join('');

  const kozTags = p.kozlar.map(k => `<span class="koz-tag">${k}</span>`).join('');

  content.innerHTML = `
    <div class="section-title">${p.ad}</div>
    <div class="section-sub">Mülakat stratejisi ve hoca profilleri</div>

    <div class="strategy-card">
      <h3>⚖️ Jüri Profili</h3>
      <p>${p.juri}</p>
    </div>
    <div class="strategy-card">
      <h3>🎯 Temel Strateji</h3>
      <p>${p.strateji}</p>
    </div>
    <div class="strategy-card">
      <h3>🃏 Öne Çıkaracağın Kozlar</h3>
      <div class="koz-tags">${kozTags}</div>
    </div>

    <div class="cumle-box">
      <div class="cumle-label">⚡ Mülakat Kırılma Cümlesi</div>
      <p>"${p.cumle}"</p>
    </div>

    <div style="margin-top:24px; margin-bottom:12px; font-size:14px; font-weight:700; color:var(--text);">Çalışmak İstediğin Hocalar</div>
    <div class="hoca-grid">${hocaCards}</div>
  `;
}

/* ══════════════════════════════════
   PANEL 2: MÜLAKAT
══════════════════════════════════ */
let simProg = 'itu-isletme';
let simTip = 'hepsi';

function simSetProg(prog, btn) {
  simProg = prog;
  document.querySelectorAll('.sim-prog-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSim();
}

function simSetTip(tip, btn) {
  simTip = tip;
  document.querySelectorAll('.sim-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSim();
}

function renderSim() {
  const main = document.getElementById('sim-main');
  const sorular = MULAKAT_SORULARI[simProg] || [];
  const filtered = simTip === 'hepsi' ? sorular : sorular.filter(s => s.tip === simTip);
  const progAd = PROGRAMLAR[simProg]?.ad || simProg;

  const tipRenk = { genel: 'tip-genel', teknik: 'tip-teknik', stres: 'tip-stres', motivasyon: 'tip-motivasyon' };
  const tipLabel = { genel: 'Genel', teknik: 'Teknik', stres: 'Stres', motivasyon: 'Motivasyon' };

  const soruHTML = filtered.map((s, i) => `
    <div class="soru-card" id="sim-q-${i}" onclick="toggleSoru('sim-q-${i}')">
      <div class="soru-header">
        <div class="soru-num">${i + 1}</div>
        <div class="soru-meta">
          <div class="soru-tip ${tipRenk[s.tip]}">${tipLabel[s.tip]}</div>
          <div class="soru-text">${s.soru}</div>
        </div>
        <div class="soru-toggle">▾</div>
      </div>
      <div class="soru-body">
        <div class="cevap-label">Cevap Stratejisi</div>
        <div class="cevap-text">${s.cevap}</div>
        <div class="cevap-ipucu">${s.ipucu}</div>
      </div>
    </div>
  `).join('');

  main.innerHTML = `
    <div class="jury-bar">
      <div class="jury-dots">
        <div class="jury-dot active"></div>
        <div class="jury-dot"></div>
        <div class="jury-dot"></div>
      </div>
      <div class="jury-label">Jüri aktif — ${filtered.length} soru hazır</div>
      <div class="jury-prog">${progAd}</div>
    </div>
    ${filtered.length === 0
      ? '<div class="empty-state"><div class="empty-icon">🤔</div><div class="empty-text">Bu filtre için soru bulunamadı</div></div>'
      : soruHTML
    }
  `;
}

function toggleSoru(id) {
  document.getElementById(id).classList.toggle('open');
}

/* ══════════════════════════════════
   PANEL 3: BİLİMSEL
══════════════════════════════════ */
let currentKonu = 'istatistik';

function showKonu(konuId, btn) {
  currentKonu = konuId;
  document.querySelectorAll('.konu-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBilim();
}

function renderBilim() {
  const k = BILIMSEL_KONULAR[currentKonu] || (BILIM_EKTENSIF && BILIM_EKTENSIF[currentKonu]);
  if (!k) return;

  const main = document.getElementById('bilim-main');
  const sorular = k.sorular || k.konular || [];

  const diffLabel = { easy: '●', med: '●', hard: '●' };
  const diffTitle = { easy: 'Temel', med: 'Orta', hard: 'İleri' };

  const soruHTML = sorular.map((s, i) => `
    <div class="soru-bilim" id="bil-q-${i}" onclick="toggleBilim('bil-q-${i}')">
      <div class="soru-bilim-header">
        <div class="diff-dot diff-${s.zorluk}" title="${diffTitle[s.zorluk]}"></div>
        <div class="soru-bilim-text">${s.soru}</div>
        <div class="soru-bilim-toggle">▾</div>
      </div>
      <div class="soru-bilim-body">
        <div class="cevap-iskelet">${s.cevap}</div>
        <div>${s.kavramlar.map(kv => `<span class="kavram-tag">${kv}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');

  const total = sorular.length;
  main.innerHTML = `
    <div class="section-title">${k.ad || k.baslik}</div>
    <div class="section-sub">${k.aciklama || ''}</div>
    <div class="prog-bar-wrap">
      <div class="prog-bar-label">${total} soru · <span style="color:var(--green)">●</span> Temel &nbsp;<span style="color:#ff9f43">●</span> Orta &nbsp;<span style="color:var(--red)">●</span> İleri</div>
    </div>
    ${soruHTML}
  `;
}

function toggleBilim(id) {
  document.getElementById(id).classList.toggle('open');
}

/* ══════════════════════════════════
   PANEL 4: KAVRAM HARİTASI
══════════════════════════════════ */
const KM_NODES = [
  // MERKEZ
  { id:'c', type:'center', label:'Esra\nAsma Kaya', x:400, y:300, r:44, color:'#C9A84C',
    name:'Esra Asma Kaya', desc:'Endüstri Mühendisi · CRM & Growth Uzmanı · YL Adayı. Hipodrom.com, Poca ve B2Metric deneyimini akademik araştırmayla birleştirme hedefi. 5 programda sektör deneyimi ile akademik zemin kesişiyor.', tools:['Shell','Hipodrom.com','Poca','B2Metric','Podcast'], conns:['ist','ml','paz','crm','muh','oyun','mcdm','ar','sek','hedef'] },
  // ALAN HUBLARİ — 8 hub, radyal 155px (800×600 tasarım uzayı)
  { id:'ist',  type:'hub', label:'İstatistik\n& Analiz',   x:400, y:145, r:36, color:'#4A90D9',
    name:'İstatistik & Analiz', desc:'Tüm programların ortak zemini. SEM, faktör analizi, regresyon ve A/B testi. Ulun Akturan ve Orhan Feyzioğlu (GSÜ), Elif Karaosmanoğlu (İTÜ) yöntem repertuvarının çekirdeği.', tools:['SPSS','R lavaan','AMOS','Python scipy'], conns:['sem','abt','fa','c'] },
  { id:'ml',   type:'hub', label:'Makine\nÖğrenmesi',      x:510, y:190, r:36, color:'#00cec9',
    name:'Makine Öğrenmesi & Veri Bilimi', desc:'Tahminsel modelleme, sınıflandırma ve kümeleme. B2Metric deneyiminin teorik zemini. İTÜ EM\'de Başar Öztayşi ve S. Emre Alptekin\'in, GSÜ EM\'de Alptekin\'in alanı.', tools:['Python sklearn','XGBoost','TensorFlow','B2Metric'], conns:['xgb','kmeans','feat','c'] },
  { id:'paz',  type:'hub', label:'Pazarlama\n& Tüketici',  x:555, y:300, r:36, color:'#e05c5c',
    name:'Pazarlama & Tüketici Araştırması', desc:'Tüketici davranışı, marka yönetimi ve dijital pazarlama teorileri. GSÜ İşletme (Dinçer, Akturan) ve İTÜ İşletme Müh. (Burnaz, Karaosmanoğlu, Ertemel) programlarının çekirdeği.', tools:['Google Analytics 4','Meta Ads','Insider','HubSpot'], conns:['tuk','marka','dijpaz','c'] },
  { id:'crm',  type:'hub', label:'CRM\n& Büyüme',          x:510, y:415, r:36, color:'#ff9f43',
    name:'CRM & Büyüme Stratejileri', desc:'Müşteri ilişkileri yönetimi, LTV maximizasyonu, churn azaltımı. Hipodrom.com ve B2Metric deneyiminin akademik karşılığı. İTÜ İşletme Müh. ve Müh. Yönetimi programlarıyla örtüşür.', tools:['Salesforce','B2Metric','Insider','Mixpanel'], conns:['ltv','rfm','churn','c'] },
  { id:'muh',  type:'hub', label:'Müh.\nYönetimi',         x:400, y:460, r:36, color:'#a78bfa',
    name:'Mühendislik Yönetimi', desc:'Ürün yönetimi, mühendislik ekonomisi, ROMI ve yeni ürün geliştirme. İTÜ MY programının özü. Tolga Kaya (İnovasyon), Fethi Çalışır (UX) ve Erhan Çankal\'ın (Müh. Ekonomisi) alanı.', tools:['OKR araçları','Jira','Excel Solver','ROI modelleme'], conns:['romi','npd','yo','c'] },
  { id:'oyun', type:'hub', label:'Oyun\nTeorisi',          x:290, y:415, r:36, color:'#fd79a8',
    name:'Oyun Teorisi', desc:'Rakip oyuncular arasındaki stratejik etkileşimlerin matematiksel modellenmesi. GSÜ EM\'de A. Çağrı Tolga\'nın uzmanlığı. Rekabetçi fiyatlandırma ve sinyal mekanizmaları.', tools:['Gambit','Python nashpy','Mathematica'], conns:['nash','fiyat','sinyal','c'] },
  { id:'mcdm', type:'hub', label:'MCDM\nYöntemleri',       x:245, y:300, r:36, color:'#3dd68c',
    name:'MCDM Yöntemleri', desc:'Çok Kriterli Karar Verme. GSÜ EM\'de Gülçin Büyüközkan\'ın dünya çapında atıf alan alanı. İTÜ EM\'de Özgür Kabak ile grup karar verme ve veri güdümlü optimizasyon.', tools:['Expert Choice','Python ahpy','MATLAB'], conns:['ahp','topsis','fuzzy','c'] },
  { id:'ar',   type:'hub', label:'Araştırma\nMetodolojisi',x:290, y:190, r:36, color:'#74b9ff',
    name:'Araştırma Metodolojisi', desc:'Bilimsel araştırma tasarımı, ölçek geliştirme ve akademik yazım. Tüm programların tez sürecinin omurgası. Paradigmalar: pozitivist, yorumlayıcı, pragmatist.', tools:['Qualtrics','NVIVO','Mendeley','LaTeX'], conns:['nicel','nitel','karma','c'] },
  // ÇOCUK — İstatistik (hub 400,145)
  { id:'sem',    type:'child', parent:'ist',  label:'SEM',         x:315, y:58,  r:27, color:'#4A90D9',
    name:'Yapısal Eşitlik Modellemesi (SEM)', desc:'Gizil değişkenler arası nedensel ilişkileri test eder. CFA + yapısal model bileşimi. Fit: CFI>0.95, RMSEA<0.08. Elif Karaosmanoğlu\'nun temel yöntemi. Marka değeri ve tüketici tutumu araştırmalarının standardı.', tools:['AMOS','R lavaan','Mplus'], conns:['ist','fa','nicel'] },
  { id:'abt',    type:'child', parent:'ist',  label:'A/B Testi',   x:400, y:40,  r:27, color:'#4A90D9',
    name:'A/B Testi (Kontrollü Deney)', desc:'H₀: gruplar arasında fark yok. α=0.05, güç=%80 ile n = 2σ²(z_α+z_β)²/δ². Min. 2 hafta. CVR, CTR, revenue/user metrikleri. Hipodrom\'daki CRM kampanyalarında bizzat uygulandı.', tools:['Python scipy.stats','R','Google Optimize'], conns:['ist','sem'] },
  { id:'fa',     type:'child', parent:'ist',  label:'Faktör\nAnalizi', x:482, y:60, r:27, color:'#4A90D9',
    name:'Faktör Analizi (EFA / CFA)', desc:'EFA gizil faktörleri keşfeder; CFA önceden belirlenen yapıyı doğrular. KMO>0.70, Bartlett p<0.05. Cronbach α>0.70. AVE ve CR ile yakınsak-ıraksak geçerlilik. SEM\'in ön adımı.', tools:['SPSS','R psych','AMOS'], conns:['ist','sem','nicel'] },

  // ÇOCUK — ML (hub 510,190)
  { id:'xgb',    type:'child', parent:'ml',   label:'XGBoost\n/ Ensemble', x:532, y:100, r:27, color:'#00cec9',
    name:'XGBoost & Gradient Boosting', desc:'Zayıf öğrenicilerin sıralı birleşimiyle güçlü model. SHAP değerleriyle yorumlanabilirlik. Dengesiz veride güçlü. Churn ve CLV tahmininde endüstri standardı. B2Metric altyapısında yaygın kullanım.', tools:['Python xgboost','LightGBM','SHAP'], conns:['ml','kmeans','feat','churn'] },
  { id:'kmeans', type:'child', parent:'ml',   label:'K-Means\nKümeleme',   x:594, y:140, r:27, color:'#00cec9',
    name:'K-Means Kümeleme', desc:'Denetimsiz kümeleme. k merkez rastgele → WCSS minimumuyla yakınsama. k seçimi: Elbow & Silhouette. RFM skoru feature olarak → güçlü müşteri segmentasyonu. Başar Öztayşi\'nin araştırma alanıyla örtüşür.', tools:['Python sklearn','R','MATLAB'], conns:['ml','xgb','feat','rfm'] },
  { id:'feat',   type:'child', parent:'ml',   label:'Feature\nEng.',       x:616, y:212, r:27, color:'#00cec9',
    name:'Feature Engineering', desc:'Ham veriden anlamlı değişkenler türetme. CRM\'de kritik: recency, frequency, monetary, oturum süresi, kampanya açma oranı, lag değişkenleri, rolling ortalamalar. Modelin başarısını belirleyen en kritik adım.', tools:['Python pandas','Feature-engine'], conns:['ml','xgb','kmeans'] },

  // ÇOCUK — Pazarlama (hub 555,300)
  { id:'tuk',    type:'child', parent:'paz',  label:'Tüketici\nDavranışı', x:646, y:258, r:27, color:'#e05c5c',
    name:'Tüketici Davranışı Teorisi', desc:'Satın alma kararı süreci (Kotler 5 aşama). Theory of Planned Behavior (Ajzen 1991), Theory of Reasoned Action. Self-congruity, tüketici kimliği. GSÜ İşletme\'nin entelektüel derinliğinin özü.', tools:['Anket (Likert)','Odak Grup','SEM'], conns:['paz','marka','dijpaz'] },
  { id:'marka',  type:'child', parent:'paz',  label:'Marka\nYönetimi',     x:652, y:308, r:27, color:'#e05c5c',
    name:'Marka Yönetimi', desc:'Keller\'ın CBBE modeli: sadakat, farkındalık, algılanan kalite, çağrışımlar. Kurumsal kimlik-tüketici uyumu. SEM ile marka değeri ölçümü. Elif Karaosmanoğlu ve Caner Dinçer\'in temel alanı.', tools:['Anket+SEM','SPSS','NPS'], conns:['paz','tuk','dijpaz','sem'] },
  { id:'dijpaz', type:'child', parent:'paz',  label:'Dijital\nPazarlama',  x:644, y:360, r:27, color:'#e05c5c',
    name:'Dijital Pazarlama & Growth', desc:'SEO/SEM, sosyal medya, içerik pazarlaması. Attribution: last-click → data-driven. Funnel optimizasyonu, CRO, growth hacking. ROAS, CPC, CTR, CVR metrikleri. Adnan Veysel Ertemel\'in uzmanlığı.', tools:['Google Analytics 4','Meta Ads','Insider','SEMrush'], conns:['paz','crm','ml'] },

  // ÇOCUK — CRM (hub 510,415)
  { id:'ltv',    type:'child', parent:'crm',  label:'LTV / CLV',   x:580, y:488, r:27, color:'#ff9f43',
    name:'Customer Lifetime Value (CLV/LTV)', desc:'LTV = AOV × Frekans × Müşteri Ömrü. LTV/CAC ≥ 3 sürdürülebilirlik kıstası. Cohort analizi ile segmente göre LTV. Payback period: CAC\'ı geri kazanma süresi. Hipodrom\'da temel operasyonel metrik.', tools:['Python','SQL','Tableau'], conns:['crm','rfm','churn'] },
  { id:'rfm',    type:'child', parent:'crm',  label:'RFM\nAnalizi', x:530, y:524, r:27, color:'#ff9f43',
    name:'RFM Segmentasyon', desc:'Recency / Frequency / Monetary. "Champions", "At Risk", "Lost" segmentleri. K-means ile kombine: RFM skoru feature olarak modele girer. CRM\'nin klasik ve güçlü çerçevesi.', tools:['Python pandas','SQL','Power BI'], conns:['crm','ltv','churn','kmeans'] },
  { id:'churn',  type:'child', parent:'crm',  label:'Churn\nTahmini', x:436, y:492, r:27, color:'#ff9f43',
    name:'Churn Tahmini', desc:'İkili sınıflandırma: XGBoost ile %85+ doğruluk. SMOTE ile dengesiz sınıf çözümü. Değerlendirme: AUC-ROC, F1. Risk skoru → early warning sistemi. B2Metric entegrasyonunda bizzat uygulandı.', tools:['Python sklearn','XGBoost','B2Metric'], conns:['crm','ltv','rfm','xgb'] },

  // ÇOCUK — Müh. Yönetimi (hub 400,460) — YENİ GRUP
  { id:'romi',   type:'child', parent:'muh',  label:'ROMI\n& KPI',   x:310, y:530, r:27, color:'#a78bfa',
    name:'ROMI & Pazarlama Metrikleri', desc:'Return on Marketing Investment = (Pazarlama Kaynaklı Gelir − Maliyet) / Maliyet × 100. Attribution modeling şart. OKR çerçevesi: niteliksel Objective + ölçülebilir Key Results. Hipodrom\'da canlı izlendi.', tools:['Attribution araçları','Excel','Power BI'], conns:['muh','npd','yo','crm'] },
  { id:'npd',    type:'child', parent:'muh',  label:'NPD\n& İnovasyon', x:396, y:556, r:27, color:'#a78bfa',
    name:'Yeni Ürün Geliştirme & İnovasyon', desc:'Product-Market Fit: Sean Ellis testi (≥%40 "Çok Üzülürdüm"). Retention curve düzleşmesi ve NPS. Agile: Sprint, Backlog Grooming, MoSCoW. Tolga Kaya\'nın İTÜ MY araştırma alanı. Poca\'da uygulandı.', tools:['Jira','Productboard','Miro'], conns:['muh','romi','yo'] },
  { id:'yo',     type:'child', parent:'muh',  label:'Yöneylem\nAraştırması', x:476, y:536, r:27, color:'#a78bfa',
    name:'Yöneylem Araştırması (OR)', desc:'Doğrusal programlama, tamsayılı programlama, simülasyon. Kısıtlar altında optimizasyon. Pazarlama bütçesi tahsisat optimizasyonu: hangi kanala ne kadar? İTÜ EM müfredatının çekirdeği.', tools:['CPLEX','Gurobi','Python PuLP','ARENA'], conns:['muh','mcdm','romi'] },

  // ÇOCUK — Oyun Teorisi (hub 290,415)
  { id:'nash',   type:'child', parent:'oyun', label:'Nash\nDengesi',   x:204, y:492, r:27, color:'#fd79a8',
    name:'Nash Dengesi', desc:'Hiçbir oyuncunun tek taraflı faydasını artıramayacağı denge noktası (John Nash 1950). Saf/karma strateji dengesi. Fiyatlandırma, reklam bütçesi, pazar paylaşımı ve tedarik koordinasyonunda uygulanır.', tools:['Gambit','Python nashpy'], conns:['oyun','fiyat','sinyal'] },
  { id:'fiyat',  type:'child', parent:'oyun', label:'Fiyat\nStratejisi', x:184, y:408, r:27, color:'#fd79a8',
    name:'Rekabetçi Fiyatlandırma', desc:'Bertrand (fiyat) ve Cournot (miktar) oyunları. Stackelberg lider-takipçi modeli. Yıkıcı ve limit fiyatlandırma. Tekrarlanan oyunlarda tit-for-tat işbirliği. Dinamik fiyatlandırma algoritmalarının teorik zemini.', tools:['Excel Solver','Python','Gambit'], conns:['oyun','nash','sinyal'] },
  { id:'sinyal', type:'child', parent:'oyun', label:'Sinyal\nTeorisi',  x:204, y:325, r:27, color:'#fd79a8',
    name:'Sinyal Teorisi', desc:'Michael Spence (Nobel 2001). Asimetrik bilgi altında güvenilir sinyal gönderme. Marka kalitesi sinyali: garanti, sertifika, premium fiyat. Tüketici güveni oluşturma mekanizmaları.', tools:['Matematiksel modelleme','Oyun ağacı'], conns:['oyun','nash','marka'] },

  // ÇOCUK — MCDM (hub 245,300)
  { id:'ahp',    type:'child', parent:'mcdm', label:'AHP',           x:148, y:248, r:27, color:'#3dd68c',
    name:'Analitik Hiyerarşi Süreci (AHP)', desc:'Thomas Saaty (1970). İkili karşılaştırma matrisleriyle kriter ağırlıklandırma. CR<0.10 tutarlılık şartı. Tedarikçi seçimi, strateji önceliklendirme. Gülçin Büyüközkan\'ın ana yöntemi.', tools:['Expert Choice','Python ahpy','SuperDecisions'], conns:['mcdm','topsis','fuzzy'] },
  { id:'topsis', type:'child', parent:'mcdm', label:'TOPSIS',        x:145, y:300, r:27, color:'#3dd68c',
    name:'TOPSIS Yöntemi', desc:'Pozitif ideale en yakın, negatif ideale en uzak alternatif seçilir. Öklid mesafesi, normalize karar matrisi. Marka değerlendirme, tedarikçi analizi. Özgür Kabak veri güdümlü optimizasyon çalışmalarında kullanır.', tools:['Python','MATLAB','Excel VBA'], conns:['mcdm','ahp','fuzzy'] },
  { id:'fuzzy',  type:'child', parent:'mcdm', label:'Bulanık\nMantık', x:148, y:352, r:27, color:'#3dd68c',
    name:'Bulanık Mantık (Fuzzy Logic)', desc:'"İyi", "Çok İyi" gibi dilsel ifadeleri [0,1] üyelik dereceleriyle işler. Üçgen/trapez üyelik fonksiyonları. Bulanık AHP/TOPSIS hibrit yöntemlerin temeli. Gülçin Büyüközkan\'ın dünya çapında atıf alan çalışmalarının odağı.', tools:['MATLAB Fuzzy Toolbox','Python scikit-fuzzy'], conns:['mcdm','ahp','topsis'] },

  // ÇOCUK — Araştırma (hub 290,190)
  { id:'nicel',  type:'child', parent:'ar',   label:'Nicel\nAraştırma', x:200, y:190, r:27, color:'#74b9ff',
    name:'Nicel Araştırma', desc:'Anket, deney, içerik analizi. Büyük örneklem, genelleştirme hedefi. Pozitivist paradigma. Cronbach α>0.70, CFA ile yapı geçerliliği. SPSS/R/Python ile analiz. Tez için baskın yöntem.', tools:['SPSS','R','Qualtrics','SurveyMonkey'], conns:['ar','nitel','karma','sem','fa'] },
  { id:'nitel',  type:'child', parent:'ar',   label:'Nitel\nAraştırma', x:225, y:124, r:27, color:'#74b9ff',
    name:'Nitel Araştırma', desc:'Derinlemesine mülakat, odak grup, etnografi, söylem analizi. Küçük örneklem, keşifsel. İnşacı/yorumlayıcı paradigma. Temasal analiz, grounded theory, fenomenoloji.', tools:['NVIVO','Atlas.ti','Zoom kayıt'], conns:['ar','nicel','karma'] },
  { id:'karma',  type:'child', parent:'ar',   label:'Karma\nYöntem',    x:290, y:98,  r:27, color:'#74b9ff',
    name:'Karma Yöntem Araştırması', desc:'Nicel + nitel entegrasyonu. Sequential explanatory (önce nicel → nitel açıklama), concurrent triangulation. Triangulation ile güçlü doğrulama. Tez için zengin ve ikna edici çıktı üretir.', tools:['SPSS + NVIVO birlikte'], conns:['ar','nicel','nitel'] },

  // HUB — Sektör Deneyimi (top-left arasında, 335°)
  { id:'sek', type:'hub', label:'Sektör\nDeneyimi', x:338, y:162, r:36, color:'#f0a500',
    name:'Sektör Deneyimi', desc:'Esra\'nın 5 yıllık iş deneyimi mülakatta en güçlü kozu. Her deneyim farklı bir akademik alana kapı açıyor: Shell → marka/sadakat, Hipodrom → CRM/churn, Poca → ürün yönetimi, B2Metric → ML uygulama.', tools:['Shell','Hipodrom.com','Poca','B2Metric','Insider'], conns:['shell','hipodrom','poca','c','crm','ml','paz'] },
  { id:'shell',    type:'child', parent:'sek', label:'Shell\nSadakat',   x:252, y:92,  r:27, color:'#f0a500',
    name:'Shell — Sadakat Programı Analizi', desc:'Küresel B2C sadakat programlarının analizi ve tüketici deneyimi yönetimi. Marka değeri araştırması için doğrudan saha verisi. GSÜ İşletme jürisinde Aaker & Keller modellerine bağlanabilir. Mülakat kozu: "Shell\'de küresel ölçekte tüketici davranışı gözlemledim."', tools:['CRM araçları','Excel','Raporlama'], conns:['sek','marka','tuk'] },
  { id:'hipodrom', type:'child', parent:'sek', label:'Hipodrom\n+ B2Metric', x:332, y:62, r:27, color:'#f0a500',
    name:'Hipodrom.com + B2Metric', desc:'LTV maximizasyonu, churn tahmini (XGBoost), CRM kampanyaları, ROI optimizasyonu. B2Metric ile ML modellerini pratikte kurdu. Bu deneyim İTÜ EM ve İTÜ İşletme jürisi için en güçlü teknik koz. "Akademik bilgiyi pratikte uyguladım" yerine "pratiği teoride çözmek istiyorum."', tools:['B2Metric','SQL','Python','Tableau'], conns:['sek','churn','ltv','rfm','xgb','feat'] },
  { id:'poca',     type:'child', parent:'sek', label:'Poca\n+ Podcast', x:418, y:72,  r:27, color:'#f0a500',
    name:'Poca & Podcast "Düşünüyorum Öyleyse Açım"', desc:'Poca\'da ürün yönetimi: Agile, Sprint, Backlog Grooming, Insider kampanyaları, CAC/LTV dengesi. Podcast: parasosyal ilişki teorisi, hitabet, amfide ders anlatma pratiği. GSÜ jürisi için "hem araştırmacı hem olgu" pozisyonu.', tools:['Insider','Jira','Podcast ekipmanı','Meta Ads'], conns:['sek','npd','romi','tuk','marka'] },

  // HUB — Akademik Hedef & Tez (between crm and muh, ~160°)
  { id:'hedef', type:'hub', label:'Akademik\nHedef & Tez', x:455, y:446, r:36, color:'#c678dd',
    name:'Akademik Hedef & Tez Vizyonu', desc:'Esra\'nın yüksek lisans ve doktora hedefi. Her program için farklı tez önerisi hazırlandı. Ortak tema: sektör verisi + akademik yöntem + danışman uzmanlığı üçgeni.', tools:['Google Scholar','Mendeley','LaTeX'], conns:['tez-itu','tez-gsu','doktora','c','ar','ml','crm'] },
  { id:'tez-itu',  type:'child', parent:'hedef', label:'İTÜ\nTez Konusu', x:538, y:510, r:27, color:'#c678dd',
    name:'İTÜ Tez Önerileri', desc:'İTÜ İşletme Müh.: "Dijital platformlarda ML tabanlı dinamik churn modeli ve kişiselleştirilmiş tutundurma stratejileri." İTÜ EM: "Pazarlama bütçesi optimizasyonu: MCDM ve Doğrusal Programlama hibrit modeli." İTÜ MY: "NPD süreçlerinde büyük veri destekli PMF tahmini."', tools:['Hipodrom verisi','Python','MCDM araçları'], conns:['hedef','tez-gsu','churn','mcdm','yo'] },
  { id:'tez-gsu',  type:'child', parent:'hedef', label:'GSÜ\nTez Konusu', x:458, y:540, r:27, color:'#c678dd',
    name:'GSÜ Tez Önerileri', desc:'GSÜ İşletme: "Dijital sadakat platformlarında beklenti-gerçeklik uyuşmazlığının e-perakendecilik satın alma niyetine etkisi (SEM)." GSÜ EM: "Müşteri segmentlerin MCDM ve bulanık AHP ile dinamik yönetimi ve CLV etkisi."', tools:['AMOS/lavaan','Hipodrom+Shell verisi'], conns:['hedef','tez-itu','sem','fuzzy','ltv'] },
  { id:'doktora',  type:'child', parent:'hedef', label:'Doktora\n& Kariyer', x:370, y:520, r:27, color:'#c678dd',
    name:'Doktora Hedefi & Kariyer Vizyonu', desc:'YL → Doktora → Akademisyen yolu. SSCI/SCI-E hedef dergiler: Journal of Marketing Research, IJRM, Computers in Human Behavior. Motivasyon sorusuna cevap: "Akademi, sektör gözlemlerimi bilimsel literatüre dönüştüreceğim tek ortam." Doktora taahhüdü jüri için kritik sinyal.', tools:['Google Scholar','SSCI dergiler','Mendeley'], conns:['hedef','tez-itu','tez-gsu','ar'] },
];

const KM_EDGES = [];
KM_NODES.forEach(n => {
  (n.conns || []).forEach(target => {
    const exists = KM_EDGES.some(e => (e.from===n.id&&e.to===target)||(e.from===target&&e.to===n.id));
    if (!exists) KM_EDGES.push({ from: n.id, to: target });
  });
});

let kmSelected = null;
let kmInited = false;
let kmResizeTimer;

function initKavramMap() {
  if (kmInited) return;
  kmInited = true;
  renderKavramMap();
  window.addEventListener('resize', () => {
    clearTimeout(kmResizeTimer);
    kmResizeTimer = setTimeout(renderKavramMap, 150);
  });
}

function renderKavramMap() {
  const svg = document.getElementById('kavram-svg');
  if (!svg) return;
  const W = svg.clientWidth, H = svg.clientHeight;
  if (!W || !H) return;

  const sx = x => x * W / 800;
  const sy = y => y * H / 600;
  const ns = 'http://www.w3.org/2000/svg';

  // Defs
  let defsHTML = `
    <filter id="km-glow"><feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="km-glow-sm"><feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  `;
  KM_NODES.filter(n => n.type !== 'child').forEach(n => {
    defsHTML += `<radialGradient id="kmg-${n.id}" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${n.color}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${n.color}" stop-opacity="0.45"/>
    </radialGradient>`;
  });

  // Background dots
  let bgHTML = '';
  for (let gx = 40; gx < 800; gx += 50)
    for (let gy = 30; gy < 600; gy += 50)
      bgHTML += `<circle cx="${sx(gx).toFixed(1)}" cy="${sy(gy).toFixed(1)}" r="1.2" fill="#1e3a5f" opacity="0.5"/>`;

  // Edges
  let edgeHTML = '';
  KM_EDGES.forEach(e => {
    const from = KM_NODES.find(n => n.id === e.from);
    const to   = KM_NODES.find(n => n.id === e.to);
    if (!from || !to) return;
    const isSel = kmSelected && (e.from === kmSelected || e.to === kmSelected);
    const isCenter = from.type==='center' || to.type==='center';
    const isChild  = from.type==='child'  || to.type==='child';
    const connNode = isSel ? (e.from===kmSelected ? to : from) : null;
    const stroke = isSel ? connNode.color : isCenter ? '#2a4a6e' : '#1a3050';
    const opacity = isSel ? 1 : isCenter ? 0.7 : isChild ? 0.45 : 0.55;
    const width  = isSel ? (isCenter?2.5:1.8) : (isCenter?1.5:1);
    const dash   = (!isCenter && !isSel) ? 'stroke-dasharray="3 4"' : '';
    const glow   = isSel ? 'filter="url(#km-glow-sm)"' : '';
    edgeHTML += `<line x1="${sx(from.x).toFixed(1)}" y1="${sy(from.y).toFixed(1)}" x2="${sx(to.x).toFixed(1)}" y2="${sy(to.y).toFixed(1)}" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="${width}" ${dash} ${glow}/>`;
  });

  // Nodes
  let nodeHTML = '';
  KM_NODES.forEach(n => {
    const isSel  = kmSelected === n.id;
    const isConn = kmSelected && !isSel && (KM_NODES.find(x=>x.id===kmSelected)?.conns||[]).includes(n.id);
    const isDim  = kmSelected && !isSel && !isConn && n.id !== 'c';
    const cx = sx(n.x).toFixed(1), cy = sy(n.y).toFixed(1);
    const r  = (sx(n.r) * (isSel ? 1.12 : 1)).toFixed(1);

    let circleAttrs = '';
    if (n.type === 'center') {
      circleAttrs = `fill="url(#kmg-c)" stroke="${n.color}" stroke-width="2" filter="url(#km-glow)"`;
    } else if (n.type === 'hub') {
      const fill = isDim ? '#121e30' : isSel ? n.color : `url(#kmg-${n.id})`;
      circleAttrs = `fill="${fill}" stroke="${n.color}" stroke-width="${isSel?2.5:1.5}" stroke-opacity="${isDim?0.2:1}" fill-opacity="${isDim?0.35:1}" ${isDim?'':'filter="url(#km-glow-sm)"'}`;
    } else {
      const fill = isSel ? n.color : isConn ? n.color+'33' : '#0f1d30';
      circleAttrs = `fill="${fill}" stroke="${n.color}" stroke-width="1.5" stroke-opacity="${isDim?0.15:isConn?0.8:0.55}" fill-opacity="${isDim?0.25:1}"`;
    }

    // Glow ring on selected
    const ring = isSel ? `<circle cx="${cx}" cy="${cy}" r="${(parseFloat(r)+9).toFixed(1)}" fill="none" stroke="${n.color}" stroke-width="2" stroke-opacity="0.35" filter="url(#km-glow)"/>` : '';

    // Text
    const lines = n.label.split('\n');
    const fs = n.type==='center' ? 12 : n.type==='hub' ? 11 : 10;
    const fw = n.type==='child' ? 600 : 700;
    const lh = n.type==='child' ? sy(11) : sy(14);
    const textColor = isDim ? '#1e3a5f' : (n.type==='child' && !isSel && !isConn) ? n.color : '#fff';
    const startY = parseFloat(cy) - (lines.length-1) * lh / 2;
    const textHTML = lines.map((ln,i) =>
      `<text x="${cx}" y="${(startY + i*lh).toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="${fs}" font-weight="${fw}" font-family="-apple-system,Segoe UI,system-ui,sans-serif" fill="${textColor}" pointer-events="none">${ln}</text>`
    ).join('');

    nodeHTML += `<g data-id="${n.id}" cursor="pointer" onclick="selectKMNode('${n.id}',event)">${ring}<circle cx="${cx}" cy="${cy}" r="${r}" ${circleAttrs}/>${textHTML}</g>`;
  });

  svg.innerHTML = `<defs>${defsHTML}</defs><g>${bgHTML}</g><g>${edgeHTML}</g><g>${nodeHTML}</g>`;
  svg.onclick = (e) => { if (e.target === svg) selectKMNode(null, e); };
  buildKMLegend();
}

function buildKMLegend() {
  const el = document.getElementById('km-legend');
  if (!el) return;
  const items = [
    {color:'#C9A84C',label:'Profil'},{color:'#4A90D9',label:'İstatistik'},
    {color:'#a78bfa',label:'MCDM'},{color:'#e05c5c',label:'Pazarlama'},
    {color:'#ff9f43',label:'CRM'},{color:'#3dd68c',label:'Araştırma'},
    {color:'#fd79a8',label:'Oyun T.'},{color:'#00cec9',label:'Makine Ö.'},
  ];
  el.innerHTML = items.map(i=>`<div class="km-leg-item"><div class="km-leg-dot" style="background:${i.color}"></div><span>${i.label}</span></div>`).join('');
}

function selectKMNode(id, e) {
  if (e) e.stopPropagation();
  kmSelected = (kmSelected === id) ? null : id;
  renderKavramMap();
  updateKMDetail(kmSelected);
}

function updateKMDetail(id) {
  const panel = document.getElementById('kavram-detail');
  if (!id) {
    panel.innerHTML = `<div class="kd-placeholder"><div class="kd-pl-icon">🗺️</div><div class="kd-pl-text">Bir kavrama veya alana tıkla — açıklama, araçlar ve bağlantılı kavramlar burada görünecek.</div></div>`;
    return;
  }
  const node = KM_NODES.find(n => n.id === id);
  if (!node) return;
  const typeLabel = node.type==='center' ? 'Profil' : node.type==='hub' ? 'Alan' : 'Kavram / Yöntem';
  const connNodes = (node.conns||[]).map(cid=>KM_NODES.find(n=>n.id===cid)).filter(Boolean);
  panel.innerHTML = `
    <div>
      <div class="kd-badge" style="background:${node.color}22;border:1px solid ${node.color}55;color:${node.color}">${typeLabel}</div>
      <div class="kd-name">${node.name}</div>
      <div class="kd-desc">${node.desc}</div>
      ${node.tools ? `<div class="kd-sec">Araçlar & Yazılımlar</div><div class="kd-chips">${node.tools.map(t=>`<div class="kd-chip">${t}</div>`).join('')}</div>` : ''}
      ${connNodes.length ? `<div class="kd-sec" style="margin-top:6px">Bağlantılı Kavramlar</div><div class="kd-conns">${connNodes.map(cn=>`<div class="kd-conn" onclick="selectKMNode('${cn.id}',event)"><div class="kd-conn-dot" style="background:${cn.color}"></div><span>${cn.name||cn.label.replace('\n',' ')}</span></div>`).join('')}</div>` : ''}
    </div>`;
}

/* ══════════════════════════════════
   PANEL 5: KÜTÜPHANE
══════════════════════════════════ */
const KUTUPHANE = [
  // ── TEORİLER ──
  { id:'tpb', tip:'teori', ad:'Theory of Planned Behavior', yazar:'Icek Ajzen, 1991', alanlar:['pazarlama','arastirma'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.'], renk:'#e05c5c',
    desc:'Davranışsal niyet → tutum + öznel norm + algılanan davranışsal kontrol. Tüketici satın alma, dijital platform benimsetme ve sürdürülebilir tüketim araştırmalarında SEM ile en çok test edilen teorilerden biri.',
    anahtar:['tutum','niyet','davranış','SEM uygulaması'] },
  { id:'tam', tip:'teori', ad:'Technology Acceptance Model (TAM)', yazar:'Fred Davis, 1989', alanlar:['pazarlama','ml'], programlar:['İTÜ EM','İTÜ İşletme Müh.'], renk:'#00cec9',
    desc:'Algılanan kullanışlılık ve kullanım kolaylığı → teknoloji kabul niyeti. Fethi Çalışır\'ın UX ve Kullanılabilirlik Mühendisliği araştırmalarının teorik zemini. E-ticaret ve m-ticaret çalışmalarında standart.',
    anahtar:['kullanışlılık','kullanım kolaylığı','TAM2','SEM','e-ticaret'] },
  { id:'cbbe', tip:'teori', ad:'Customer-Based Brand Equity (CBBE)', yazar:'Kevin Lane Keller, 1993', alanlar:['pazarlama'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.'], renk:'#e05c5c',
    desc:'Piramit modeli: farkındalık → çağrışımlar → algılanan kalite → sadakat → marka rezonansı. Tüketici perspektifinden marka değerini ölçer. SEM ile marka değeri-satın alma niyeti ilişkisini test etmek için yaygın.',
    anahtar:['marka değeri','brand resonance','sadakat','SEM'] },
  { id:'nash_t', tip:'teori', ad:'Nash Dengesi Teorisi', yazar:'John Forbes Nash, 1950 (Nobel 1994)', alanlar:['oyun'], programlar:['GSÜ EM'], renk:'#fd79a8',
    desc:'Hiçbir oyuncunun tek taraflı strateji değiştirerek faydasını artıramayacağı denge noktası. Saf ve karma strateji dengesi. Fiyatlandırma, reklam bütçesi tahsisi ve pazar paylaşımı oyunlarında uygulanır.',
    anahtar:['denge','saf strateji','karma strateji','Prisoner\'s Dilemma'] },
  { id:'sinyal_t', tip:'teori', ad:'Sinyal Teorisi', yazar:'Michael Spence, 1973 (Nobel 2001)', alanlar:['oyun','pazarlama'], programlar:['GSÜ EM','GSÜ İşletme'], renk:'#fd79a8',
    desc:'Asimetrik bilgi altında kalite sinyali gönderme. Garanti, sertifika ve premium fiyat güvenilir sinyal olarak işler. Marka değeri araştırmalarında: "neden kaliteli ürünler daha fazla reklam yapar?" sorusunun cevabı.',
    anahtar:['asimetrik bilgi','güvenilir sinyal','marka kalitesi','garanti'] },
  { id:'prospect', tip:'teori', ad:'Prospect Theory (Beklenti Teorisi)', yazar:'Kahneman & Tversky, 1979 (Nobel 2002)', alanlar:['pazarlama','crm'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.'], renk:'#e05c5c',
    desc:'İnsanlar kazanımlardan çok kayıpları daha güçlü hisseder (loss aversion). Referans noktasına göre değerlendirme. Fiyatlandırmada: "indirim" yerine "kayıptan kaçınma" çerçevesi. CRM\'de churn iletişiminde etkin.',
    anahtar:['loss aversion','referans noktası','çerçeveleme','fiyatlandırma'] },
  { id:'rbv', tip:'teori', ad:'Resource-Based View (RBV)', yazar:'Jay Barney, 1991', alanlar:['muhyonetim'], programlar:['İTÜ Müh. Yönetimi'], renk:'#a78bfa',
    desc:'Firmalar VRIN (Valuable, Rare, Inimitable, Non-substitutable) kaynaklara sahip olduğunda sürdürülebilir rekabet avantajı kazanır. Ürün yönetimi ve inovasyon stratejisinin teorik zemini.',
    anahtar:['VRIN','sürdürülebilir avantaj','dinamik yetenekler','Teece'] },
  { id:'doi', tip:'teori', ad:'Diffusion of Innovation', yazar:'Everett Rogers, 1962', alanlar:['pazarlama','muhyonetim'], programlar:['İTÜ Müh. Yönetimi','İTÜ İşletme Müh.'], renk:'#a78bfa',
    desc:'Yeniliklerin sosyal sistem içinde yayılma süreci: Innovators → Early Adopters → Early Majority → Late Majority → Laggards. S-eğrisi. Ürün benimseme hızı, kritik kütle ve chasm (uçurum) kavramları.',
    anahtar:['S-eğrisi','chasm','erken benimseyen','ağ etkisi'] },
  { id:'elm', tip:'teori', ad:'Elaboration Likelihood Model (ELM)', yazar:'Petty & Cacioppo, 1986', alanlar:['pazarlama'], programlar:['GSÜ İşletme'], renk:'#e05c5c',
    desc:'İkna: merkezi rota (derin bilişsel işleme) ve çevresel rota (yüzeysel ipucu). Yüksek ilgili tüketiciler argümanla, düşük ilgililerse mesaj kaynağı ve duygusal ipuçlarıyla ikna olur. Reklam etkinliği araştırmalarının temeli.',
    anahtar:['ikna','merkezi rota','çevresel rota','reklam etkinliği'] },
  { id:'sdl', tip:'teori', ad:'Service-Dominant Logic (SDL)', yazar:'Vargo & Lusch, 2004', alanlar:['pazarlama','crm'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.'], renk:'#e05c5c',
    desc:'Değer üreticide değil tüketici deneyiminde yaratılır (value-in-use). Müşteri ortak-üreticidir (co-creator). CRM\'de müşteriyi "alıcı" değil "deneyim ortağı" olarak görmek. SaaS ve abonelik modellerinin teorik zemini.',
    anahtar:['value-in-use','co-creation','hizmet ekosistemi','kaynak entegrasyonu'] },
  { id:'ceq', tip:'teori', ad:'Customer Equity Theory', yazar:'Blattberg & Deighton 1996 / Rust et al. 2000', alanlar:['crm','pazarlama'], programlar:['İTÜ İşletme Müh.','İTÜ Müh. Yönetimi'], renk:'#ff9f43',
    desc:'Firma değeri = müşteri tabanının toplam LTV\'si. Üç sürücü: Value Equity + Brand Equity + Relationship Equity. LTV modelinin stratejik teorik çerçevesi. Blattberg\'in Müşteri Varlığı kavramının akademik zemini.',
    anahtar:['LTV','CLV','müşteri varlığı','marka değeri entegrasyonu'] },
  { id:'sit', tip:'teori', ad:'Social Identity Theory', yazar:'Tajfel & Turner, 1979', alanlar:['pazarlama'], programlar:['GSÜ İşletme'], renk:'#e05c5c',
    desc:'Kişiler sosyal gruba aidiyetle kimlik oluşturur; "biz" ve "onlar" ayrımı. Marka topluluğu (brand community) araştırmalarının temeli. Tüketici neden belirli markayı kimliğiyle özdeşleştirir?',
    anahtar:['grup aidiyeti','marka kimliği','brand community','fan kültürü'] },

  // ── YÖNTEMLER ──
  { id:'sem_y', tip:'yontem', ad:'Yapısal Eşitlik Modellemesi (SEM)', yazar:'Jöreskog & Sörbom, 1970\'ler', alanlar:['istatistik','arastirma','pazarlama'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.','GSÜ EM'], renk:'#4A90D9',
    desc:'Gizil değişkenler arası nedensel ilişkileri eş zamanlı test eder. CFA + path analysis. Fit: CFI>0.95, TLI>0.95, RMSEA<0.08, SRMR<0.08. AVE>0.50 yakınsak geçerlilik. AMOS veya R lavaan ile uygulanır.',
    anahtar:['CFA','path analysis','fit indeksleri','gizil değişken','AMOS','AVE'] },
  { id:'ahp_y', tip:'yontem', ad:'Analitik Hiyerarşi Süreci (AHP)', yazar:'Thomas Saaty, 1970', alanlar:['mcdm'], programlar:['GSÜ EM','İTÜ EM'], renk:'#3dd68c',
    desc:'Hiyerarşik yapıda kriter ve alternatiflerin ikili karşılaştırmasıyla ağırlık hesaplar. CR<0.10 tutarlılık. Belirsizliği Bulanık AHP ile aşmak mümkün. Tedarikçi seçimi, strateji önceliklendirme, pazar seçimi.',
    anahtar:['ikili karşılaştırma','CR','özdeğer','Bulanık AHP'] },
  { id:'topsis_y', tip:'yontem', ad:'TOPSIS', yazar:'Hwang & Yoon, 1981', alanlar:['mcdm'], programlar:['GSÜ EM','İTÜ EM'], renk:'#3dd68c',
    desc:'Pozitif ideal çözüme en yakın, negatif ideal çözüme en uzak alternatif seçilir. Öklid mesafesiyle hesaplanır. Normalize karar matrisi + ağırlıklı matris. AHP ile hibrit: AHP ağırlıkları → TOPSIS sıralaması.',
    anahtar:['ideal çözüm','Öklid mesafesi','normalize matris','AHP-TOPSIS hibrit'] },
  { id:'fuzzy_y', tip:'yontem', ad:'Bulanık Mantık (Fuzzy Sets)', yazar:'Lotfi Zadeh, 1965', alanlar:['mcdm','ml'], programlar:['GSÜ EM','İTÜ EM'], renk:'#3dd68c',
    desc:'Belirsiz ve dilsel verileri [0,1] üyelik dereceleriyle işler. Bulanık AHP ve Bulanık TOPSIS ile belirsizlik modellenir. Gülçin Büyüközkan\'ın uluslararası atıf alan çalışmalarının odak noktası.',
    anahtar:['üyelik fonksiyonu','dilsel değişken','Bulanık AHP','defuzzification'] },
  { id:'abt_y', tip:'yontem', ad:'A/B Testi (Kontrollü Deney)', yazar:'Ronald Fisher, 1930\'lar', alanlar:['istatistik','pazarlama','crm'], programlar:['İTÜ İşletme Müh.','İTÜ EM'], renk:'#4A90D9',
    desc:'Rastgele atanmış kontrol ve deney grubu. H₀: t-test veya chi-kare ile test edilir. Güç analizi: n = 2σ²(z_α+z_β)²/δ². Min. 2 hafta. CVR, CTR, revenue/user. Hipodrom\'da CRM kampanyalarında bizzat uygulandı.',
    anahtar:['hipotez testi','p-değeri','güç analizi','örneklem','CVR'] },
  { id:'km_y', tip:'yontem', ad:'K-Means Kümeleme', yazar:'MacQueen, 1967', alanlar:['ml','crm'], programlar:['İTÜ EM','GSÜ EM'], renk:'#00cec9',
    desc:'Denetimsiz öğrenme. k merkez rastgele başlatılır, WCSS minimumuyla yakınsanır. k seçimi: Elbow (WCSS dirseği) ve Silhouette skoru. RFM feature\'larıyla müşteri segmentasyonunda yaygın.',
    anahtar:['WCSS','centroid','Elbow method','Silhouette','RFM segmentasyon'] },
  { id:'xgb_y', tip:'yontem', ad:'XGBoost & Gradient Boosting', yazar:'Chen & Guestrin, 2016', alanlar:['ml','crm'], programlar:['İTÜ EM','GSÜ EM'], renk:'#00cec9',
    desc:'Sıralı zayıf öğrenci birleşimi. Gradient descent ile artık hatayı düzeltir. L1/L2 regularization ile overfitting kontrolü. SHAP değerleriyle özellik önemi. Churn, CLV, dönüşüm tahmininde endüstri standardı.',
    anahtar:['gradient descent','regularization','SHAP','overfitting','ensemble'] },
  { id:'reg_y', tip:'yontem', ad:'Regresyon Analizi', yazar:'Galton & Pearson, 1880\'ler', alanlar:['istatistik','pazarlama'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.','GSÜ EM'], renk:'#4A90D9',
    desc:'OLS doğrusal regresyon: β katsayıları, R², F-testi, VIF (çoklu doğrusallık). Lojistik regresyon: ikili çıktılar için odds ratio yorumlama. Medyasyon ve moderasyon analizleri (PROCESS makrosu).',
    anahtar:['OLS','lojistik regresyon','medyasyon','moderasyon','PROCESS','VIF'] },
  { id:'fa_y', tip:'yontem', ad:'Faktör Analizi (EFA/CFA)', yazar:'Spearman 1904 / Jöreskog 1969', alanlar:['istatistik','arastirma'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.'], renk:'#4A90D9',
    desc:'EFA: veri güdümlü gizli faktör keşfi; Varimax (ortogonal) veya Oblimin (oblique) rotasyon. CFA: teorik yapıyı doğrulama. KMO>0.70, Bartlett p<0.05. AVE>0.50 ve CR>0.70 ile yakınsak geçerlilik.',
    anahtar:['EFA','CFA','Varimax','KMO','AVE','Composite Reliability'] },
  { id:'rfm_y', tip:'yontem', ad:'RFM Analizi', yazar:'Hughes, 1994', alanlar:['crm','ml'], programlar:['İTÜ İşletme Müh.','İTÜ Müh. Yönetimi'], renk:'#ff9f43',
    desc:'Recency / Frequency / Monetary skorları ile müşteri segmentasyonu. K-means ile birleştirilerek 4-6 küme oluşturulur. "Champions", "Loyal", "At Risk", "Hibernating", "Lost" segmentleri.',
    anahtar:['recency','frequency','monetary','segmentasyon','K-means'] },
  { id:'churn_y', tip:'yontem', ad:'Churn Tahmini & Survival Analizi', yazar:'Reichheld 1996 / Kaplan-Meier 1958', alanlar:['crm','ml'], programlar:['İTÜ EM','İTÜ İşletme Müh.'], renk:'#ff9f43',
    desc:'İkili sınıflandırma: ayrılacak/kalmayacak. Dengesiz veri: SMOTE oversampling. Değerlendirme: AUC-ROC, F1, Precision-Recall (accuracy değil!). Survival analizi: Kaplan-Meier ile müşteri yaşam süresi tahmini.',
    anahtar:['AUC-ROC','SMOTE','Kaplan-Meier','erken uyarı','risk skoru'] },
  { id:'conjoint', tip:'yontem', ad:'Conjoint Analizi', yazar:'Green & Rao, 1971', alanlar:['pazarlama','arastirma'], programlar:['GSÜ İşletme','İTÜ İşletme Müh.'], renk:'#e05c5c',
    desc:'Tüketicilerin özellik düzeyleri arasındaki tercihini ölçerek "part-worth" fayda değeri hesaplar. Choice-based conjoint (CBC) gerçekçi satın alma senaryoları oluşturur. Yeni ürün özellik önceliklendirme ve fiyat elastikiyeti.',
    anahtar:['part-worth','CBC','fiyat elastikiyeti','özellik önceliklendirme'] },
  { id:'lp', tip:'yontem', ad:'Doğrusal Programlama', yazar:'George Dantzig, 1947 (Simplex)', alanlar:['muhyonetim','mcdm'], programlar:['İTÜ EM','İTÜ Müh. Yönetimi'], renk:'#a78bfa',
    desc:'Kısıtlar altında doğrusal amaç fonksiyonu optimizasyonu. Simplex yöntemi, dual problem, gölge fiyat (shadow price), duyarlılık analizi. Pazarlama bütçesi tahsisat ve reklam kanalı optimizasyonu.',
    anahtar:['simplex','kısıt','dual problem','shadow price','bütçe optimizasyonu'] },
  { id:'montecarlo', tip:'yontem', ad:'Monte Carlo Simülasyonu', yazar:'Metropolis & Ulam, 1940\'lar', alanlar:['muhyonetim','istatistik'], programlar:['İTÜ EM','İTÜ Müh. Yönetimi'], renk:'#a78bfa',
    desc:'Belirsiz parametrelere rastgele değer atayarak çok sayıda senaryo çalıştırma. Proje risk analizi, yatırım getirisi dağılımı, stokastik talep modelleme. Pazarlama kampanyası ROMI tahmininde etkin.',
    anahtar:['stokastik modelleme','senaryo analizi','risk dağılımı','örnekleme'] },
];

let kutTip = 'hepsi', kutAlanAktif = 'hepsi';

function kutFilter(tip, btn) {
  kutTip = tip;
  document.querySelectorAll('.kut-sidebar .kut-filter-btn').forEach(b => {
    const m = b.getAttribute('onclick');
    if (m && m.startsWith('kutFilter')) b.classList.remove('active');
  });
  btn.classList.add('active');
  renderKutuphane();
}

function kutAlan(alan, btn) {
  kutAlanAktif = alan;
  document.querySelectorAll('.kut-sidebar .kut-filter-btn').forEach(b => {
    const m = b.getAttribute('onclick');
    if (m && m.startsWith('kutAlan')) b.classList.remove('active');
  });
  btn.classList.add('active');
  renderKutuphane();
}

function renderKutuphane() {
  const grid = document.getElementById('kut-grid');
  const countEl = document.getElementById('kut-count');
  const q = (document.getElementById('kut-search')?.value || '').toLowerCase();
  if (!grid) return;

  const filtered = KUTUPHANE.filter(item => {
    const tipOk = kutTip === 'hepsi' || item.tip === kutTip;
    const alanOk = kutAlanAktif === 'hepsi' || item.alanlar.includes(kutAlanAktif);
    const queryOk = !q || item.ad.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || (item.anahtar||[]).some(k => k.toLowerCase().includes(q));
    return tipOk && alanOk && queryOk;
  });

  if (countEl) countEl.textContent = `${filtered.length} kayıt`;

  const tipLabel = { teori:'Teori', yontem:'Yöntem' };
  const tipClass  = { teori:'kut-type-teori', yontem:'kut-type-yontem' };

  grid.innerHTML = filtered.map(item => `
    <div class="kut-card">
      <div class="kut-card-accent" style="background:${item.renk}"></div>
      <div class="kut-card-top">
        <div class="kut-card-name">${item.ad}</div>
        <div class="kut-type-badge ${tipClass[item.tip]}">${tipLabel[item.tip]}</div>
      </div>
      <div class="kut-card-yazar">${item.yazar}</div>
      <div class="kut-card-desc">${item.desc}</div>
      <div class="kut-card-footer">
        ${(item.programlar||[]).map(p=>`<span class="kut-tag" style="background:${item.renk}20;color:${item.renk};border:1px solid ${item.renk}44">${p}</span>`).join('')}
        ${(item.anahtar||[]).map(k=>`<span class="kut-tag" style="background:var(--surface2);color:var(--text-muted);border:1px solid var(--border)">${k}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════
   PANEL 6: DERS LİSTESİ
══════════════════════════════════ */
const DERS_PROGRAMLAR = [
  {
    id:'itu-ism', renk:'#4A90D9', emoji:'🔵',
    ad:'İTÜ – İşletme Mühendisliği', kisaltma:'İTÜ İŞL.MÜH.',
    dersler:[
      { kod:'BLG 500',  ad:'Bilimsel Araştırma Yöntemleri ve Etik',       tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'ISM 596',  ad:'Lisansüstü Seminer',                           tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'ISM 503E', ad:'Advanced Statistical Analysis for Business',   tur:'zorunlu-havuz', alanlar:['veri','arastirma'] },
      { kod:'ISM 525E', ad:'Quantitative Methods for Decision Making',     tur:'zorunlu-havuz', alanlar:['mcdm','veri'] },
      { kod:'ISM 501E', ad:'Advanced Marketing Management',                tur:'secmeli', alanlar:['pazarlama'] },
      { kod:'ISM 543E', ad:'Marketing Research and Analytics',             tur:'secmeli', alanlar:['pazarlama','veri'] },
      { kod:'ISM 512E', ad:'Consumer Behavior Theory',                     tur:'secmeli', alanlar:['pazarlama'] },
      { kod:'ISM 521E', ad:'Digital Marketing and Social Media Analytics', tur:'secmeli', alanlar:['pazarlama','veri'] },
      { kod:'ISM 502E', ad:'Strategic Management',                         tur:'secmeli', alanlar:['yonetim'] },
      { kod:'ISM 504E', ad:'Human Resources Management',                   tur:'secmeli', alanlar:['yonetim'] },
      { kod:'ISM 505E', ad:'Operations Management',                        tur:'secmeli', alanlar:['uretim'] },
      { kod:'ISM 506E', ad:'Financial Management',                         tur:'secmeli', alanlar:['finans'] },
      { kod:'ISM 507E', ad:'Corporate Finance',                            tur:'secmeli', alanlar:['finans'] },
      { kod:'ISM 508E', ad:'Managerial Economics',                         tur:'secmeli', alanlar:['yonetim','finans'] },
      { kod:'ISM 511E', ad:'Macroeconomic Theory',                         tur:'secmeli', alanlar:['finans'] },
      { kod:'ISM 513E', ad:'Organization Theory and Design',               tur:'secmeli', alanlar:['yonetim'] },
      { kod:'ISM 514E', ad:'Investment Analysis and Portfolio Management', tur:'secmeli', alanlar:['finans'] },
      { kod:'ISM 516E', ad:'International Marketing',                      tur:'secmeli', alanlar:['pazarlama'] },
      { kod:'ISM 517E', ad:'Service Operations Management',                tur:'secmeli', alanlar:['uretim'] },
      { kod:'ISM 519E', ad:'Supply Chain Management',                      tur:'secmeli', alanlar:['uretim'] },
      { kod:'ISM 520E', ad:'Business Process Management',                  tur:'secmeli', alanlar:['yonetim','uretim'] },
      { kod:'ISM 523E', ad:'Innovation and Technology Management',         tur:'secmeli', alanlar:['yonetim'] },
      { kod:'ISM 524E', ad:'Entrepreneurship and Venture Capital',         tur:'secmeli', alanlar:['yonetim','finans'] },
      { kod:'ISM 530E', ad:'Data Mining for Business Analytics',           tur:'secmeli', alanlar:['veri'] },
      { kod:'ISM 532E', ad:'Behavioral Economics',                         tur:'secmeli', alanlar:['pazarlama','finans'] },
      { kod:'ISM 540E', ad:'Contemporary Issues in Management',            tur:'secmeli', alanlar:['yonetim'] },
    ]
  },
  {
    id:'itu-end', renk:'#3dd68c', emoji:'🟢',
    ad:'İTÜ – Endüstri Mühendisliği', kisaltma:'İTÜ END.MÜH.',
    dersler:[
      { kod:'MAT 501',  ad:'İleri Lineer Cebir',                                tur:'zorunlu-havuz', alanlar:['veri','mcdm'] },
      { kod:'END 596',  ad:'Lisansüstü Seminer',                                tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'END 500',  ad:'Bilimsel Araştırma Yöntemleri ve Etik',             tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'END 501E', ad:'Advanced Engineering Statistics',                   tur:'secmeli', alanlar:['veri','arastirma'] },
      { kod:'END 502E', ad:'Mathematical Programming',                          tur:'secmeli', alanlar:['mcdm'] },
      { kod:'END 503E', ad:'Advanced Production Planning and Control',          tur:'secmeli', alanlar:['uretim'] },
      { kod:'END 504E', ad:'Heuristic Methods for Optimization',                tur:'secmeli', alanlar:['mcdm'] },
      { kod:'END 505E', ad:'Computer Integrated Manufacturing Systems',         tur:'secmeli', alanlar:['uretim'] },
      { kod:'END 506E', ad:'Decision Support Systems',                          tur:'secmeli', alanlar:['mcdm','veri'] },
      { kod:'END 507E', ad:'Quality Engineering',                               tur:'secmeli', alanlar:['uretim'] },
      { kod:'END 508E', ad:'Advanced Facilities Planning',                      tur:'secmeli', alanlar:['uretim'] },
      { kod:'END 509E', ad:'Logistics and Supply Chain Management',             tur:'secmeli', alanlar:['uretim'] },
      { kod:'END 510E', ad:'Simulation of Systems',                             tur:'secmeli', alanlar:['mcdm','uretim'] },
      { kod:'END 511E', ad:'Reliability Engineering',                           tur:'secmeli', alanlar:['uretim'] },
      { kod:'END 512E', ad:'Applied Data Analytics for Industrial Engineers',   tur:'secmeli', alanlar:['veri'] },
      { kod:'END 513E', ad:'Project Management',                                tur:'secmeli', alanlar:['yonetim'] },
      { kod:'END 514E', ad:'Scheduling and Sequencing',                         tur:'secmeli', alanlar:['uretim','mcdm'] },
      { kod:'END 515E', ad:'Soft Computing and Fuzzy Logic Methods',            tur:'secmeli', alanlar:['mcdm','veri'] },
      { kod:'END 516E', ad:'Multi-Criteria Decision Making',                    tur:'secmeli', alanlar:['mcdm'] },
      { kod:'END 518E', ad:'Game Theory and Its Applications',                  tur:'secmeli', alanlar:['mcdm','yonetim'] },
      { kod:'END 520E', ad:'Inventory Systems Management',                      tur:'secmeli', alanlar:['uretim'] },
      { kod:'END 522E', ad:'Advanced Stochastic Models',                        tur:'secmeli', alanlar:['veri','mcdm'] },
      { kod:'END 530E', ad:'Deep Learning Applications in IE',                  tur:'secmeli', alanlar:['veri'] },
      { kod:'END 540E', ad:'Supply Chain Analytics',                            tur:'secmeli', alanlar:['uretim','veri'] },
    ]
  },
  {
    id:'itu-mnt', renk:'#a78bfa', emoji:'🟣',
    ad:'İTÜ – Mühendislik Yönetimi', kisaltma:'İTÜ MÜH.YÖN.',
    dersler:[
      { kod:'MNT 501E', ad:'Engineering Management Systems',              tur:'zorunlu', alanlar:['yonetim'] },
      { kod:'MNT 503E', ad:'Engineering Economic Analysis',               tur:'zorunlu', alanlar:['finans','yonetim'] },
      { kod:'MNT 500',  ad:'Bilimsel Araştırma Yöntemleri ve Etik',      tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'MNT 596',  ad:'Lisansüstü Seminer',                         tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'MNT 511E', ad:'Strategic Product and Innovation Management', tur:'secmeli', alanlar:['yonetim'] },
      { kod:'MNT 514E', ad:'Data Analytics for Engineering Managers',    tur:'secmeli', alanlar:['veri'] },
      { kod:'MNT 521E', ad:'Project Management and Financial Analytics', tur:'secmeli', alanlar:['finans','yonetim'] },
      { kod:'MNT 532E', ad:'Technology Commercialization and Marketing', tur:'secmeli', alanlar:['pazarlama','yonetim'] },
      { kod:'MNT 502E', ad:'Strategic Quality Management',               tur:'secmeli', alanlar:['uretim','yonetim'] },
      { kod:'MNT 504E', ad:'Human Resources Management for Engineers',   tur:'secmeli', alanlar:['yonetim'] },
      { kod:'MNT 505E', ad:'Operations Risk Management',                 tur:'secmeli', alanlar:['uretim','yonetim'] },
      { kod:'MNT 506E', ad:'Technology Management and Forecasting',      tur:'secmeli', alanlar:['yonetim','veri'] },
      { kod:'MNT 507E', ad:'Supply Chain Management in Technology Sectors', tur:'secmeli', alanlar:['uretim'] },
      { kod:'MNT 508E', ad:'Legal Issues in Engineering Management',     tur:'secmeli', alanlar:['yonetim'] },
      { kod:'MNT 510E', ad:'Business Process Engineering',               tur:'secmeli', alanlar:['uretim','yonetim'] },
      { kod:'MNT 512E', ad:'Decision and Risk Analysis',                 tur:'secmeli', alanlar:['mcdm','finans'] },
      { kod:'MNT 515E', ad:'Systems Thinking and Simulation',            tur:'secmeli', alanlar:['mcdm','uretim'] },
      { kod:'MNT 516E', ad:'Energy Systems Management',                  tur:'secmeli', alanlar:['uretim','yonetim'] },
      { kod:'MNT 518E', ad:'Digital Transformation and Industry 4.0',   tur:'secmeli', alanlar:['veri','yonetim'] },
      { kod:'MNT 520E', ad:'Intellectual Property Rights and R&D Management', tur:'secmeli', alanlar:['yonetim'] },
      { kod:'MNT 525E', ad:'Corporate Entrepreneurship',                 tur:'secmeli', alanlar:['yonetim','finans'] },
    ]
  },
  {
    id:'gsu-isletme', renk:'#ff9f43', emoji:'🟠',
    ad:'Galatasaray Üniversitesi – İşletme', kisaltma:'GSÜ İŞL.',
    dersler:[
      { kod:'G565',  ad:'Pazarlama Teorisi',                        tur:'zorunlu', alanlar:['pazarlama'] },
      { kod:'G561',  ad:'Finansal Analiz',                          tur:'zorunlu', alanlar:['finans'] },
      { kod:'G563',  ad:'Araştırma Metodolojisi',                   tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'G567',  ad:'İşletme Yönetimi',                         tur:'zorunlu', alanlar:['yonetim'] },
      { kod:'G569',  ad:'Finansal Raporlama Teknikleri',            tur:'zorunlu', alanlar:['finans'] },
      { kod:'G500',  ad:'Araştırma Yöntemleri ve Bilimsel Etik',   tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'G596',  ad:'Yüksek Lisans Semineri',                   tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'G588',  ad:'Bütünleşik Pazarlama İletişimi',           tur:'secmeli', alanlar:['pazarlama'] },
      { kod:'G586',  ad:'Büyük Veri Analizi',                       tur:'secmeli', alanlar:['veri'] },
      { kod:'G592',  ad:'Dijital Pazarlama ve E-Perakendecilik',   tur:'secmeli', alanlar:['pazarlama','veri'] },
      { kod:'G594',  ad:'Tüketici Davranışlarında Güncel Yaklaşımlar', tur:'secmeli', alanlar:['pazarlama'] },
      { kod:'G571',  ad:'Stratejik Yönetim Politikaları',           tur:'secmeli', alanlar:['yonetim'] },
      { kod:'G572',  ad:'İnsan Kaynakları Yönetiminde Yeni Trendler', tur:'secmeli', alanlar:['yonetim'] },
      { kod:'G574',  ad:'Uluslararası İşletmecilik',                tur:'secmeli', alanlar:['yonetim'] },
      { kod:'G576',  ad:'Örgüt Teorisi ve Tasarımı',                tur:'secmeli', alanlar:['yonetim'] },
      { kod:'G578',  ad:'Yatırım Analizi ve Portföy Yönetimi',     tur:'secmeli', alanlar:['finans'] },
      { kod:'G580',  ad:'Maliyet Yönetimi ve Denetim',              tur:'secmeli', alanlar:['finans','yonetim'] },
      { kod:'G582',  ad:'Tedarik Zinciri ve Lojistik Yönetimi',    tur:'secmeli', alanlar:['uretim'] },
      { kod:'G584',  ad:'Yenilik ve Girişimcilik Yönetimi',         tur:'secmeli', alanlar:['yonetim'] },
      { kod:'G590',  ad:'Kurumsal Yönetim ve İş Etiği',            tur:'secmeli', alanlar:['yonetim','arastirma'] },
    ]
  },
  {
    id:'gsu-end', renk:'#e05c5c', emoji:'🔴',
    ad:'Galatasaray Üniversitesi – Endüstri Müh.', kisaltma:'GSÜ END.MÜH.',
    dersler:[
      { kod:'IND 501',  ad:'Doğrusal Optimizasyon',                            tur:'zorunlu', alanlar:['mcdm'] },
      { kod:'IND 511',  ad:'Mühendislik Ekonomisinde İleri Yöntemler',         tur:'zorunlu', alanlar:['finans','mcdm'] },
      { kod:'IND 522',  ad:'İstatistiksel Modellemede İleri Yöntemler',        tur:'zorunlu', alanlar:['veri','arastirma'] },
      { kod:'IND 500',  ad:'Bilimsel Araştırma Yöntemleri ve Etik',            tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'IND 596',  ad:'Yüksek Lisans Semineri',                           tur:'zorunlu', alanlar:['arastirma'] },
      { kod:'IND 513',  ad:'Çok Ölçütlü Karar Verme (MCDM)',                  tur:'secmeli', alanlar:['mcdm'] },
      { kod:'IND 514',  ad:'Karar Analizinde Bulanık Kümeler Uygulamaları',   tur:'secmeli', alanlar:['mcdm','veri'] },
      { kod:'IND 515',  ad:'Oyun Teorisi ve Uygulamaları',                     tur:'secmeli', alanlar:['mcdm','yonetim'] },
      { kod:'IND 561',  ad:'Artificial Neural Networks',                       tur:'secmeli', alanlar:['veri'] },
      { kod:'IND 502',  ad:'Tamsayılı ve Kombinatoryal Optimizasyon',          tur:'secmeli', alanlar:['mcdm'] },
      { kod:'IND 503',  ad:'Sezgisel Optimizasyon Algoritmaları',              tur:'secmeli', alanlar:['mcdm','veri'] },
      { kod:'IND 504',  ad:'Dinamik Programlama',                              tur:'secmeli', alanlar:['mcdm'] },
      { kod:'IND 505',  ad:'Stokastik Süreçler',                               tur:'secmeli', alanlar:['veri','mcdm'] },
      { kod:'IND 506',  ad:'Benzetim Modellemesi ve Analizi',                  tur:'secmeli', alanlar:['mcdm','uretim'] },
      { kod:'IND 507',  ad:'İleri Tedarik Zinciri Yönetimi',                   tur:'secmeli', alanlar:['uretim'] },
      { kod:'IND 508',  ad:'Tesis Planlama ve Malzeme Yönetimi',               tur:'secmeli', alanlar:['uretim'] },
      { kod:'IND 509',  ad:'İleri Kalite Mühendisliği ve Altı Sigma',          tur:'secmeli', alanlar:['uretim'] },
      { kod:'IND 510',  ad:'Proje Yönetimi ve Risk Analizi',                   tur:'secmeli', alanlar:['yonetim','mcdm'] },
      { kod:'IND 512',  ad:'Üretim Sistemleri Tasarımı ve Analizi',            tur:'secmeli', alanlar:['uretim'] },
      { kod:'IND 516',  ad:'Makine Öğrenmesi ve Veri Madenciliği Applications',tur:'secmeli', alanlar:['veri'] },
      { kod:'IND 518',  ad:'Güvenilirlik Mühendisliği',                        tur:'secmeli', alanlar:['uretim'] },
      { kod:'IND 520',  ad:'Akıllı Üretim Sistemleri (Endüstri 4.0)',          tur:'secmeli', alanlar:['uretim','veri'] },
    ]
  },
];

const ALAN_ETIKETLER = {
  pazarlama:'📣 Pazarlama', veri:'🤖 Veri & ML', mcdm:'⚖️ MCDM',
  finans:'💰 Finans', yonetim:'🏢 Yönetim', uretim:'⚙️ Üretim', arastirma:'🔍 Araştırma'
};
const PROG_RENKLER = { 'itu-ism':'#4A90D9','itu-end':'#3dd68c','itu-mnt':'#a78bfa','gsu-isletme':'#ff9f43','gsu-end':'#e05c5c' };

let dersProgAktif = 'hepsi', dersTurAktif = 'hepsi', dersAlanAktif = 'hepsi';

function dersProgFilter(prog, btn) {
  dersProgAktif = prog;
  document.querySelectorAll('.ders-sidebar .ders-filter-btn').forEach(b => {
    if ((b.getAttribute('onclick')||'').startsWith('dersProgFilter')) b.classList.remove('active');
  });
  btn.classList.add('active');
  renderDersler();
}
function dersTurFilter(tur, btn) {
  dersTurAktif = tur;
  document.querySelectorAll('.ders-sidebar .ders-filter-btn').forEach(b => {
    if ((b.getAttribute('onclick')||'').startsWith('dersTurFilter')) b.classList.remove('active');
  });
  btn.classList.add('active');
  renderDersler();
}
function dersAlanFilter(alan, btn) {
  dersAlanAktif = alan;
  document.querySelectorAll('.ders-sidebar .ders-filter-btn').forEach(b => {
    if ((b.getAttribute('onclick')||'').startsWith('dersAlanFilter')) b.classList.remove('active');
  });
  btn.classList.add('active');
  renderDersler();
}

function renderDersler() {
  const container = document.getElementById('ders-container');
  const countEl = document.getElementById('ders-count');
  const q = (document.getElementById('ders-search')?.value || '').toLowerCase();
  if (!container) return;

  let totalCount = 0;
  const blocks = DERS_PROGRAMLAR
    .filter(p => dersProgAktif === 'hepsi' || p.id === dersProgAktif)
    .map(prog => {
      const filtered = prog.dersler.filter(d => {
        const turOk = dersTurAktif === 'hepsi' ||
          (dersTurAktif === 'zorunlu' && (d.tur === 'zorunlu' || d.tur === 'zorunlu-havuz')) ||
          (dersTurAktif === 'secmeli' && d.tur === 'secmeli');
        const alanOk = dersAlanAktif === 'hepsi' || d.alanlar.includes(dersAlanAktif);
        const qOk = !q || d.kod.toLowerCase().includes(q) || d.ad.toLowerCase().includes(q);
        return turOk && alanOk && qOk;
      });
      return { prog, filtered };
    })
    .filter(x => x.filtered.length > 0);

  blocks.forEach(x => totalCount += x.filtered.length);
  if (countEl) countEl.textContent = `${totalCount} ders`;

  container.innerHTML = blocks.map(({ prog, filtered }) => `
    <div class="ders-program-block">
      <div class="ders-prog-title">
        <span>${prog.emoji}</span>
        <span>${prog.ad}</span>
        <span class="ders-prog-badge" style="background:${prog.renk}22;color:${prog.renk};border:1px solid ${prog.renk}44">${prog.kisaltma}</span>
        <span style="margin-left:auto;font-size:12px;font-weight:400;color:var(--text-muted)">${filtered.length} ders</span>
      </div>
      <div class="ders-grid">
        ${filtered.map(d => `
          <div class="ders-card ${d.tur === 'secmeli' ? 'secmeli' : 'zorunlu'}" style="border-left-color:${prog.renk}">
            <div class="ders-card-code">${d.kod}</div>
            <div class="ders-card-name">${d.ad}</div>
            <div class="ders-card-tags">
              <span class="${d.tur === 'secmeli' ? 'ders-tag-secmeli' : 'ders-tag-zorunlu'}">${d.tur === 'zorunlu-havuz' ? 'Zorunlu Havuz' : d.tur === 'zorunlu' ? 'Zorunlu' : 'Seçmeli'}</span>
              ${d.alanlar.map(a => `<span class="ders-tag-alan">${ALAN_ETIKETLER[a]||a}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════
   FLASHCARD STUDY
══════════════════════════════════ */
let fcCards = [];
let fcIndex = 0;
let fcFlipped = false;
let fcStats = { iyi: 0, orta: 0, kotu: 0 };

function fcBuildCards() {
  fcCards = [];

  // Mülakat soruları (program bazlı kişisel sorular)
  if (typeof MULAKAT_SORULARI !== 'undefined') {
    for (let prog in MULAKAT_SORULARI) {
      const progAd = { 'itu-isletme':'İTÜ İşletme', 'itu-em':'İTÜ EM', 'itu-my':'İTÜ MY', 'gsu-isletme':'GSÜ İşletme', 'gsu-em':'GSÜ EM' }[prog] || prog;
      MULAKAT_SORULARI[prog].forEach(s => {
        const tipEtiket = { motivasyon:'💭 Motivasyon', teknik:'🔬 Teknik', stres:'⚡ Stres', genel:'📋 Genel' }[s.tip] || s.tip;
        fcCards.push({
          soru: s.soru,
          cevap: s.cevap + (s.ipucu ? '\n\n' + s.ipucu : ''),
          konu: `${tipEtiket} · ${progAd}`,
          tip: 'mulakat'
        });
      });
    }
  }

  // Bilimsel kavram soruları
  for (let key in BILIMSEL_KONULAR) {
    const k = BILIMSEL_KONULAR[key];
    if (k.sorular) {
      k.sorular.forEach(s => {
        fcCards.push({ soru: s.soru, cevap: s.cevap, konu: '🎓 ' + k.baslik, tip: 'bilim' });
      });
    }
  }
  if (typeof BILIM_EKTENSIF !== 'undefined') {
    for (let key in BILIM_EKTENSIF) {
      const k = BILIM_EKTENSIF[key];
      if (k.sorular) {
        k.sorular.forEach(s => {
          fcCards.push({ soru: s.soru, cevap: s.cevap, konu: '🎓 ' + k.baslik, tip: 'bilim' });
        });
      }
    }
  }

  // Shuffle
  for (let i = fcCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fcCards[i], fcCards[j]] = [fcCards[j], fcCards[i]];
  }
}

function fcStart() {
  fcBuildCards();
  fcIndex = 0;
  fcFlipped = false;
  fcStats = { iyi: 0, orta: 0, kotu: 0 };
  document.getElementById('fc-flip-btn').disabled = false;
  document.getElementById('fc-prev-btn').disabled = true;
  document.getElementById('fc-next-btn').disabled = false;
  document.getElementById('fc-skip-btn').disabled = false;
  renderFCCard();
}

function fcFlip() {
  fcFlipped = !fcFlipped;
  document.getElementById('fc-card').classList.toggle('flipped');
}

function fcNext() {
  if (fcIndex < fcCards.length - 1) {
    fcIndex++;
    fcFlipped = false;
    document.getElementById('fc-card').classList.remove('flipped');
    renderFCCard();
  }
}

function fcPrev() {
  if (fcIndex > 0) {
    fcIndex--;
    fcFlipped = false;
    document.getElementById('fc-card').classList.remove('flipped');
    renderFCCard();
  }
}

function fcMood(mood) {
  fcStats[mood]++;
  const moods = ['😊', '😐', '😠'];
  const moodTypes = ['iyi', 'orta', 'kotu'];
  const juriMembers = document.querySelectorAll('.fc-member-mood');
  const juriClasses = ['happy', 'neutral', 'angry'];

  moodTypes.forEach((m, i) => {
    document.getElementById('juri-' + (i+1)).classList.remove('happy', 'neutral', 'angry');
  });

  juriMembers.forEach((member, i) => {
    const moodIdx = moodTypes.indexOf(mood);
    member.textContent = moods[moodIdx];
    document.getElementById('juri-' + (i+1)).classList.add(juriClasses[moodIdx]);
  });

  setTimeout(() => {
    juriMembers.forEach((member, i) => {
      member.textContent = '😐';
      document.getElementById('juri-' + (i+1)).classList.remove('happy', 'neutral', 'angry');
      document.getElementById('juri-' + (i+1)).classList.add('neutral');
    });
  }, 1500);

  updateFCStats();
  setTimeout(() => fcNext(), 800);
}

function fcSkip() {
  fcNext();
}

function renderFCCard() {
  if (fcCards.length === 0) return;
  const card = fcCards[fcIndex];
  document.getElementById('fc-front').innerHTML = `
    <div class="fc-card-hint">${card.konu || ''}</div>
    <div class="fc-soru">${card.soru}</div>`;
  document.getElementById('fc-back').innerHTML = `
    <div class="fc-card-hint">💡 Cevap</div>
    <div class="fc-cevap">${card.cevap}<br><small style="color:var(--text-muted);margin-top:8px;display:block;">${card.konu||''}</small></div>`;

  document.getElementById('fc-prev-btn').disabled = fcIndex === 0;
  document.getElementById('fc-next-btn').disabled = fcIndex === fcCards.length - 1;
  document.getElementById('fc-skip-btn').disabled = fcIndex === fcCards.length - 1;

  const prog = ((fcIndex + 1) / fcCards.length) * 100;
  document.getElementById('fc-prog-bar').style.width = prog + '%';
  const lbl = document.getElementById('fc-prog-label');
  if (lbl) lbl.textContent = `${fcIndex + 1} / ${fcCards.length}`;

  // Clear bubbles
  ['bubble-1','bubble-2','bubble-3'].forEach(id => {
    const b = document.getElementById(id);
    if (b) { b.classList.remove('active'); b.textContent = ''; }
  });

  updateFCStats();
}

function updateFCStats() {
  const total = fcCards.length;
  const stats = `📊 ${fcIndex + 1}/${total} · 😊 İyi: ${fcStats.iyi} · 😐 Orta: ${fcStats.orta} · 😠 Zayıf: ${fcStats.kotu}`;
  document.getElementById('fc-stats').textContent = stats;
}


/* ── INIT ── */
renderProg();
renderSim();
renderBilim();
