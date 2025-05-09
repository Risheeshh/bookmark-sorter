const fs = require('fs');


const path = require("path");
const filePath = path.join(__dirname, "../src/assets/bookmarks.json");

// Fixed date to be added
const fixedDate = new Date('2025-04-01T00:00:00Z').toISOString();

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading bookmarks.json:', err);
    return;
  }

  try {
    let bookmarks = JSON.parse(data);

    bookmarks = bookmarks.map(bookmark => ({
      ...bookmark,
      createdAt: fixedDate
    }));

    fs.writeFile(filePath, JSON.stringify(bookmarks, null, 2), err => {
      if (err) {
        console.error('Error writing updated bookmarks:', err);
      } else {
        console.log('Bookmarks updated with createdAt successfully!');
      }
    });
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});
