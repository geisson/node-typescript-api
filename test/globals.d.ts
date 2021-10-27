declare namespace NodeJS {
  interface Global {
    // erro: Não é possível localizar o módulo 'supertest' ou suas declarações de tipo correspondentes.ts(2307)
    testRequest: import('supertest').SuperTest<import('supertest').Test>;
  }
}
