# Photobooth

This is a Pinterest clone app called Photobooth. It is a web application that allows users to explore and search for photos. The app has two main pages: the homepage and the search results page.

## Homepage

The homepage of Photobooth features a gallery of photos fetched from the pixel.com API. The gallery utilizes an infinite scroll feature, allowing users to continuously view more images as they scroll down the page. The layout of the gallery is implemented using a masonry layout, providing an aesthetically pleasing arrangement of the images. The images displayed on the homepage are randomly selected.

## Search Results Page

Photobooth also includes a search results page. The web app has a navigation bar that contains a logo text and a search bar. Users can enter a search term in the search bar, and the app will display the search results related to the entered term. The search results page shows a maximum of 15 images that are relevant to the search term.

## Installation and Usage

To install and use Photobooth, follow these steps:

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Update the `NEXT_PUBLIC_PEXELS_API_KEY` in the code to your own API key for the pixel.com API.
5. Run `npm run dev` to start the development server.
6. Open your web browser and visit `http://localhost:3000` to access the app.

## Dependencies

The following dependencies are used in this project:

- autoprefixer: 10.4.14
- eslint: 8.44.0
- eslint-config-next: 13.4.7
- next: 13.4.8
- postcss: 8.4.24
- react: 18.2.0
- react-dom: 18.2.0
- react-hot-toast: 2.4.1
- react-icons: 4.10.1
- react-masonry-css: 1.0.16
- tailwindcss: 3.3.2

## License

This project is licensed under the [MIT License](LICENSE).