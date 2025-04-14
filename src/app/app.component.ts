import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Motogo';

  private routeSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), // Observa apenas a conclusão da navegação
      map(() => this.getRouteTitle(this.activatedRoute)) // Obtém o título da rota atual
    ).subscribe(title => {
      this.title = title; // Atualiza o título da aplicação
    });
  }

  ngOnDestroy(): void {
    // Cancela a assinatura para evitar vazamentos de memória
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Função que busca o título da rota ativa
  private getRouteTitle(route: ActivatedRoute): string {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild; // Vai até a última rota filha
    }
    // Retorna o título da rota ou 'Default Title' se não houver título definido
    return child.snapshot.data?.['title'] ?? 'Default Title';
  }
}
