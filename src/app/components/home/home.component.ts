import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';  // Usamos Router de Angular, no Express

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],  // No necesitas HttpClient aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],  // Corregí styleUrl a styleUrls
})
export class HomeComponent {
  private router = inject(Router);  // Inyectar el Router de Angular

  onPlay() {
    this.router.navigate(['/transition'], { skipLocationChange: true });
    // Simula el login básico con credenciales predefinidas
    /*
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    
    if (username === 'drew' && password === '6969') {
      this.router.navigate(['/transition'], { skipLocationChange: true });  // Navega a la página de transición
    } else {
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
    */
  }
}
