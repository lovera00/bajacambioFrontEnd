import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GptServiceService } from './gpt-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  estaCargando = false;
  miFormulario = new FormGroup({
    textoOriginal: new FormControl('', [Validators.required]),
    textoCambiado: new FormControl('', [Validators.required])
  });

  constructor(private gptService: GptServiceService) { }

  enviarFormulario() {
    this.estaCargando = true;
    const textoOriginal = this.miFormulario.get('textoOriginal')?.value ?? '';
    this.gptService.cambiarTexto(textoOriginal).subscribe({
      next: (response) => {
        this.miFormulario.get('textoCambiado')?.setValue(response.respuesta);
        this.estaCargando = false;
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
        this.estaCargando = false;
      }
    });
  }
}
