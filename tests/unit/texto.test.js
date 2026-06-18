import { describe, it, expect } from 'vitest';
import { validarTexto, formatearTexto, contarPalabras } from '../../src/js/utils/texto.js';

// ============================================================
// Pruebas unitarias para validarTexto
// ============================================================
describe('validarTexto', () => {
  // --- Casos válidos ---
  it('debe retornar válido para un texto con 3 o más caracteres', () => {
    const resultado = validarTexto('Comprar pan');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar válido para un texto con exactamente 3 caracteres', () => {
    const resultado = validarTexto('ABC');
    expect(resultado.valido).toBe(true);
  });

  it('debe retornar válido para un texto con 200 caracteres (límite)', () => {
    const texto = 'A'.repeat(200);
    const resultado = validarTexto(texto);
    expect(resultado.valido).toBe(true);
  });


});

// ============================================================
// Pruebas unitarias para formatearTexto
// ============================================================
describe('formatearTexto', () => {
  it('debe convertir la primera letra a mayúscula y el resto a minúscula', () => {
    const resultado = formatearTexto('hOLA MUNDO');
    expect(resultado).toBe('Hola mundo');
  });

  it('debe retornar un string vacío si se ingresa un string vacío', () => {
    const resultado = formatearTexto('');
    expect(resultado).toBe('');
  });

  
});

// ============================================================
// Pruebas unitarias adicionales — Tarea 1 y Tarea 3
// ============================================================
describe('Pruebas adicionales — Tarea 1', () => {
  it('debe validar correctamente texto con caracteres especiales', () => {
    const resultado = validarTexto('Hola, mundo 🌍 con tildes y ñ');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe validar correctamente texto con exactamente tres espacios y una letra', () => {
    const resultado = validarTexto('   A');
    expect(resultado.valido).toBe(false);
    expect(resultado.error).toBe('El texto debe tener al menos 3 caracteres.');
  });

  it('debe formatear correctamente texto con caracteres especiales', () => {
    const resultado = formatearTexto('árbol');
    expect(resultado).toBe('Árbol');
  });

  it('debe mantener intacto un texto ya correctamente formateado', () => {
    const resultado = formatearTexto('Hola mundo');
    expect(resultado).toBe('Hola mundo');
  });
});

describe('Pruebas adicionales — Tarea 3', () => {
  it('debe contar una sola palabra en un texto simple', () => {
    expect(contarPalabras('Hola')).toBe(1);
  });

  it('debe contar varias palabras separadas por espacios simples', () => {
    expect(contarPalabras('Aprender Vitest hoy')).toBe(3);
  });

  it('debe contar palabras ignorando espacios al inicio y al final', () => {
    expect(contarPalabras('   aprender a probar   ')).toBe(3);
  });

  it('debe devolver 0 para un string vacío', () => {
    expect(contarPalabras('')).toBe(0);
  });

  it('debe devolver 0 para un string con solo espacios', () => {
    expect(contarPalabras('     ')).toBe(0);
  });
});
