# Project Specs - Wild Trail Gear

## What the app does and who uses it
- A marketing and catalog site for a camping gear rental service in Panadura, Sri Lanka.
- Visitors browse gear and contact the team on WhatsApp to rent.
- No online booking or payments are handled on the site.

## Pages and user flows
- / (Home): introduces the brand, highlights featured gear, and guides users to explore or contact.
- /catalog: users filter by category, search gear, see availability, and tap Rent Now to open WhatsApp.
- /about: story, values, team, and location details to build trust.
- /contact: a simple form that opens WhatsApp with a prefilled message, plus direct contact info and FAQs.

## Data and where it lives
- Catalog items, categories, prices, and availability are stored in lib/catalog-data.ts.
- WhatsApp number and nav links are stored in lib/constants.ts.
- Images live in public/images and public/images/products.
- Contact form data is temporary in the browser and is not saved anywhere.

## Done looks like
- All four pages load and the main navigation works.
- Catalog filters, search, and availability labels work correctly.
- All Rent Now and WhatsApp links open the correct number.
- No booking or payment flows exist on the site.
- The build completes without errors.
