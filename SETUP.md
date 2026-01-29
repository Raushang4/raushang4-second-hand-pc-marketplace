# raushang4.in | Technical Setup Guide

This guide details the configuration required to run the automated PC Hardware Marketplace, specifically focusing on **Gemini AI Visuals**, **Razorpay Hybrid COD**, and **Automated Route Payouts**.

## 1. Environment Configuration

Create a `.env` file in your root directory and populate it with the following keys:

| Key | Description | Source |
| :--- | :--- | :--- |
| `API_KEY` | Google Gemini API Key | [Google AI Studio](https://aistudio.google.com/) |
| `RAZORPAY_KEY_ID` | Your Razorpay API Key | Razorpay Dashboard > Settings |
| `RAZORPAY_KEY_SECRET` | Your Razorpay Secret | Razorpay Dashboard > Settings |
| `WHATSAPP_SENDER_ID` | Official WhatsApp Number | Twilio / Interakt / Meta Dev |

---

## 2. Google Gemini API Setup (AI Visuals)

The marketplace uses `gemini-2.5-flash-image` to generate photorealistic studio shots of PC components if actual images are missing.

1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Generate a new API Key.
3.  Ensure your project has the **Generative AI API** enabled in the Google Cloud Console.
4.  The application specifically utilizes the `generateContent` method for nano banana series models as configured in `services/aiService.ts`.

---

## 3. Razorpay Integration

### A. Hybrid COD Setup
This app does not charge the full product price upfront. It creates an order for the `shippingAdvance` amount only.
*   **Action:** Ensure your Razorpay account is in **Live Mode** to process real payments.
*   **Testing:** Use `rzp_test_...` keys for sandbox testing. The logic is encapsulated in `components/ProductPage.tsx`.

### B. Razorpay Route (Automated Payouts)
To solve the manual follow-up issue (Kavya Mali review), we use **Razorpay Route**.
1.  **Linked Accounts:** You must create "Linked Accounts" for your sellers in the Razorpay Dashboard under the "Route" tab.
2.  **Account IDs:** Copy the `acc_XXXXX` ID for each seller and paste it into the `sellerAccountId` field in `constants.ts`.
3.  **Transfer Logic:** When the Admin clicks **"Verify & Release Funds"**, the app calls the Transfers API to move money from your main balance to the seller's account instantly.

---

## 4. Webhook & WhatsApp Automation

To automate the "Advance Paid" confirmation:
1.  Set your Webhook URL in Razorpay to `your-api.com/webhooks/razorpay`.
2.  Subscribe to the `payment.captured` event.
3.  **Payload Handling:**
    ```json
    if (event === 'payment.captured') {
       // Trigger WhatsApp API
       sendWhatsApp(phone, "Your Advance for [Product] is verified. Balance [Amount] due on COD.");
    }
    ```

## 5. Deployment Instructions

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm start
    ```
3.  **Stress Test Verification:**
    Access any product page and use the **Internal Admin Panel** at the bottom to simulate the technical verification and automated payout workflow.

---
**Security Note:** Never commit your `.env` file to version control. The `process.env.API_KEY` is injected securely during the build process.