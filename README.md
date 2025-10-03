# V Ganesh - Portfolio Website

A modern, responsive portfolio website for V Ganesh, a passionate Full Stack Developer with expertise in Java, Spring Boot, AngularJS, and enterprise applications.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Scrolling**: Smooth navigation between sections
- **Interactive Elements**: Hover effects, animations, and transitions
- **Contact Form**: Functional contact form with validation
- **Modern UI**: Clean, professional design with modern aesthetics
- **Fast Loading**: Optimized performance and loading times

## 📱 Sections

- **Home**: Hero section with introduction and call-to-action
- **About**: Personal background and professional experience
- **Skills**: Technical skills organized by category
- **Projects**: Featured projects with detailed descriptions
- **Resume**: Resume download and highlights
- **Contact**: Contact information and contact form

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter font family for clean typography

## 📂 Project Structure

```
vganesh-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Main CSS file with all styles
├── js/
│   └── script.js      # Main JavaScript file
├── images/            # Image assets (add your photos here)
├── assets/            # Other assets (resume PDF, etc.)
└── README.md          # This file
```

## 🔧 Setup Instructions

1. **Clone or Download** the project files
2. **Add Your Resume**: Place your resume PDF in the `assets/` folder and name it `V_Ganesh_Resume.pdf`
3. **Add Your Photo**: Add your professional photo to the `images/` folder and update the image placeholder in `index.html`
4. **Customize Content**: Update the content in `index.html` with your specific information
5. **Open in Browser**: Simply open `index.html` in your web browser

## 📝 Customization

### Adding Your Resume
1. Place your resume PDF in the `assets/` folder
2. Update the `downloadResume()` function in `js/script.js`:
```javascript
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/V_Ganesh_Resume.pdf';
    link.download = 'V_Ganesh_Resume.pdf';
    link.click();
}
```

### Adding Your Photo
Replace the image placeholder in the hero section:
```html
<div class="hero-image">
    <img src="images/profile-photo.jpg" alt="V Ganesh" class="profile-image">
</div>
```

### Updating Contact Form
The contact form currently simulates submission. To make it functional:
1. Set up a backend service (Node.js, PHP, etc.)
2. Update the form action and method in `index.html`
3. Modify the `simulateFormSubmission()` function in `js/script.js`

### Customizing Colors
Update the CSS custom properties in `css/style.css`:
```css
:root {
    --accent-color: #007bff; /* Change this to your preferred color */
    --accent-hover: #0056b3;
}
```

## 🎨 Design Features

- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Easy theme customization
- **Smooth Animations**: CSS transitions and transforms
- **Mobile-First Design**: Responsive breakpoints
- **Accessibility**: ARIA labels and semantic HTML

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Performance

- Optimized CSS and JavaScript
- Minimal external dependencies
- Fast loading times
- Smooth animations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

For any questions or suggestions regarding this portfolio:

- **Email**: mvganesh257@gmail.com
- **LinkedIn**: [linkedin.com/in/ganesh2507](https://www.linkedin.com/in/ganesh2507/)
- **GitHub**: [github.com/VadivelGanesh](https://github.com/VadivelGanesh)

---

## 🔄 Future Enhancements

- [ ] Add blog section
- [ ] Implement backend for contact form
- [ ] Add more project details
- [ ] Include testimonials section
- [ ] Add loading animations
- [ ] Implement PWA features

---

Built with ❤️ by V Ganesh