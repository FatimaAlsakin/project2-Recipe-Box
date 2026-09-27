const connectToDB = require('./db');
const Category = require('./models/Category');
const dotenv = require("dotenv").config()

async function seed() {
    await connectToDB();
    await Category.create([
        { name: 'Breakfast' },
        { name: 'Lunch' },
        { name: 'Dinner' },
        { name: 'Dessert' },
        { name: 'Snack' },
        { name: 'Drink' }
    ]);
    console.log('Categories seeded');
    process.exit();
}

seed();