// export const getOrderConfirmationEmail = (name: string) => `
//   <div style="font-family: Arial, sans-serif; color: #333;">
//     <h1 style="color: #006400;">Thank You for Your Order, ${name}</h1>
//     <p>Your order has been successfully placed. We will notify you once it's shipped.</p>
//     <p>If you have any questions, feel free to contact us.</p>
//     <p>Best regards,</p>
//     <p><strong>Tulsi Ayurveda</strong></p>
//   </div>
// `;

import { Product } from "@/constants/constant";

// export const getOrderConfirmationEmailtoDr = (
//   name: string,
//   email: string,
//   phone: string,
//   address: string,
//   street: string,
//   flatNumber: string,
// ) => `
//   <div style="font-family: Arial, sans-serif; color: #333;">
//     <h1 style="color: #006400;">Order has been placed by the customer, ${name}</h1>
//     <p>${email}</p> | <p> ${phone} </p>
//     <p>${address}</p>
//     <p>Your order has been successfully placed. We will notify you once it's shipped.</p>
//     <p>If you have any questions, feel free to contact us.</p>
//     <p>Best regards,</p>
//     <p><strong>Tulsi Ayurveda</strong></p>
//   </div>
// `;

export const getOrderConfirmationEmail = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #2E7D32; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
        .content { margin-bottom: 20px; }
        .footer { margin-top: 30px; font-size: 14px; color: #666666; }
        .divider { border-top: 1px solid #E0E0E0; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">Order Confirmation</div>
    <div class="content">
        <p>Dear ${name},</p>
        <p>Thank you for your order with Tulsi Ayurveda. We've successfully received your order and it's now being processed.</p>
        <p>You'll receive another notification once your items have been shipped.</p>
    </div>
    <div class="divider"></div>
    <div class="content">
        <p>If you have any questions about your order, please don't hesitate to contact our customer service team.</p>
    </div>
    <div class="footer">
        <p>Best regards,</p>
        <p><strong>Tulsi Ayurveda Customer Care</strong></p>
    </div>
</body>
</html>
`;

export const getOrderConfirmationEmailtoDr = (
  name: string,
  email: string,
  phone: string,
  address: string,
  street: string,
  flatNumber: string,
  cart: Product[]
) => `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #2E7D32; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
          .content { margin-bottom: 20px; }
          .footer { margin-top: 30px; font-size: 14px; color: #666666; }
          .divider { border-top: 1px solid #E0E0E0; margin: 20px 0; }
          .customer-info { background-color: #F5F5F5; padding: 15px; border-radius: 4px; margin: 15px 0; }
          .info-label { font-weight: bold; display: inline-block; width: 80px; }
          .order-items { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .order-items th { background-color: #E0E0E0; text-align: left; padding: 8px; }
          .order-items td { padding: 8px; border-bottom: 1px solid #E0E0E0; }
          .order-items tr:last-child td { border-bottom: none; }
          .total-row { font-weight: bold; }
      </style>
  </head>
  <body>
      <div class="header">New Customer Order Notification</div>
      <div class="content">
          <p>Dear Doctor,</p>
          <p>A new order has been placed by the following customer:</p>
          
          <div class="customer-info">
              <p><span class="info-label">Name:</span> ${name}</p>
              <p><span class="info-label">Email:</span> ${email}</p>
              <p><span class="info-label">Phone:</span> ${phone}</p>
              <p><span class="info-label">Address:</span> ${flatNumber}, ${street}, ${address}</p>
          </div>
          
          <h3>Order Details:</h3>
          <table class="order-items">
              <thead>
                  <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                  </tr>
              </thead>
              <tbody>
                  ${cart
                    .map(
                      (item) => `
                      <tr>
                          <td>${item.name}</td>
                          <td>${item.quantity}</td>
                          <td>₹${item.price}</td>
                          <td>₹${item.price * item.quantity}</td>
                      </tr>
                  `
                    )
                    .join("")}
                  <tr class="total-row">
                      <td colspan="3">Subtotal</td>
                      <td>₹${cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}</td>
                  </tr>
              </tbody>
          </table>
          
          <p>The order is now being processed. Please review the details and prepare the items for shipment.</p>
      </div>
      <div class="divider"></div>
      <div class="content">
          <p>For any questions regarding this order, please contact the customer directly or reach out to the operations team.</p>
      </div>
      <div class="footer">
          <p>Best regards,</p>
          <p><strong>Tulsi Ayurveda Operations</strong></p>
      </div>
  </body>
  </html>
  `;
