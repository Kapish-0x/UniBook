const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const LibraryBook = require('./models/LibraryBook');

const books = [
  // Mathematics
  { title: 'Higher Engineering Mathematics', author: 'B.S. Grewal', subject: 'Mathematics', course: 'MATH101', coverEmoji: '📐', totalCopies: 5, availableCopies: 3, description: 'Most popular math book in Indian engineering colleges.' },
  { title: 'Calculus and Analytic Geometry', author: 'Thomas & Finney', subject: 'Mathematics', course: 'MATH102', coverEmoji: '📐', totalCopies: 4, availableCopies: 2 },
  { title: 'Discrete Mathematics', author: 'Kenneth H. Rosen', subject: 'Mathematics', course: 'MATH201', coverEmoji: '🔢', totalCopies: 3, availableCopies: 3 },

  // Computer Science
  { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest & Stein', subject: 'Computer Science', course: 'CS301', coverEmoji: '💻', totalCopies: 6, availableCopies: 4, description: 'The CLRS bible of algorithms.' },
  { title: 'Operating System Concepts', author: 'Silberschatz, Galvin & Gagne', subject: 'Computer Science', course: 'CS302', coverEmoji: '🖥️', totalCopies: 4, availableCopies: 1 },
  { title: 'Database System Concepts', author: 'Silberschatz, Korth & Sudarshan', subject: 'Computer Science', course: 'CS401', coverEmoji: '🗄️', totalCopies: 3, availableCopies: 2 },
  { title: 'Computer Networks', author: 'Andrew S. Tanenbaum', subject: 'Computer Science', course: 'CS403', coverEmoji: '🌐', totalCopies: 4, availableCopies: 4 },
  { title: 'The C Programming Language', author: 'Kernighan & Ritchie', subject: 'Computer Science', course: 'CS101', coverEmoji: '⌨️', totalCopies: 5, availableCopies: 5 },

  // Physics
  { title: 'Concepts of Physics Vol 1', author: 'H.C. Verma', subject: 'Physics', course: 'PHY101', coverEmoji: '⚛️', totalCopies: 8, availableCopies: 5, description: 'The go-to book for every Indian student.' },
  { title: 'Concepts of Physics Vol 2', author: 'H.C. Verma', subject: 'Physics', course: 'PHY102', coverEmoji: '⚛️', totalCopies: 8, availableCopies: 6 },
  { title: 'University Physics', author: 'Young & Freedman', subject: 'Physics', course: 'PHY201', coverEmoji: '🔭', totalCopies: 3, availableCopies: 0 },

  // Chemistry
  { title: 'Organic Chemistry', author: 'Morrison & Boyd', subject: 'Chemistry', course: 'CHEM201', coverEmoji: '🧪', totalCopies: 4, availableCopies: 2 },
  { title: 'Physical Chemistry', author: 'P.W. Atkins', subject: 'Chemistry', course: 'CHEM101', coverEmoji: '⚗️', totalCopies: 3, availableCopies: 1 },
  { title: 'Engineering Chemistry', author: 'Jain & Jain', subject: 'Chemistry', course: 'CHEM102', coverEmoji: '🧫', totalCopies: 6, availableCopies: 4 },

  // Electronics
  { title: 'Electronic Devices and Circuit Theory', author: 'Robert Boylestad', subject: 'Electronics', course: 'EC201', coverEmoji: '🔌', totalCopies: 5, availableCopies: 3 },
  { title: 'Signals and Systems', author: 'Oppenheim & Willsky', subject: 'Electronics', course: 'EC301', coverEmoji: '📡', totalCopies: 3, availableCopies: 2 },
  { title: 'Digital Electronics', author: 'Morris Mano', subject: 'Electronics', course: 'EC202', coverEmoji: '🔧', totalCopies: 4, availableCopies: 4 },

  // Mechanical
  { title: 'Engineering Mechanics', author: 'R.C. Hibbeler', subject: 'Mechanical Engineering', course: 'ME101', coverEmoji: '⚙️', totalCopies: 4, availableCopies: 2 },
  { title: 'Thermodynamics: An Engineering Approach', author: 'Cengel & Boles', subject: 'Mechanical Engineering', course: 'ME201', coverEmoji: '🌡️', totalCopies: 3, availableCopies: 1 },

  // Economics & Management
  { title: 'Principles of Economics', author: 'N. Gregory Mankiw', subject: 'Economics', course: 'ECO101', coverEmoji: '📊', totalCopies: 5, availableCopies: 3 },
  { title: 'Engineering Economics', author: 'R. Panneerselvam', subject: 'Economics', course: 'ECO201', coverEmoji: '💰', totalCopies: 4, availableCopies: 4 },

  // English
  { title: 'The Elements of Style', author: 'Strunk & White', subject: 'English', course: 'ENG101', coverEmoji: '✍️', totalCopies: 6, availableCopies: 6 },
  { title: 'Communication Skills for Engineers', author: 'Sanjay Kumar', subject: 'English', course: 'ENG102', coverEmoji: '📝', totalCopies: 5, availableCopies: 3 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unibook');
    console.log('✅ MongoDB connected');

    await LibraryBook.deleteMany({});
    console.log('🗑️  Cleared existing library books');

    await LibraryBook.insertMany(books);
    console.log(`📚 ${books.length} books added to library successfully!`);

    await mongoose.disconnect();
    console.log('✅ Done! Run your server now.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seed();
