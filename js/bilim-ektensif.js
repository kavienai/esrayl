/* ══════════════════════════════════
   EXTENDED SCIENCE CONCEPTS
   Mühendislik Yönetimi & CRM İçin İleri Matematiksel Kavramlar
══════════════════════════════════ */

const BILIM_EKTENSIF = {
  'lineer-cebir': {
    baslik: 'Doğrusal Cebir ve Matris Teorisi',
    aciklama: 'Öz değerler, tekil değer ayrışması ve boyut indirgeme teknikleri.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Öz değer (Eigenvalue) ve öz vektör (Eigenvector) nedir?',
        cevap: 'Bir matris A için, Av = λv denklemini sağlayan λ (öz değer) ve v (öz vektör), matrisin temel davranışını tanımlar. Sistem dinamiğinde: λ > 1 ise sistem kararsız (patlama), 0 < λ < 1 ise istikrarlı (denge).',
        tools: ['NumPy linalg.eig', 'MATLAB eig()', 'R eigen()'],
        alanlar: ['veri', 'mcdm'],
        kavramlar: ['Spektral Analiz', 'Matris Ayrışması', 'Sistem Kararlılığı']
      },
      {
        zorluk: 'med',
        soru: 'Tekil Değer Ayrışması (SVD) nedir ve hangi uygulamalarda kullanılır?',
        cevap: 'Her matris A = UΣV^T şeklinde ayrışabilir; U ve V ortogonal, Σ tekil değerler. Boyut indirgeme (PCA alternatifi), matris taklidi problemleri, görüntü sıkıştırma ve tavsiye motorlarında temel.',
        tools: ['NumPy linalg.svd', 'scikit-learn TruncatedSVD', 'MATLAB svd()'],
        alanlar: ['veri', 'ml'],
        kavramlar: ['Boyut İndirgeme', 'Veri Sıkıştırma', 'Tavsiye Sistemleri']
      },
      {
        zorluk: 'hard',
        soru: 'PCA (Principal Component Analysis) nedir ve makine öğrenmesinde neden önemlidir?',
        cevap: 'Yüksek boyutlu veri setinin varyansı en fazla koruyan düşük boyutlu bir alt uzaya yansıtılması. Öz değerler ve öz vektörler aracılığıyla hesaplanır. Overfitting önler, görselleştirme kolaylaştırır, hesaplama hızını artırır.',
        tools: ['scikit-learn PCA', 'R prcomp()', 'MATLAB pca()'],
        alanlar: ['veri', 'ml', 'arastirma'],
        kavramlar: ['Boyut İndirgeme', 'Varyans Açıklanması', 'Visualizasyon']
      }
    ]
  },
  'olasilik-istatistik': {
    baslik: 'Olasılık Teorisi ve İstatistik',
    aciklama: 'Bayes teoremi, maksimum olabilirlik tahmini ve hipotez testleri.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Bayes Teoremi nedir ve gerçek uygulamalarda nasıl kullanılır?',
        cevap: 'P(A|B) = P(B|A)P(A) / P(B). Önceki inanç (prior) ve yeni delil (likelihood) birleştirilerek sonrası inanç (posterior) hesaplanır. Spam filtreleme, hastalık teşhisi, kullanıcı tahmini.',
        tools: ['Python scipy.stats', 'PyMC3', 'Stan'],
        alanlar: ['pazarlama', 'crm', 'veri'],
        kavramlar: ['Posterior', 'Prior', 'Likelihood', 'Bayesian Inference']
      },
      {
        zorluk: 'med',
        soru: 'Maksimum Olabilirlik Tahmini (MLE) nedir?',
        cevap: 'Gözlenen verilerin en olası olduğu parametreleri bulma yöntemi. Parametrelerin değerlerini optimize ederek verinin gerçekleşme olasılığını maksimize eder. Lojistik regresyon, Poisson regresyon, durağan olmayan modellerde kullanılır.',
        tools: ['scikit-learn', 'statsmodels', 'R optim()'],
        alanlar: ['veri', 'arastirma', 'istatistik'],
        kavramlar: ['Log-Likelihood', 'Parametre Tahmini', 'Asimptotik Özellikler']
      },
      {
        zorluk: 'hard',
        soru: 'Hipotez testlerinde Tür I ve Tür II hata nedir?',
        cevap: 'Tür I: gerçek (H0 doğru) kararken yanlış kararma (α = P(H0 reddişi | H0 doğru)). Tür II: yanlış (H0 yanlış) kararken doğru kararma (β = P(H0 kabul | H0 yanlış)). Klinik deneyler, A/B testlerinde kritik: örneklem büyüklüğü ve güç analizi.',
        tools: ['scipy.stats', 'statsmodels', 'R power.t.test()'],
        alanlar: ['arastirma', 'veri', 'istatistik'],
        kavramlar: ['Power Analysis', 'p-değeri', 'Örneklem Büyüklüğü']
      }
    ]
  },
  'zaman-serileri': {
    baslik: 'Zaman Serileri Analizi',
    aciklama: 'ARIMA, GARCH ve mevsimsel ayrıştırma yöntemleri.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Zaman serisinin bileşenleri (trend, mevsimsellik, döngüsellik, gürültü) nedir?',
        cevap: 'Y(t) = Trend + Mevsimsellik + Döngüsellik + Gürültü. Trend: uzun vadeli yön. Mevsimsellik: tekrar eden örüntü (haftalar, aylar). Döngüsellik: uzun vadeli dalgalanmalar. Satış tahmini, kullanıcı faaliyeti, hisse senedi fiyatı.',
        tools: ['pandas resample', 'statsmodels seasonal_decompose', 'R forecast pkg'],
        alanlar: ['veri', 'pazarlama', 'crm'],
        kavramlar: ['Stationarity', 'Autocorrelation', 'Seasonal Adjustment']
      },
      {
        zorluk: 'med',
        soru: 'ARIMA modeli nedir ve nasıl uygulanır?',
        cevap: 'AutoRegressive Integrated Moving Average: geçmiş değerler (AR), farklar (I), hata terimleri (MA) kombinasyonu. p, d, q parametreleriyle tuned. Stokastik serilerde (hisse, talep) standart yöntem. ACF/PACF grafikleriyle parametreler seçilir.',
        tools: ['statsmodels ARIMA', 'R forecast::auto.arima', 'Python pmdarima'],
        alanlar: ['veri', 'pazarlama', 'uretim'],
        kavramlar: ['Stationarity', 'Differencing', 'ACF/PACF', 'Model Selection']
      },
      {
        zorluk: 'hard',
        soru: 'GARCH modeli volatilite modellemiş için nasıl kullanılır?',
        cevap: 'Generalized Autoregressive Conditional Heteroskedasticity: varyansın zamanla değiştiğini modelleyip, oynaklığı tahmin eder. Finansal serilerde şok sonrasında yüksek volatiliteyi capture eder. Risk yönetimi, opsiyon fiyatlandırması.',
        tools: ['statsmodels arch', 'R rugarch', 'Python arch pkg'],
        alanlar: ['finans', 'veri', 'mcdm'],
        kavramlar: ['Conditional Variance', 'Volatility Clustering', 'Risk Modeling']
      }
    ]
  },
  'makine-ogrenmesi-advanced': {
    baslik: 'İleri Makine Öğrenmesi',
    aciklama: 'Random Forest, SVM, Deep Learning mimarileri.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Random Forest nedir ve neden etkilidir?',
        cevap: 'Karar ağaçlarının çoğu (ensemble) oluşturulur; her ağaç veri ve öznitelik örneklemesiyle eğitilir. Çıktı: sınıflandırmada oy, regresyonda ortalama. Overfitting az, parallelleştirme kolay, öznitelik önemi verir. Churn tahmini, müşteri segmentasyonunda ideal.',
        tools: ['scikit-learn RandomForestClassifier', 'XGBoost', 'LightGBM'],
        alanlar: ['veri', 'ml', 'crm'],
        kavramlar: ['Ensemble Learning', 'Bootstrap Aggregating', 'Feature Importance']
      },
      {
        zorluk: 'med',
        soru: 'SVM (Support Vector Machine) nedir?',
        cevap: 'İki sınıf arasında maksimum marjin veren hiper-düzlemi bulur. Kerneli SVM: doğrusal olmayan sınıflandırma. Optimal marjin ve support vektörler bulunur. Küçük/orta veri setleri, yüksek boyutlu uzaylarda güçlü. Tüketici tercih tahmini, spam filtreleme.',
        tools: ['scikit-learn SVM', 'libsvm', 'kernlab (R)'],
        alanlar: ['veri', 'ml', 'pazarlama'],
        kavramlar: ['Margin Maximization', 'Kernel Trick', 'Support Vectors']
      },
      {
        zorluk: 'hard',
        soru: 'Deep Learning ve sinir ağlarının mimarısı (CNN, RNN, Transformer) nedir?',
        cevap: 'Çok katmanlı yapay sinir ağları. CNN: görüntü analizi (convolution, pooling). RNN/LSTM: sırasal veri (metin, ses, zaman serileri). Transformer: paralel işleme, attention mekanizması. Transfer learning: büyük modeller fine-tune. Churn tahmininde LSTM, NLP çalışmalarında Transformer.',
        tools: ['TensorFlow/Keras', 'PyTorch', 'Hugging Face'],
        alanlar: ['veri', 'ml', 'arastirma'],
        kavramlar: ['Backpropagation', 'Activation Functions', 'Attention Mechanism', 'Transfer Learning']
      }
    ]
  },
  'agnet-analizi': {
    baslik: 'Grafik ve Ağ Analizi',
    aciklama: 'Graph teorisi, PageRank, topluluğu tespit etme.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Ağ/Grafik teorisinin temel kavramları nedir?',
        cevap: 'Düğümler (nodes) ve kenarlar (edges) oluşturur. Derece (degree): düğümün bağlantı sayısı. Yol (path), bileşen (component), çevre (cycle). Sosyal ağlar, tavsiye ağları, tedarik zinciri modellemesinde temel.',
        tools: ['NetworkX (Python)', 'igraph', 'tidygraph (R)'],
        alanlar: ['veri', 'arastirma'],
        kavramlar: ['Centrality', 'Clustering Coefficient', 'Connected Components']
      },
      {
        zorluk: 'med',
        soru: 'PageRank ve Centrality Measures nedir?',
        cevap: 'PageRank: ağdaki düğümün önemini, gelen bağlantıların ağırlığıyla hesaplar. Betweenness: düğüm kaç kısa yol üzerinde yer alır. Closeness: diğer düğümlere ortalama uzaklığı. Etkileyici kullanıcıların, kritik paydaşların tanımlanması.',
        tools: ['NetworkX pagerank', 'Gephi', 'tidygraph::centrality_pagerank'],
        alanlar: ['veri', 'pazarlama', 'arastirma'],
        kavramlar: ['Link Analysis', 'Influence Propagation', 'Community Detection']
      },
      {
        zorluk: 'hard',
        soru: 'Grafik kümeleme ve topluluğu tespit etme algoritmaları nedir?',
        cevap: 'Louvain: modülarite maksimize eder. Girvan-Newman: kenarları aşamalı kaldırarak bileşenler bulur. Label Propagation: hızlı, ölçeklenebilir. Tavsiye ağında kullanıcı grupları, sosyal medyada influencer topluluklarının bulunması.',
        tools: ['NetworkX community algorithms', 'Gephi', 'igraph::cluster_*'],
        alanlar: ['veri', 'pazarlama', 'crm'],
        kavramlar: ['Modularity', 'Community Structure', 'Graph Partitioning']
      }
    ]
  },
  'veri-on-isleme': {
    baslik: 'Veri Ön İşleme ve Temizleme',
    aciklama: 'Eksik veriler, outliers, kategorik kodlama.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Eksik veri (missing values) nasıl yönetilir?',
        cevap: 'Yapılar: MCAR (rastgele), MAR (koşullu), MNAR (bilinçli). Yöntemler: silme (listwise, pairwise), medyan/ortalama imputation, forward fill (zaman serileri), KNN imputation. Eksik veri modeli yanlışlanırsa sapmalı tahminler.',
        tools: ['pandas fillna/dropna', 'scikit-learn SimpleImputer', 'R mice/missForest'],
        alanlar: ['veri', 'arastirma'],
        kavramlar: ['Missing Data Mechanism', 'Imputation', 'Sensitivity Analysis']
      },
      {
        zorluk: 'med',
        soru: 'Aykırı değerler (outliers) nasıl tespit ve tedavi edilir?',
        cevap: 'Univariate: IQR, Z-score, Isolation Forest. Multivariate: Mahalanobis, Local Outlier Factor (LOF). Tedavi: silme, log dönüştürme, robust regresyon, cap/floor. Satış verisinde müşteri iadesi anormallikleri, klik verilerinde bot trafik.',
        tools: ['scikit-learn IsolationForest', 'pyod', 'R outliers pkg'],
        alanlar: ['veri', 'crm', 'pazarlama'],
        kavramlar: ['Isolation Forest', 'LOF', 'Robust Statistics']
      },
      {
        zorluk: 'hard',
        soru: 'Kategorik değişkenlerin kodlanması ve sürekli değişkenlerin dönüştürülmesi nedir?',
        cevap: 'Kategorik: one-hot encoding, ordinal encoding, target encoding. Sürekli: z-score normalization, min-max scaling, log/Box-Cox dönüştürme, binning. Model türüne göre: tree-based sınıflandırmacılar ham veriyi tolerans eder, SVM/ANN normalleşme şart.',
        tools: ['pandas get_dummies', 'scikit-learn preprocessing', 'R caret::preProcess'],
        alanlar: ['veri', 'ml', 'arastirma'],
        kavramlar: ['Feature Scaling', 'Box-Cox Transformation', 'Encoding Strategies']
      }
    ]
  },
  'karar-aglari-siniflandirma': {
    baslik: 'Karar Ağaçları ve Sınıflandırma',
    aciklama: 'CART, C4.5, budama ve model seçimi.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Karar ağacının temel yapısı nedir?',
        cevap: 'Kök (root): başlangıç. İç düğümler: test koşulları. Yapraklar: çıktı sınıfları. Her dal: doğru/yanlış karar. Entropy/Gini impurity minimize ederek bölme yapılır. Yorumlanabilirlik yüksek, eğitim hızlı.',
        tools: ['scikit-learn DecisionTreeClassifier', 'R rpart', 'Weka'],
        alanlar: ['veri', 'ml', 'pazarlama'],
        kavramlar: ['Entropy', 'Gini Impurity', 'Information Gain']
      },
      {
        zorluk: 'med',
        soru: 'Ağaç budama (pruning) nedir?',
        cevap: 'Ağaç aşırı büyüyüp overfitting yapabilir. Post-pruning: tam ağaç eğitip dalları kaldırma. Pre-pruning: büyüme sırasında durdurma (max_depth, min_samples_split). Test seti ile doğrulanır. İstatistiksel significance test (reduced error pruning).',
        tools: ['scikit-learn max_depth, min_samples', 'R rpart cp parameter'],
        alanlar: ['veri', 'ml'],
        kavramlar: ['Overfitting', 'Validation Set', 'Complexity Penalty']
      },
      {
        zorluk: 'hard',
        soru: 'C4.5 ve CART algoritmalarının farkları nedir?',
        cevap: 'CART (Classification and Regression Trees): Gini impurity, ikili bölmeler, regresyon destek. C4.5: Information Gain / Gain Ratio (çok değerli öznitelik sapması düzelter), budama istatistiksel. Çıktı: CART sürekli değişkenlerde daha esnekken, C4.5 kategorik veriye daha uygun.',
        tools: ['scikit-learn (CART)', 'Weka J48 (C4.5)', 'R C50 pkg'],
        alanlar: ['veri', 'ml', 'arastirma'],
        kavramlar: ['Binary vs Multi-way Splits', 'Gain Ratio', 'Reduced Error Pruning']
      }
    ]
  },
  'kume-analizi': {
    baslik: 'Küme Analizi ve Segmentasyon',
    aciklama: 'Hiyerarşik, DBSCAN, Gaussian Mixture Models.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Hiyerarşik kümeleme nedir?',
        cevap: 'Aglomeratif (bottom-up): her gözlem kendi kümesi ile başlayıp birleştirme. Bölensel (top-down): tüm veri tek kümede, ayrıştırma. Ölçüler: single linkage (minimum), complete linkage (maksimum), average linkage, Ward (varyans). Dendrogram: hiyerarşi görselleştirir.',
        tools: ['scipy.cluster.hierarchy', 'R hclust', 'stats::dist()'],
        alanlar: ['veri', 'pazarlama', 'crm'],
        kavramlar: ['Linkage Criteria', 'Dendrogram', 'Distance Matrix']
      },
      {
        zorluk: 'med',
        soru: 'DBSCAN nedir ve K-Means\'den farkları?',
        cevap: 'DBSCAN: yoğunluk tabanlı, keyfi şekilli kümeler. Eps ve MinPts parametreleriyle tanımlanır. K-Means: merkezci, dairesel kümeler, k bilinen şart. DBSCAN: gürültü (outliers) tanır, k seçimi otomatik. Yüksek boyutlu veriler ve anormal noktalar DBSCAN\'ı tercih eder.',
        tools: ['scikit-learn DBSCAN', 'R dbscan pkg', 'fpc::dbscan'],
        alanlar: ['veri', 'ml', 'crm'],
        kavramlar: ['Density-based Clustering', 'Eps-neighborhood', 'Outlier Detection']
      },
      {
        zorluk: 'hard',
        soru: 'Gaussian Mixture Models (GMM) nedir?',
        cevap: 'Gözlemlerin K Gaussian dağılımının karışımından gelmesi varsayımı. Beklenti-Maksimizasyon (EM) algoritmasıyla parametreler tahmin edilir. Katı üyelik (K-Means) yerine olasılıklı üyelik. Yumuşak kümeler, belirsizlik modellemesi.',
        tools: ['scikit-learn GaussianMixture', 'R mclust', 'stats4::mle'],
        alanlar: ['veri', 'ml', 'arastirma'],
        kavramlar: ['EM Algorithm', 'Soft Clustering', 'BIC/AIC Model Selection']
      }
    ]
  },
  'regresyon-teknikleri': {
    baslik: 'Regresyon Teknikleri',
    aciklama: 'Ridge, Lasso, Quantile regresyon.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Ridge ve Lasso regresyonu nedir?',
        cevap: 'Ridge: L2 regularization, büyük katsayıları cezalandırır, çoklu doğrusallık çözer. Lasso: L1, bazı katsayıları sıfıra itip öznitelik seçer. Elastic Net: her ikisinin kombinasyonu. Overfitting azaltır, model basitleştirimi. λ (alpha) regularization parameter cross-validation\'yla seçilir.',
        tools: ['scikit-learn Ridge/Lasso', 'R glmnet', 'stats::lm() vs penalized pkg'],
        alanlar: ['veri', 'ml', 'istatistik'],
        kavramlar: ['Regularization', 'Penalty Parameter', 'Cross-validation']
      },
      {
        zorluk: 'med',
        soru: 'Polinom regresyonu ve doğrusal olmayan ilişkiler nasıl modellenir?',
        cevap: 'Giriş özniteliklerinden polinom terimleri (x², x³) veya etkileşim terimleri oluşturarak doğrusal olmayan ilişkiler yaklaştırılır. Spline: parçalı polinomlar. LOESS: yerel ağırlıklı regresyon. Overfitting riski yüksek, düzgünleştirme (smoothing) şart.',
        tools: ['NumPy polyfit', 'scikit-learn PolynomialFeatures', 'R poly()', 'splines'],
        alanlar: ['veri', 'ml', 'pazarlama'],
        kavramlar: ['Polynomial Features', 'Basis Expansion', 'Smoothing Splines']
      },
      {
        zorluk: 'hard',
        soru: 'Quantile Regresyonu nedir?',
        cevap: 'OLS ortalamayı (mean) minimize ederken, quantile regresyon medyanı veya diğer percentilleri tahmin eder. Sapılı dağılımlar, aykırı değerlere robust. İstatistiksel çıkarım farklı (bootstrap). LTV\'nin yüksek değer müşteriler için tahmininde ideal.',
        tools: ['statsmodels QuantReg', 'R quantreg pkg', 'Python sklego'],
        alanlar: ['veri', 'crm', 'finans'],
        kavramlar: ['Quantile Loss', 'Robust Estimation', 'Bootstrap Inference']
      }
    ]
  },
  'isletme-analitigi': {
    baslik: 'İşletme Analitiği ve Yönetim Felsefesi',
    aciklama: 'Balanced Scorecard, Six Sigma, Lean Management.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Balanced Scorecard (BSC) nedir?',
        cevap: 'Kaplan & Norton: finans, müşteri, iç süreçler, öğrenme ve büyüme açılarından şirket stratejisini izleme. OKR\'nin öncüsü. Muhasebe metrikleri + stratejik KPI. Hipodrom\'da oyun saati, ARPU, retention ile paralel izlenir.',
        tools: ['Tableu/Power BI BSC dashboard', 'Excel template', 'SAP BPC'],
        alanlar: ['yonetim', 'finans', 'pazarlama'],
        kavramlar: ['Strategy Mapping', 'Cause-and-Effect', 'KPI Alignment']
      },
      {
        zorluk: 'med',
        soru: 'Six Sigma metodolojisi nedir?',
        cevap: 'Motorola geliştirir. DMAIC: Define, Measure, Analyze, Improve, Control. Sigma seviyeleri: 3σ ≈ 66.800 kusur, 6σ ≈ 3.4 kusur/milyon. Veri temelli süreç iyileştirmesi, varyans azaltma. Reklam kampanya hızı, müşteri hizmeti süresi optimizasyonunda kullanılır.',
        tools: ['Minitab Six Sigma', 'R quality pkg', 'JMP'],
        alanlar: ['uretim', 'yonetim', 'crm'],
        kavramlar: ['Process Capability', 'Control Limits', 'Hypothesis Testing']
      },
      {
        zorluk: 'hard',
        soru: 'Lean Management ve Muda (Harcama) nedir?',
        cevap: 'Toyota Production System: harcanan kaynağı minimum, değer maksimum. 7 Muda: fazla üretim, bekleme, nakil, işlem, hazırlama, hareket, kusur. Kanban, Just-in-Time. CRM\'de: gereksiz adımları kaldırma, müşteri harcama döngüsünü hızlandırma, otomasyonla maliyet düşürme.',
        tools: ['Value Stream Mapping (VSM)', 'Kaizen event tracking', 'Process mining tools'],
        alanlar: ['uretim', 'yonetim', 'crm'],
        kavramlar: ['Value Stream', 'Continuous Improvement', 'Just-in-Time']
      }
    ]
  },
  'etik-epistemoloji': {
    baslik: 'Etik, Epistemoloji ve Sorumlu Veri',
    aciklama: 'Araştırma etiği, veri gizliliği, algoritmik adalet.',
    sorular: [
      {
        zorluk: 'easy',
        soru: 'Araştırma etiği ve IRB onayı nedir?',
        cevap: 'İnstitüsyonel Etik Kurulu (IRB/REC) insan çalışmalarını onaylar. Muhabir, gönüllülük, rıza, gizlilik, hasar risk yönetimi. Tezinde kullanıcı verileri toplanırsa Üniversitenin etik kurulundan izin alınması gerekir.',
        tools: ['SurveyMonkey ESOMAR compliance', 'Qualtrics IRB integration', 'REDCap'],
        alanlar: ['arastirma', 'pazarlama', 'crm'],
        kavramlar: ['Informed Consent', 'Data Protection', 'Risk Assessment']
      },
      {
        zorluk: 'med',
        soru: 'Veri gizliliği (privacy) ve GDPR nedir?',
        cevap: 'GDPR (AB): kişisel verinin işlenmesi, saklı tutulması, silinmesi haklarını korur. Veri sorumlusu, işleyicisi, konu ve tüm yükümlülükleri. Hipodrom/Poca kullanıcılarının verilerini saklamada şekilleri: anonimleştirme, şifreleme, erişim kontrolü.',
        tools: ['Data encryption (AES)', 'Differential privacy libraries', 'Privacy-preserving ML'],
        alanlar: ['arastirma', 'crm', 'pazarlama'],
        kavramlar: ['Data Minimization', 'Purpose Limitation', 'Right to be Forgotten']
      },
      {
        zorluk: 'hard',
        soru: 'Algoritmik adalet (algorithmic fairness) nedir?',
        cevap: 'Makine öğrenmesi modellerinin belirli grupları (cinsiyet, etnik) ayrımcılığa maruz bırakmadığını sağlama. Bias kaynakları: veri (histor. ayrımcılık), etiketleme hataları, model (overfit belirli gruplarda). Mitigasyon: veri dengesi, constrained optimization, fairness constraints.',
        tools: ['Fairness Indicators (TensorFlow)', 'AI Fairness 360 (IBM)', 'Themis-ml'],
        alanlar: ['veri', 'ml', 'etik', 'arastirma'],
        kavramlar: ['Bias', 'Discrimination', 'Trade-offs', 'Accountability']
      }
    ]
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BILIM_EKTENSIF };
}
