import React from 'react';
import Navbar from './navbar';
const sampleBookmarks = [
  {
    url: 'https://github.com',
    category: 'Development',
    tags: ['code', 'tools'],
    clicked: 15,
    createdAt: '2025-04-14T10:00:00Z'
  },
  {
    url: 'https://youtube.com',
    category: 'Inspiration',
    tags: ['videos'],
    clicked: 5,
    createdAt: '2025-04-15T12:30:00Z'
  },
  {
    url: 'https://css-tricks.com',
    category: 'Development',
    tags: ['css', 'tricks'],
    clicked: 10,
    createdAt: '2025-04-16T08:00:00Z'
  },
  {
    url: 'https://dev.to',
    category: 'Development',
    tags: ['articles'],
    clicked: 20,
    createdAt: '2025-04-16T18:00:00Z'
  },
];

const UserStats = () => {
  const totalBookmarks = sampleBookmarks.length;

  // Count categories
  const categoryMap = {};
  const tagMap = {};
  const dateMap = {};
  let topBookmark = null;
  let maxClicks = 0;

  sampleBookmarks.forEach(b => {
    categoryMap[b.category] = (categoryMap[b.category] || 0) + 1;

    if (b.clicked > maxClicks) {
      maxClicks = b.clicked;
      topBookmark = b.description;
    }

    const date = b.createdAt.split('T')[0];
    dateMap[date] = (dateMap[date] || 0) + 1;

    b.tags.forEach(tag => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  const mostUsedTag = Object.entries(tagMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  const avgPerDay = (totalBookmarks / Object.keys(dateMap).length).toFixed(1);
  const streak = calculateStreak(Object.keys(dateMap));

  return (
    <div className="p-6 bg-gray-800 h-full text-white rounded-xl shadow-lg space-y-6">
      <Navbar />
      <h2 className="text-2xl font-semibold">📊 Bookmark Stats</h2>

      {/* Total Bookmarks */}
      <div className="text-lg bg-gray-700 p-4 rounded">
        Total Bookmarks: <span className="text-green-400">{totalBookmarks}</span>
      </div>

      {/* Category Distribution */}
      <div className="bg-gray-700 p-4 rounded">
        <h3 className="mb-2">Category Distribution</h3>
        {Object.entries(categoryMap).map(([cat, count], idx) => {
          const percent = (count / totalBookmarks) * 100;
          return (
            <div key={idx} className="mb-1">
              <span>{cat}</span>
              <div className="w-full h-3 bg-gray-600 rounded mt-1">
                <div
                  className="h-3 bg-green-400 rounded"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bookmarks Over Time */}
      <div className="bg-gray-700 p-4 rounded">
        <h3 className="mb-2">Bookmarks by Date</h3>
        {Object.entries(dateMap).sort().map(([date, count], idx) => (
          <div key={idx} className="flex items-center gap-3 mb-1">
            <span className="text-sm w-24">{date}</span>
            <div className="flex-1 h-3 bg-gray-600 rounded">
              <div
                className="h-3 bg-blue-400 rounded"
                style={{ width: `${count * 30}px` }}
              ></div>
            </div>
            <span className="ml-2">{count}</span>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-700 p-3 rounded">
          <strong>Average/Day:</strong> {avgPerDay}
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <strong>Top Tag:</strong> {mostUsedTag}
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <strong>Most Visited:</strong><br /> <a href={topBookmark} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">{topBookmark}</a>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <strong>Bookmarking Streak:</strong> {streak} day(s)
        </div>
      </div>
    </div>
  );
};

function calculateStreak(dateArr) {
  const dateSet = new Set(dateArr);
  let streak = 0;
  let current = new Date();

  while (true) {
    const iso = current.toISOString().split('T')[0];
    if (dateSet.has(iso)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export default UserStats;
