# RetailLift | Real-Time AI Shoplifting Detection System

A premium, high-tech cybersecurity website and hardware configurator for **RetailLift**, a state-of-the-art AI-powered shoplifting detection system. Built purely with **HTML, CSS, and JavaScript**.

---

## 🚀 Live Demo Features

### 1. Interactive AI Camera Feed Simulator
*   **Live Simulator**: Draws a wireframe store aisle with shoppers. The bounding boxes dynamically transition between states: `Normal (Green)` $\rightarrow$ `Suspicious Lingering (Orange)` $\rightarrow$ `Active Concealment (Red)`.
*   **Alert Synchronization**: Triggers instant notifications and inserts active security alerts into the **Live AI Alert Stream** panel.
*   **HUD Visualizer**: Nesting SVG scanning HUD rings rotate around a central dome lens with active sweeps and diagnostics text.

### 2. Validation & Performance Charts
*   **SVG Metrics Plot**: Interactive line charts tracking **Detections**, **Shrinkage Saved (PKR)**, and **AI Accuracy (%)**.
*   **Metric Toggles**: Smooth SVG path rendering with hover state tooltips displaying weekly values.

### 3. Customizable Product Builder & Sidebar Cart
*   **Dynamic Configurator**: Adjust options (camera counts, server specifications, storage capacities, installation scopes) with prices updating in real-time.
*   **Sidebar Shopping Cart**: Slide-out drawer with options breakdown, subtotal calculations, monthly SaaS fees, first-year estimated quotes, and quantity adjusters.
*   **PKR Currency**: All pricing points adjusted for Pakistani Rupee (Rs. / PKR) deployments.

### 4. Interactive Consultation Form & Coordinates Map
*   **Contact Form**: Glassmorphism fields with floating labels and inline error validations.
*   **Coordinates Radar**: Graphic HUD map showing active corporate offices located in Sialkot, Punjab.

---

## 🛠️ Technology Stack
*   **Structure**: Semantic HTML5 markup
*   **Style**: Vanilla CSS3 (custom variables, glassmorphism, responsive grids, keyframe animations)
*   **Logic**: ES6 JavaScript (canvas graphics engine, SVG mapping, cart state, form validation)
*   **Icons**: FontAwesome Icons CDN

---

## 💻 Local Setup

To preview or run this application locally:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/maleehaseemab4/RetailLift-website-.git
    cd RetailLift-website-
    ```
2.  **Launch a Local Server**:
    Using Python (built-in):
    ```bash
    python -m http.server 8000
    ```
    Or using Node:
    ```bash
    npx http-server -p 8000
    ```
3.  **Open in Browser**:
    Navigate to `http://localhost:8000` to interact with the dashboard.
