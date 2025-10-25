## Brief Description

This is a modern Angular e-commerce application featuring a complete shopping experience with advanced filtering, wishlist functionality, and persistent storage. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1 and has been enhanced with additional features for improved user experience.

## Project Requirements and Best Practices

This project has been scaffolded and configured as a single-page application with Angular. After cloning this repository
to your local machine, you only need to run `npm install` and `ng serve` to install and launch the application.

### User Experience

This application has been designed to emulate modern e-commerce applications with enhanced features:

#### Core Features (Original)
* Shopping cart page with total cost calculation
* Editable product quantities with real-time price updates
* Comprehensive input form validation
* User feedback for cart actions
* Detailed product pages with images, prices, and descriptions
* Product removal from cart
* Order confirmation page after checkout

#### Enhanced Features (New)
* **Advanced Product Filtering**: Search products by keyword across title, description, and category
* **Category Filter**: Browse products by specific categories
* **Multiple Sort Options**:
  - Price (Low to High / High to Low)
  - Name (A-Z / Z-A)
  - Rating (Highest Rated)
* **Wishlist/Favorites**: Save products for later with persistent storage
* **Toast Notifications**: Modern, non-intrusive notifications replacing browser alerts
* **Shopping Cart Persistence**: Cart items saved in localStorage and persist across sessions
* **Loading States**: Visual feedback during data fetching with spinner animations
* **Enhanced Error Handling**: Graceful error handling with retry logic and user-friendly messages
* **Improved Form Validation**: Better validation feedback with clear error messages
* **Responsive Design**: Optimized for all screen sizes using Tailwind CSS

### Styling

In this project, all components have been stylized to ensure a neat and streamlined user experience. The styling was accomplished with Tailwind CSS, a highly customizable, low-level CSS framework.

### Fetching Products Data

The following methods are provided to fetch data from the Fakestore API, an eCommerce API simulation for testing and prototyping around frontend around eCommerce programming:
refer to it here for reference [fakestore API](https://fakestoreapi.com/docs)
```js
  getProducts(): Observable<[]> {
    return this.http.get<[]>('https://fakestoreapi.com/products')
  }
  
  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>('https://fakestoreapi.com/products/' + id)
  }
```

## Data Flow

The application uses multiple services to manage state and facilitate data sharing:

* **CartService**: Manages shopping cart state with localStorage persistence for data retention across sessions
* **ProductService**: Handles product data sharing between components
* **ProductFilterService**: Manages search, filter, and sort state for product listings
* **WishlistService**: Manages favorite products with localStorage persistence
* **NotificationService**: Centralized toast notification system for user feedback
* **HttpService**: Enhanced HTTP client with error handling, retry logic, and loading states

All services use RxJS BehaviorSubjects and Observables to create reactive data flows throughout the application.

### Routing

The application makes use of Angular routing in templates with the use of `<router-outlet>` placeholder and
the `routerLink` attribute. This is a single-page application, so the page does not reload during navigation.
all the route definitions are in `app.routes.ts` file is included in the application, with relevant components imported and path and component values
appropriately set.

## Starting the Project

To start the project, perform the following steps:

1. Clone this repository to your local machine and navigate to the project directory
2. Run `npm install` to install all necessary dependencies
3. Finally, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically
   reload if you change any of the source files.
   For additional details regarding project scripts and dependencies, refer to the `package.json` file in the project
   root directory.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Key Enhancements Summary

This enhanced version includes:

1. **Better UX**: Toast notifications, loading spinners, and improved feedback
2. **Advanced Filtering**: Search, category filter, and multiple sort options
3. **Wishlist Feature**: Save favorite products for later
4. **Data Persistence**: Cart and wishlist data persist across browser sessions
5. **Error Handling**: Robust error handling with automatic retry and user-friendly messages
6. **Form Validation**: Enhanced validation with clear error messaging
7. **Modern Architecture**: Improved service architecture with reactive patterns

All original functionalities have been strictly preserved while adding these enhancements.

