# ellko.pro

Website za ellko.pro - profesionalne usluge za vaše poslovanje.

## Instalacija

1. Klonirajte repozitorijum:
```bash
git clone https://github.com/yourusername/ellko.pro.git
cd ellko.pro
```

2. Instalirajte zavisnosti:
```bash
npm install
```

3. Pokrenite development server:
```bash
npm run dev
```

## Struktura projekta

```
ellko.pro/
├── api/                # API endpointe
├── assets/            # Statički fajlovi
│   ├── css/          # CSS fajlovi
│   ├── js/           # JavaScript fajlovi
│   └── img/          # Slike
├── industrije/        # Stranice za industrije
├── ponuda/           # Stranice za pakete
├── server.js         # Node.js server
└── package.json      # Node.js zavisnosti
```

## Razvoj

- `npm run dev` - Pokreće development server sa hot-reload
- `npm start` - Pokreće production server

## API Endpoints

### Kontakt forma
- POST `/api/contact`
  - Body: `{ name, email, phone, message }`

### Booking forma
- POST `/api/booking`
  - Body: `{ name, email, phone, date, time, service, message }`

## Tehnologije

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js

## Licenca

© 2024 ellko.pro. Sva prava zadržana. 