# StarTrack - Advent of Code Progress Visualization

![StarTrack Logo](logo.svg)

StarTrack is a modern, web-based visualization tool for Advent of Code progress tracking. It provides an elegant way to visualize your team's progress through the Advent of Code challenges.

## Features

- 📊 Real-time progress visualization
- 📈 Interactive performance charts
- 🎄 Festive, modern UI design
- 📱 Fully responsive layout
- 🔄 Multiple data input methods
- 🌓 Elegant glass-morphism design

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- A modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/startrack.git
cd startrack
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Usage

### Importing Data

StarTrack accepts Advent of Code JSON data in three ways:

1. **File Upload**: Drag and drop or select a JSON file
2. **Clipboard Paste**: Copy your JSON data and paste it directly
3. **Manual Input**: Type or paste JSON data into the text area

### Data Format

The input JSON should follow the Advent of Code leaderboard format:

```json
{
  "members": {
    "12345": {
      "name": "User Name",
      "stars": 12,
      "local_score": 100,
      "completion_day_level": {
        "1": {
          "1": {"get_star_ts": 1234567890},
          "2": {"get_star_ts": 1234567891}
        }
        // ... more days
      }
    }
    // ... more members
  }
}
```

## Features in Detail

### Progress Table
- Team member rankings
- Star counts and scores
- Completion times for each challenge
- Visual indicators for challenge completion

### Performance Chart
- Timeline of star acquisitions
- Individual progress tracking
- Interactive tooltips
- Custom color coding per user

## Technology Stack

- React
- Tailwind CSS
- Recharts
- TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern glass-morphism trends
- Built for the Advent of Code community
- Special thanks to the Advent of Code team for the amazing challenges

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❄️ for the Advent of Code community