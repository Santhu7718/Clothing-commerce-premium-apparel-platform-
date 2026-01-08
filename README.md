
# The Human Club | Premium Apparel Platform 🚀

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_TypeScript_|_Vite-blue)

A high-performance, full-stack e-commerce solution designed for premium apparel brands. This platform integrates real-time product customization, a seamless shopping experience, and a robust admin dashboard for inventory management.

🔗 **Live Demo:** [https://clothing-commerce-premium-apparel-p.vercel.app/](https://clothing-commerce-premium-apparel-p.vercel.app/)

## 📸 Key Features

### 🛍️ Customer Experience
* **Interactive Product Viewer:** Real-time 3D/2D visualization of apparel (`ProductViewer.tsx`).
* **Custom Design Engine:** Users can input custom specifications via a dynamic form (`CustomDesignForm.tsx`).
* **Seamless Shopping:** Optimized Cart and Wishlist drawers for uninterrupted browsing (`CartDrawer.tsx`, `WishlistDrawer.tsx`).
* **Secure Authentication:** User login and registration modal (`AuthModal.tsx`).

### ⚡ Technical Performance
* **Instant Load Times:** Powered by **Vite** for lightning-fast bundling and HMR.
* **Type Safety:** Built entirely with **TypeScript** to ensure code reliability and maintainability.
* **Responsive Design:** Fully mobile-optimized UI.

### 🛡️ Admin Capabilities
* **Dashboard:** Centralized control panel to manage orders and products (`AdminDashboard.tsx`).

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript
* **Build Tool:** Vite
* **Styling:** Modern CSS / Tailwind (Responsive Design)
* **Deployment:** Vercel

## 🚀 Getting Started locally

Follow these steps to set up the project locally on your machine.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Santhu7718/Clothing-commerce-premium-apparel-platform-.git]
    cd premium-apparel-platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory (refer to `.env.example` if available) and add your API keys:
    ```env
    VITE_API_BASE_URL=your_api_url_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── AdminDashboard.tsx
│   ├── AuthModal.tsx
│   ├── CartDrawer.tsx
│   ├── ProductViewer.tsx
│   └── ...
├── store/              # State management
├── App.tsx             # Main application entry
└── main.tsx            # DOM rendering
