

// function createPaymentIntent() {
//     fetch('/create-payment-intent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Optionally, include any data required by your server in the body
//       body: JSON.stringify({
//         // Include any necessary data for creating the payment intent
//         // Example: { /* data */ }
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Use the client secret returned by the server for further processing
//         const clientSecret = data.clientSecret;
//         // Perform actions with the client secret as needed
//         // Example: pass it to Stripe.js to confirm the payment
//       })
//       .catch(error => {
//         // Handle errors that occur during the fetch request
//         console.error('Error:', error);
//       });
//   }

//   // Get the button by its ID
