## Brief Description

This is an Angular application developed for Udacity MyStore. This project was generated
with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Project Requirements and Best Practices

This project has been scaffolded and configured as a single-page application with Angular. After cloning this repository
to your local machine, you only need to run `npm install` and `ng serve` to install and launch the application.

### User Experience

This application has been designed to emulate typical e-commerce applications. Major features includes:

* The shopping cart page shows a total cost for all products in the cart.
* The shopping cart page have the products to be purchased, quantities can be edited and the total price is reflecting with any change
* Input forms are validated.
* Feedback is provided to the user when actions such as adding products to the cart occur.
* The individual product page displays the photo of the product, the name, the price, and the description.
* Products can be removed from the cart.
* An order confirmation page is displayed to the user after successful checkout.

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

A CartService and ProductService are being used to facilitate data sharing between the Product List component and the Shopping Cart component.
using rxjs to act as a global state for the app.

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

