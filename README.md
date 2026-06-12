# Mobile Inventory Management System

A modern web application for managing used Android and keypad phones inventory for a mobile phone shop.

## Features

### Dashboard
- 📦 Total available phones count
- ✅ Total sold phones count
- 💰 Total profit calculation
- 🎯 Quick action buttons

### Inventory Management
- ➕ Add new phones with detailed information
- ✏️ Edit phone details
- 🗑️ Delete phone records
- 💰 Mark phones as sold
- 🔍 Search phones by brand, model, or IMEI
- 📊 Filter phones by status (Available/Sold)

### Seller Management
- 👤 Store seller details (Name, Phone, CNIC)
- 📋 Seller information linked to phones

### Sales Management
- 🛒 Buyer details storage
- 📊 Sales history tracking
- 💹 Profit calculation per sale
- 📈 Total profit and sales summary

### User Interface
- 📱 Mobile-responsive design
- 🎨 Clean and intuitive interface
- ⚡ Fast and lightweight
- 🌙 Professional styling with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** Browser LocalStorage
- **Package Manager:** npm

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
mobile/
├── app/
│   ├── api/              # API routes (if needed)
│   ├── inventory/        # Inventory page
│   ├── sales/            # Sales history page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Dashboard page
│   └── globals.css       # Global styles
├── components/
│   ├── Navbar.tsx        # Navigation component
│   ├── PhoneForm.tsx     # Phone add/edit form
│   ├── PhoneList.tsx     # Phone list display
│   └── SoldModal.tsx     # Sold phone modal
├── lib/
│   ├── types.ts          # TypeScript types
│   └── storage.ts        # Storage utilities
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Usage

### 1. Dashboard
- Start at the dashboard to see an overview of your inventory
- View statistics: total phones, available phones, sold phones, and total profit
- Use quick action buttons to navigate to main features

### 2. Adding a Phone
- Click "➕ Add Phone" button
- Fill in phone details (Brand, Model, Price, etc.)
- Enter seller information or select an existing seller
- Click "Add Phone" to save

### 3. Managing Inventory
- View all phones in the inventory page
- Search phones by brand, model, or IMEI
- Filter by status (All/Available/Sold)
- Click ✏️ to edit phone details
- Click 💰 to mark a phone as sold
- Click 🗑️ to delete a phone

### 4. Marking a Phone as Sold
- Click the 💰 icon next to an available phone
- Enter buyer details (Name, Phone, CNIC)
- Select or enter sale date
- Confirm the sale

### 5. Viewing Sales History
- Navigate to "Sales History" page
- View all completed sales
- See seller and buyer information
- Check profit per sale
- View total profit and sales count

## Data Storage

The application uses browser **LocalStorage** to save data. This means:
- ✅ No backend server required
- ✅ Fast data access
- ⚠️ Data is stored locally in your browser
- ⚠️ Clearing browser data will delete all records
- 💡 For production, consider migrating to a proper database

## Tips & Best Practices

1. **Regular Backups:** Export your data periodically
2. **Search Efficiently:** Use IMEI for quick phone lookup
3. **Seller Information:** Add seller details when first purchasing phones
4. **Price Management:** Keep purchase and sale prices accurate for profit tracking
5. **Mobile Usage:** This app is fully responsive and works on phones and tablets

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Building for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Multi-user support
- Backup and export features
- Advanced analytics
- Invoice generation
- SMS notifications

## License

This project is open source and available for use.

## Support

For issues or suggestions, please create an issue or contact the developer.

---

**Happy Selling!** 📱💼
