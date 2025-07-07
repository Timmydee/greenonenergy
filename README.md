# ⚡ GreenOn Energy – Smart Solar Recommendation & Vendor Connection Platform

**GreenOn Energy** is a solar-first platform that helps individuals and businesses in Nigeria calculate their daily energy usage and receive personalized solar system recommendations. We then connect users with verified solar vendors via WhatsApp, helping them make a smooth and confident transition to renewable energy.

---

## ✨ Features

- 🔋 Energy Load Calculator – Estimate daily electricity usage (in kWh/day)
- ⚙️ Recommended inverter and solar panel size
- 📩 Automatic email with full solar setup summary
- 🤝 WhatsApp-based referral to verified solar vendors
- 💼 Admin and Vendor dashboards (coming soon)
- 💳 Solar loan integration (coming soon)

---

## 📸 Screenshot

![GreenOnEnergy Screenshot](public/screenshot.png)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Timmydee/greenonenergy.git
cd altplug
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env.local` and configure:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/altplug

# Email (Nodemailer SMTP config)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# App Base URL
BASE_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the platform locally.

---

## 🧠 Tech Stack

* [Next.js 14 (App Router)](https://nextjs.org/)
* [MongoDB + Mongoose](https://mongoosejs.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Nodemailer](https://nodemailer.com/about/)
* TypeScript
* Deployed on [Vercel](https://vercel.com/)

---

## 📝 Roadmap

* [x] Solar calculator MVP
* [x] Send personalized results via email
* [x] Vendor WhatsApp referral
* [x] Vendor registration & dashboard
* [ ] Admin approval panel
* [ ] Solar loan partnership integration
* [ ] PDF summary version

---

## 🙋‍♂️ Contributing

Pull requests are welcome! For major feature discussions or questions, please open an issue first.

---

## 📧 Contact

Built by [@TimmyDee](https://github.com/timmydee)

---

## 📄 License

MIT License. See the `LICENSE` file for more details.

