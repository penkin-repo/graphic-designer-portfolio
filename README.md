# 🎨 PENKIN DESIGN — Сайт-портфолио графического дизайнера

> **Официальный сайт:** [penkindesign.ru](https://penkindesign.ru)  
> **Владелец:** Александр Пенкин — графический дизайнер, специалист по верстке полиграфии и препрессу (Архангельск / Северодвинск).

Современный быстрый статический сайт на **Astro 4**, совмещающий презентацию услуг, интерактивное портфолио, прайс-лист, блог статей и расширенную SEO-оптимизацию под поисковые системы (Яндекс, Google) и социальные сети.

---

## 🤖 Контекст для ИИ-агентов и разработчиков (AI & Dev Quickstart)

Если вы работаете с этим репозиторием (как разработчик или LLM/ИИ-ассистент), обратите внимание на ключевые договоренности:

1. **Фреймворк:** Astro 4 (`output: 'static'`) с интеграциями `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/sitemap`.
2. **Контентная модель:** Строго через **Astro Content Collections** (`astro:content`):
   - `src/content/portfolio/*.md` — кейсы портфолио (коллекция `portfolio`).
   - `src/content/articles/*.md` — статьи блога (коллекция `articles`).
   - Схемы описаны в `src/content/config.ts`.
3. **URL и роутинг:** 
   - Все ссылки внутри сайта строго с закрывающим слешем (`/portfolio/`, `/articles/`, `/portfolio/[slug]/`, `/articles/[slug]/`), чтобы соответствовать сгенерированному `sitemap-index.xml` и избегать 301-редиректов.
4. **Оптимизация изображений:**
   - В Astro-компонентах использовать `astro:assets` (`<Image src={...} alt={...} />`) для автоматической генерации WebP/AVIF и предотвращения CLS (сдвигов макета).
   - Сетка портфолио на главной и странице `/portfolio/` реализована на базе `src/components/PortfolioGrid.astro`.
5. **SEO & Микроразметка (JSON-LD):**
   - Управляется через `src/layouts/Layout.astro`.
   - Поддерживает динамический `type` (`website` / `article`), абсолютные пути для `og:image` и Twitter Cards.
   - Микроразметка разделена по сущностям: `ProfessionalService` + `WebSite` (главная), `BlogPosting` + `BreadcrumbList` (статьи), `CreativeWork` + `BreadcrumbList` (портфолио), `FAQPage` (компонент `FAQ.astro`).
6. **Дизайн-система (Tailwind):**
   - Цвета: `cream` (`#FDFBF7`), `brown` (`#4A3B32`), `terracotta` (`#D97757`), `sand` (`#E6DCCF`).
   - Шрифты: Sans (системный/Inter), заголовки — `IBM Plex Serif` (`ibm-plex-serif-bold`, `ibm-plex-serif-semibold-italic`).

---

## 🚀 Стек технологий

- **Ядро:** [Astro.js 4](https://astro.build/) (Static Site Generation)
- **UI & Интерактивность:** React 18, [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Стилизация:** [Tailwind CSS 3](https://tailwindcss.com/) + кастомные 3D-трансформации
- **Изображения:** Sharp + `astro:assets`
- **SEO & Аналитика:** `@astrojs/sitemap`, Open Graph, Schema.org (JSON-LD), Яндекс.Метрика (`112845747`)
- **Пакетный менеджер:** `pnpm` (также поддерживается запуск через `bun` / `npm`)

---

## 📦 Установка и запуск

```bash
# Установка зависимостей (рекомендуется pnpm)
pnpm install

# Запуск локального сервера разработки
pnpm dev

# Сборка продакшен-бандла (в папку dist/)
pnpm build

# Локальный предпросмотр собранного сайта
pnpm preview
```

---

## 🏗️ Структура проекта

```text
├── public/
│   ├── favicon.svg             # Векторный фавикон
│   ├── favicon.ico             # Растровый фавикон
│   ├── og-image.jpg            # Превью 1200x630 для соцсетей (VK, TG, Twitter)
│   ├── robots.txt              # Директивы для краулеров и ссылка на sitemap-index.xml
│   └── site.webmanifest        # Манифест PWA / мобильных иконок
├── src/
│   ├── components/             # Компоненты сайта
│   │   ├── Header.astro        # Шапка с автоскрытием при скролле и мобильным меню
│   │   ├── Footer.astro        # Подвал сайта (семантический div, ссылки)
│   │   ├── Hero.astro          # Главный экран с 3D-карточкой
│   │   ├── Benefits.astro      # Услуги: полиграфия, баннеры/события, препресс
│   │   ├── PortfolioGrid.astro # Оптимизированная сетка работ на чистом JS + astro:assets
│   │   ├── PortfolioGrid.tsx   # Альтернативный React-компонент с Framer Motion
│   │   ├── PriceList.astro     # Прайс-лист по категориям с ценами и сроками
│   │   ├── FAQ.astro           # Аккордеон частых вопросов + Schema.org FAQPage
│   │   ├── QuickContacts.astro # Блок быстрых контактов (Telegram, телефон)
│   │   ├── ContactButton.tsx   # Интерактивные кнопки связи
│   │   ├── TiltCard.tsx        # React-компонент 3D-параллакса карточки
│   │   └── SoftwareTools.astro # 3D-кубы используемого софта (Ai, Ps, Id, Cdr)
│   ├── content/                # Контент сайта (Astro Content Collections)
│   │   ├── config.ts           # Схемы валидации коллекций (Zod)
│   │   ├── portfolio/          # Markdown-файлы кейсов (*.md)
│   │   └── articles/           # Markdown-файлы статей блога (*.md)
│   ├── images/                 # Локальные изображения для оптимизации
│   │   ├── hero.png
│   │   └── portfolio/          # Папки с фотографиями проектов
│   ├── layouts/
│   │   └── Layout.astro        # Базовый HTML-шаблон с мета-тегами и JSON-LD
│   ├── pages/
│   │   ├── index.astro         # Главная страница (лендинг)
│   │   ├── portfolio/
│   │   │   ├── index.astro     # Каталог всех работ
│   │   │   └── [slug].astro    # Детальная страница кейса с галереей
│   │   └── articles/
│   │       ├── index.astro     # Список статей блога
│   │       └── [slug].astro    # Детальная страница статьи
│   └── styles/
│       └── global.css          # Подключение шрифтов, Tailwind и утилит
├── PORTFOLIO-TODO.md           # Инструкция и чек-лист по добавлению новых кейсов
├── astro.config.mjs            # Конфигурация Astro, домен https://penkindesign.ru
└── tailwind.config.mjs         # Настройка цветов, шрифтов и плагинов
```

---

## 📝 Управление контентом

### 1. Как добавить новую работу в портфолио
Подробная инструкция находится в файле [`PORTFOLIO-TODO.md`](./PORTFOLIO-TODO.md).
1. Создайте Markdown-файл в `src/content/portfolio/<slug>.md`.
2. Положите изображения в `src/images/portfolio/<slug>/`.
3. Заполните фронтматтер (title, category, image, desc, fullDescription, client, year, services, images).

### 2. Как добавить статью в блог
1. Создайте Markdown-файл в `src/content/articles/<slug>.md`.
2. Укажите: `title`, `description`, `publishDate`, `category`, `image`, `author`.
3. Пишите текст статьи в стандартном формате Markdown.

### 3. Редактирование цен и услуг
Цены и сроки редактируются в массиве `prices` файла [`src/components/PriceList.astro`](./src/components/PriceList.astro).

---

## 🔍 SEO и сниппеты

- **Карта сайта:** Генерируется автоматически при сборке в `https://penkindesign.ru/sitemap-index.xml`.
- **Open Graph / Telegram / VK:** Подставляются автоматические абсолютные ссылки и единое брендовое изображение `/og-image.jpg` (для статей и кейсов — индивидуальные обложки).
- **Микроразметка Schema.org:**
  - `ProfessionalService` и `WebSite` на главной.
  - `BlogPosting` + `BreadcrumbList` на страницах статей.
  - `CreativeWork` + `BreadcrumbList` на страницах портфолио.
  - `FAQPage` на страницах с аккордеоном вопросов.

---

## 📄 Лицензия

Проект разработан для студии **PENKIN DESIGN**. Все права защищены.
