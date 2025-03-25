// src/lib/emailTemplate.ts
export const getOrderConfirmationEmail = (name: string) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #006400;">Thank You for Your Order, ${name}</h1>
    <p>Your order has been successfully placed. We will notify you once it's shipped.</p>
    <p>If you have any questions, feel free to contact us.</p>
    <p>Best regards,</p>
    <p><strong>Tulsi Ayurveda</strong></p>
  </div>
`; 