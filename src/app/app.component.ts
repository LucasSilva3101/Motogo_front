import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Motogo';
  showMenu = true;              // 👈 controla exibição do menu

  private routeSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // só quando termina a navegação
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        // 👇 aqui você decide quando o menu aparece
        // landing = /main  → NÃO mostra o menu
        this.showMenu = url !== '/main';

        // mantém a lógica do título
        this.title = this.getRouteTitle(this.activatedRoute);
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private getRouteTitle(route: ActivatedRoute): string {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild;
    }
    return child.snapshot.data?.['title'] ?? 'Default Title';
  }
}
