const paypal = require('paypal-rest-sdk')

paypal.configure({
   mode: "sandbox",
   client_id: "AZKa1erUqfJKw9SaFX2EjOg7jZWwkMKkkgrOFf8tTmxXv4C_1qRnjGuJ7uec-q0sx6XAWy8i6QhiApUc",
   client_secret: "EI7VR96Ov_z3bTgGm-FmKCZflrWQt5PgpIpm7QHgOUOT-QlDrql4WbT0_6ByMgRpb6YArIpN1H3u8W3y",
})

module.exports = paypal