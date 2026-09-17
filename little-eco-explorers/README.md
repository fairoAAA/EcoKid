# 🌍 EcoKids — bolalar uchun ekologik ta'lim platformasi

Bolalarga ekologiya va tabiatni asrashni o'yin, viktorina va qiziqarli maqolalar orqali o'rgatuvchi veb-ilova. React + TypeScript + Vite + Tailwind + shadcn-ui asosida qurilgan.

## ✨ Asosiy imkoniyatlar

- **3 tilda ishlaydi**: O'zbekcha, Русский, English (yuqori o'ng burchakdagi 🌐 tugma orqali almashtiriladi)
- **3 ta o'yin**: Chiqindi saralash, Daraxt ekish (3D, Three.js), Eko-viktorina (60 ta savol, 6 bosqich)
- **16 ta ta'limiy maqola**: hayvonlar, o'simliklar, tajribalar va maslahatlar bo'yicha
- **Progress saqlanadi**: til tanlovi va o'yin natijalari brauzeringizda (localStorage) saqlanadi — sahifani yangilasangiz ham yo'qolmaydi
- **Admin panel** (`/admin`): admin va yordamchi (moderator) rollari bilan kontentni boshqarish

## 🚀 Ishga tushirish

```sh
npm install
npm run dev
```

Brauzerda `http://localhost:8080` manzilini oching.

## 🔐 Admin panel

`/admin` manziliga o'ting (yoki footer'dagi "Admin" havolasini bosing).

**Standart login:** `admin` / `admin123`

Kirgandan so'ng "Foydalanuvchilar" bo'limidan parolni almashtiring yoki yordamchilar (moderatorlar) uchun yangi hisoblar yarating.

> ⚠️ **Muhim**: bu loyihada backend/server yo'q. Admin paneldagi tahrirlar faqat **shu brauzeringizda** (localStorage) saqlanadi va faqat sizga ko'rinadi. Barcha foydalanuvchilar uchun o'zgarishlarni chiqarish uchun "Eksport / Import" bo'limidan JSON faylni yuklab oling va uni `src/data/` papkasidagi mos fayllarga qo'lda joylashtiring (yoki loyihani backend'ga — masalan Supabase'ga — ulang).

## 📁 Loyiha tuzilishi

```
src/
  i18n/            — tarjima tizimi (LanguageContext, translations.ts)
  data/            — barcha kontent (maqolalar, viktorina savollari, o'yin elementlari)
  admin/           — admin autentifikatsiya, layout, saqlash yordamchilari
  pages/           — ommaviy sahifalar
  pages/admin/     — admin panel sahifalari
  pages/games/     — 3 ta o'yin
  components/      — qayta ishlatiladigan UI qismlari
public/models/     — 3D daraxt modellari (.gltf)
```

## 🛠️ Texnologiyalar

Vite · TypeScript · React · React Router · shadcn-ui · Tailwind CSS · Three.js · TanStack Query

## 📦 Build

```sh
npm run build   # dist/ papkasiga production build
npm run lint    # kod sifatini tekshirish
```
