import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy{
  activeRoute: string = '';
  breadcrumbs: { label: string, route: string }[] = [];
  currentRoute: string = '';
  pageTitle: string = '';
  //para evitar fuga de memoria 
  subs$?: Subscription;
  constructor(private router: Router) { }
 
  ngOnInit() {
   /* This code is subscribing to the `events` property of the `Router` object and listening for any
   navigation events. When a navigation event occurs, it checks if the event is an instance of
   `NavigationEnd`, which indicates that the navigation has ended. If it is, it sets the
   `currentRoute` property to the URL of the current route and calls the `updateBreadcrumbs()`
   method to update the breadcrumbs and page title. This allows the `BreadcrumbsComponent` to
   dynamically update the breadcrumbs and page title based on the current route. */
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.updateBreadcrumbs();
      }
    });
  }
/**
 * The ngOnDestroy function unsubscribes from a subscription if it exists.
 */
  ngOnDestroy(): void {
    this.subs$?.unsubscribe();
  }
  updateBreadcrumbs() {
    const segments = this.currentRoute.split('/').filter(segment => segment !== '');
  
    /* This code is creating an array of breadcrumbs based on the current route. It first splits the
    current route into segments and filters out any empty segments. It then initializes an empty
    string variable called `breadcrumbPath`. */
    let breadcrumbPath = '';
    this.breadcrumbs = segments.map(segment => {
      breadcrumbPath += `/${segment}`;
      return {
        label: segment,
        route: breadcrumbPath
      };
    });
  
   /* This code is checking if the `breadcrumbs` array has at least one element. If it does, it sets
   the `pageTitle` variable to the label of the last element in the `breadcrumbs` array. If it
   doesn't have any elements, it sets the `pageTitle` variable to an empty string. This is used to
   update the title of the HTML page. */
    if (this.breadcrumbs.length > 0) {
      this.pageTitle = this.breadcrumbs[this.breadcrumbs.length - 1].label;
    } else {
      this.pageTitle = '';
    }
  
    // Actualizar el título de la página HTML
    document.title = `InvestGo! - ${this.pageTitle}`;
  }
}
