# Image Search Application

This project is a frontend application that enables users to search and view
images based on keywords. It utilizes the Pixabay API for fetching images, and
the interface is designed to be user-friendly and responsive.

## Search Form

The search form is implemented using HTML and includes a text input field for
users to enter search queries. Upon form submission, an HTTP request is made to
the Pixabay API.

```html
<form class="search-form" id="search-form">
  <input
    type="text"
    name="searchQuery"
    autocomplete="off"
    placeholder="Search images..."
  />
  <button type="submit">Search</button>
</form>
```

## Pixabay API Requests

The frontend communicates with the Pixabay backend through HTTP requests. The
required parameters for the API request include the user's API key, search query
(`q`), image type (`image_type`), orientation (`orientation`), and safe search
(`safesearch`).

The response from the backend includes an array of images, each described by
properties such as `webformatURL`, `largeImageURL`, `tags`, `likes`, `views`,
`comments`, and `downloads`. If the backend returns an empty array, a
notification is displayed with the message "Sorry, there are no images matching
your search query. Please try again."

## Gallery and Image Cards

The image gallery is represented by the HTML element `<div class="gallery">`.
The gallery is dynamically populated with image cards during the search. To
avoid mixing results from different searches, the gallery's content is cleared
with each new search.

```html
<div class="gallery">
  <!-- Image cards dynamically rendered here -->
</div>
```

The template for each image card is defined as follows:

```html
<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item"><b>Likes</b></p>
    <p class="info-item"><b>Views</b></p>
    <p class="info-item"><b>Comments</b></p>
    <p class="info-item"><b>Downloads</b></p>
  </div>
</div>
```

## Pagination

The Pixabay API supports pagination with parameters `page` and `per_page`. Each
response contains 40 images by default. The initial value of the `page`
parameter is 1, and it is incremented with each subsequent request. When
searching with a new keyword, the `page` value is reset to 1.

A "Load more" button is provided in the HTML document to fetch the next group of
images. Initially hidden, the button becomes visible after the first search. It
is hidden again upon submitting a new search query.

If the backend response includes the property `totalHits`, indicating the total
number of matching images (for free accounts), and the user reaches the end of
the collection, the button is hidden, and a message is displayed: "We're sorry,
but you've reached the end of search results."

## Additional Functionality

### Notifications

After the initial search, a notification is displayed with the message "Hooray!
We found totalHits images." The `totalHits` property is obtained from the
backend response.

### SimpleLightbox Integration (Optional)

To enhance the gallery experience, a larger version of the images can be
displayed using the SimpleLightbox library. Each image card is wrapped in a
link, and the library's `refresh()` method is called after adding a new group of
image cards.

```javascript
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
```

### Smooth Page Scrolling

After each request and display of a new group of images, the page smoothly
scrolls to the newly loaded images. The provided code snippet achieves this
effect.

```javascript
const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
```

### Infinite Scroll (Optional)

Instead of the "Load more" button, infinite scrolling can be implemented to
dynamically load more images as the user scrolls down. The specific
implementation can utilize various libraries or custom JavaScript solutions.

Feel free to customize this README according to your project's details and
preferences.
