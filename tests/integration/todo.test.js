import { describe, it, expect, beforeEach } from 'vitest';
import {
  crearTareaElemento,
  agregarTarea,
  eliminarTarea,
  alternarTarea,
  limpiarCompletadas,
  actualizarContador,
  mostrarError,
} from '../../src/js/dom/todo.js';

// Helper: crea una lista <ul> fresca para cada prueba
function crearLista() {
  return document.createElement('ul');
}

// ============================================================
// Pruebas de integración — manipulación del DOM
// ============================================================
describe('crearTareaElemento', () => {
  it('debe crear un elemento <li> con la clase "tarea-item"', () => {
    const li = crearTareaElemento('Test');
    expect(li.tagName).toBe('LI');
    expect(li.classList.contains('tarea-item')).toBe(true);
  });

  
});

describe('agregarTarea', () => {
  let lista;

  beforeEach(() => {
    lista = crearLista();
  });

  it('debe agregar un <li> a la lista cuando el texto es válido', () => {
    const resultado = agregarTarea('Aprender vitest', lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Aprender vitest');
  });

  
});

describe('Pruebas adicionales — Tarea 2', () => {
  it('debe eliminar un elemento al hacer clic en su botón de eliminar', () => {
    const lista = crearLista();
    const tarea = crearTareaElemento('Eliminar tarea');
    lista.appendChild(tarea);

    const botonEliminar = tarea.querySelector('.btn-eliminar');
    botonEliminar.click();

    expect(lista.children.length).toBe(0);
  });

  it('debe alternar la clase completada al disparar el evento change del checkbox', () => {
    const tarea = crearTareaElemento('Marcar tarea');
    const checkbox = tarea.querySelector('.tarea-checkbox');

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    expect(tarea.classList.contains('completada')).toBe(true);
  });

  it('debe agregar una tarea con exactamente 200 caracteres y dos palabras', () => {
    const lista = crearLista();
    const texto = `${'A'.repeat(97)} ${'B'.repeat(102)}`;

    expect(texto.length).toBe(200);

    const resultado = agregarTarea(texto, lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
  });

  it('debe eliminar todas las tareas cuando todas están completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea uno', lista);
    agregarTarea('Tarea dos', lista);

    const items = lista.querySelectorAll('.tarea-item');
    items.forEach((item) => {
      const checkbox = item.querySelector('.tarea-checkbox');
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(2);
    expect(lista.children.length).toBe(0);
  });

  it('debe rechazar una tarea de una sola palabra mostrando el mensaje de validación', () => {
    const lista = crearLista();

    const resultado = agregarTarea('Tarea', lista);

    expect(resultado.exito).toBe(false);
    expect(resultado.error).toBe('La tarea debe tener al menos 2 palabras.');
    expect(lista.children.length).toBe(0);
  });

  it('debe rechazar una tarea con una palabra aunque tenga longitud suficiente', () => {
    const lista = crearLista();

    const resultado = agregarTarea('Hola', lista);

    expect(resultado.exito).toBe(false);
    expect(resultado.error).toBe('La tarea debe tener al menos 2 palabras.');
    expect(lista.children.length).toBe(0);
  });
});

describe('eliminarTarea', () => {
  it('debe eliminar el elemento <li> del DOM', () => {
    const lista = crearLista();
    agregarTarea('Tarea a eliminar', lista);
    const li = lista.querySelector('.tarea-item');

    eliminarTarea(li);
    expect(lista.children.length).toBe(0);
  });
});

describe('alternarTarea', () => {
  it('debe agregar la clase "completada" cuando el checkbox está marcado', () => {
    const li = crearTareaElemento('Tarea test');
    const checkbox = li.querySelector('.tarea-checkbox');
    checkbox.checked = true;

    alternarTarea(li, checkbox);
    expect(li.classList.contains('completada')).toBe(true);
  });

  
});

describe('limpiarCompletadas', () => {
  it('debe eliminar solo las tareas completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea pendiente', lista);
    agregarTarea('Tarea completada', lista);

    // Marcar la segunda como completada
    const items = lista.querySelectorAll('.tarea-item');
    const checkbox = items[1].querySelector('.tarea-checkbox');
    checkbox.checked = true;
    alternarTarea(items[1], checkbox);

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(1);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Tarea pendiente');
  });

  
});

describe('actualizarContador', () => {
  it('debe mostrar "0 tareas" cuando la lista está vacía', () => {
    const lista = crearLista();
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('0 tareas');
  });

  it('debe mostrar "1 tarea" cuando hay exactamente un elemento', () => {
    const lista = crearLista();
    agregarTarea('Única tarea', lista);
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('1 tarea');
  });

  
});

describe('mostrarError', () => {
  it('debe establecer el texto del contenedor con el mensaje de error', () => {
    const contenedor = document.createElement('div');
    mostrarError('Error de prueba', contenedor);
    expect(contenedor.textContent).toBe('Error de prueba');
  });

  
});
