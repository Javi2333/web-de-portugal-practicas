require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Servir los archivos de la web
app.use(express.static(path.join(__dirname, '../Nueva carpeta')));

// Convierte "257,98 €" → 25798 (céntimos para Stripe)
function parsePriceToCents(str) {
  if (!str) return 0;
  const num = parseFloat(str.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, ''));
  return Math.round(num * 100);
}

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail, shippingCost } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Construir los productos para Stripe
    const lineItems = items.map(item => {
      const unitAmount = parsePriceToCents(item.price);
      const description = item.options && item.options.length
        ? item.options.map(o => `${o.label}: ${o.value}`).join(' | ')
        : undefined;

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.title.length > 100 ? item.title.slice(0, 97) + '...' : item.title,
            ...(description && { description })
          },
          unit_amount: unitAmount
        },
        quantity: item.qty || 1
      };
    });

    // Añadir envío si tiene coste
    if (shippingCost && shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: 'Envío express' },
          unit_amount: Math.round(shippingCost * 100)
        },
        quantity: 1
      });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail || undefined,
      success_url: `${frontendUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout.html`
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error Stripe:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
