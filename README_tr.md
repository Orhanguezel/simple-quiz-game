### Görev 1: "Soru" adında bir sınıf oluşturun

Bir sınıf oluşturun ve bu sınıfı bir sınav (quiz) sorusunu temsil etmek için kullanın. Sınıfın aşağıdaki özellikleri olmalıdır:

- Bir kurucu fonksiyon (constructor) olacak ve bu fonksiyon, sorunun metnini ve cevap seçeneklerini (bir dizi olarak) kabul edecek.
- Bir metot olacak ve bu metot soruyu ve seçenekleri ekrana yazdıracak.
- Bir metot olacak ve bu metot, kullanıcının seçiminin doğru olup olmadığını kontrol edecek.

### Görev 2: "Soru" sınıfından en az üç farklı soru örneği oluşturun

- "Soru" sınıfından üç farklı soru örneği oluşturun ve her soruya yaratıcı cevap seçenekleri ekleyin.

### Görev 3: Kullanıcıların soruları cevaplamasını sağlayın

- Kullanıcılardan cevapları almak için **`readline`** kütüphanesini kullanabilirsiniz. Bu terminal üzerinden giriş almak için oldukça kullanışlıdır.
- Ayrıca bir adım öteye geçip **HTML ve DOM manipülasyonu** kullanarak soruları web tarayıcısında gösterip cevaplamalarını sağlayabilirsiniz. Bu, yeni bir deneyim olacak ve size güzel bir meydan okuma fırsatı sunacaktır.

### Görev 4: Tüm sorular cevaplandıktan sonra sonuçları gösterin

- Kullanıcıların kaç soruyu doğru ve kaç soruyu yanlış yanıtladıklarını ekranda gösterin.

---

### Bonus Görev 1

- Sınav oyununuza bir puan sistemi ekleyin. Her soruya puan atayın ve kullanıcının toplam puanını hesaplayın. Oyun sonunda kullanıcının toplam puanını gösterin.

### Bonus Görev 2

- Oyununuza bir zamanlayıcı ekleyin. Kullanıcının tüm soruları yanıtlaması için sınırlı bir süre tanıyın. Zamanında cevaplanmayan sorular yanlış olarak değerlendirilsin.

---

### Örnek Çözüm (JavaScript ile Terminalde)

```javascript
const readline = require("readline");

// Soru sınıfı
class Soru {
    constructor(soruMetni, secenekler, dogruCevap) {
        this.soruMetni = soruMetni;
        this.secenekler = secenekler;
        this.dogruCevap = dogruCevap;
    }

    // Soruyu ve seçenekleri ekrana yazdır
    soruyuGoster() {
        console.log(this.soruMetni);
        this.secenekler.forEach((secenek, index) => {
            console.log(`${index + 1}: ${secenek}`);
        });
    }

    // Kullanıcının seçiminin doğru olup olmadığını kontrol et
    cevapKontrol(cevap) {
        return this.dogruCevap === cevap - 1;
    }
}

// Soru örnekleri
const sorular = [
    new Soru("Türkiye'nin başkenti neresidir?", ["İstanbul", "Ankara", "İzmir", "Antalya"], 1),
    new Soru("Python bir...", ["Yazılım dili", "Ülke", "Yiyecek", "Araç markası"], 0),
    new Soru("JavaScript hangi platformda çalışır?", ["Sunucu", "Tarayıcı", "Mobil", "Hepsi"], 3),
];

let dogruSayisi = 0;
let yanlisSayisi = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let soruIndex = 0;

// Kullanıcıdan cevapları alma
function sonrakiSoru() {
    if (soruIndex < sorular.length) {
        const mevcutSoru = sorular[soruIndex];
        mevcutSoru.soruyuGoster();
        rl.question("Cevabınız (1, 2, 3 veya 4): ", (cevap) => {
            if (mevcutSoru.cevapKontrol(parseInt(cevap))) {
                console.log("Doğru cevap!\n");
                dogruSayisi++;
            } else {
                console.log("Yanlış cevap.\n");
                yanlisSayisi++;
            }
            soruIndex++;
            sonrakiSoru();
        });
    } else {
        rl.close();
        // Sonuçları göster
        console.log(`Sınav bitti! Doğru sayısı: ${dogruSayisi}, Yanlış sayısı: ${yanlisSayisi}`);
    }
}

sonrakiSoru();
```

### Bonus Görev: Puan ve Zamanlayıcı Ekleme

#### Puan Sistemi Eklemek

Her soruya puan atayın ve doğru cevaplandığında puanı ekleyin.

```javascript
class Soru {
    constructor(soruMetni, secenekler, dogruCevap, puan) {
        this.soruMetni = soruMetni;
        this.secenekler = secenekler;
        this.dogruCevap = dogruCevap;
        this.puan = puan;
    }

    cevapKontrol(cevap) {
        return this.dogruCevap === cevap - 1;
    }
}

// Soru oluşturma
const sorular = [
    new Soru("Türkiye'nin başkenti neresidir?", ["İstanbul", "Ankara", "İzmir", "Antalya"], 1, 10),
    new Soru("Python bir...", ["Yazılım dili", "Ülke", "Yiyecek", "Araç markası"], 0, 5),
    new Soru("JavaScript hangi platformda çalışır?", ["Sunucu", "Tarayıcı", "Mobil", "Hepsi"], 3, 15),
];

let toplamPuan = 0;

// Kullanıcı doğru cevap verdiğinde puan ekle
if (mevcutSoru.cevapKontrol(parseInt(cevap))) {
    console.log("Doğru cevap!\n");
    dogruSayisi++;
    toplamPuan += mevcutSoru.puan;
}
```

#### Zamanlayıcı Eklemek

Soruların cevaplanması için sınırlı bir süre verin.

```javascript
let zamanSuresi = 10; // 10 saniye sınırı
let sureBittiMi = false;

function zamanlayici() {
    setTimeout(() => {
        sureBittiMi = true;
        console.log("\nSüre doldu! Cevaplayamadığınız sorular yanlış sayıldı.");
        rl.close();
        console.log(`Sonuçlar: Doğru: ${dogruSayisi}, Yanlış: ${yanlisSayisi}`);
    }, zamanSuresi * 1000);
}

zamanlayici();
```

### Açıklama

- **Görev 1**: `Soru` sınıfı, bir soruyu temsil eder ve `soruyuGoster` metodu soruyu ekrana yazdırır.
- **Görev 2**: `new Soru()` ile üç farklı soru oluşturduk.
- **Görev 3**: Kullanıcıdan terminal aracılığıyla cevap almak için `readline` kütüphanesi kullanıldı.
- **Bonus Görevler**: Puan sistemi ile doğru cevaplardan puan ekledik ve zamanlayıcı ile süre sınırı koyduk.

Bu projeyi HTML ve JavaScript ile de yapabilirsiniz, ancak terminal tabanlı bir uygulama için bu yapıyı kullanabilirsiniz.