import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GptServiceService } from './gpt-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  miFormulario = new FormGroup({
    textoOriginal: new FormControl('', [Validators.required]),
    textoCambiado: new FormControl('', [Validators.required])
  });

  constructor(private gptService: GptServiceService) { }

  enviarFormulario() {
    const textoOriginal = this.miFormulario.get('textoOriginal')?.value ?? '';
    this.gptService.cambiarTexto(textoOriginal).subscribe({
      next: (response) => {
        this.miFormulario.get('textoCambiado')?.setValue(response.respuesta);
      },
      error: (error) => {
        console.error('Ocurrió un error:', error);
      }
    });
  }
}
